import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export const R2_BUCKET = process.env.R2_BUCKET ?? 'images';
export const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '');

let client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      'R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in .env.local',
    );
  }
  if (!client) {
    client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
      // R2 doesn't validate AWS SDK v3's default CRC32 checksum, and
      // browsers can't compute it for direct presigned PUTs.
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
    });
  }
  return client;
}

export function publicUrlFor(key: string): string {
  if (!R2_PUBLIC_URL) return '';
  return `${R2_PUBLIC_URL}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

export const ALLOWED_FOLDERS = ['portfolio', 'team', 'general'] as const;
export type Folder = (typeof ALLOWED_FOLDERS)[number];

export function isAllowedFolder(value: string): value is Folder {
  return (ALLOWED_FOLDERS as readonly string[]).includes(value);
}

export const PORTFOLIO_CATEGORIES = [
  'weddings',
  'corporate',
  'events',
  'fashion',
  'videography',
] as const;
export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export function isAllowedPortfolioCategory(value: string): value is PortfolioCategory {
  return (PORTFOLIO_CATEGORIES as readonly string[]).includes(value);
}

export type R2Image = {
  key: string;
  url: string;
  size: number;
  lastModified: number;
};

export async function listImagesByPrefix(prefix: string): Promise<R2Image[]> {
  try {
    const client = getR2Client();
    const out = await client.send(
      new ListObjectsV2Command({ Bucket: R2_BUCKET, Prefix: prefix, MaxKeys: 1000 }),
    );
    return (out.Contents ?? [])
      .filter((o) => o.Key && !o.Key.endsWith('/'))
      .map((o) => ({
        key: o.Key!,
        url: publicUrlFor(o.Key!),
        size: o.Size ?? 0,
        lastModified: o.LastModified?.getTime() ?? 0,
      }))
      .sort((a, b) => b.lastModified - a.lastModified);
  } catch {
    return [];
  }
}

export async function listPortfolioCategoryImages(category: PortfolioCategory) {
  return listImagesByPrefix(`portfolio/${category}/`);
}
