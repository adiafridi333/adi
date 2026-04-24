import { S3Client } from '@aws-sdk/client-s3';

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
    });
  }
  return client;
}

export function publicUrlFor(key: string): string {
  if (!R2_PUBLIC_URL) return '';
  return `${R2_PUBLIC_URL}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

export const ALLOWED_FOLDERS = ['gallery', 'team', 'hero', 'blog'] as const;
export type Folder = (typeof ALLOWED_FOLDERS)[number];

export function isAllowedFolder(value: string): value is Folder {
  return (ALLOWED_FOLDERS as readonly string[]).includes(value);
}
