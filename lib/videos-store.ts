import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { R2_BUCKET, getR2Client } from './r2';
import type { VideoEntry } from './video';

const VIDEOGRAPHY_KEY = '_meta/videography-videos.json';

async function streamToString(body: unknown): Promise<string> {
  if (!body) return '';
  if (typeof (body as { transformToString?: () => Promise<string> }).transformToString === 'function') {
    return (body as { transformToString: () => Promise<string> }).transformToString();
  }
  // Fallback: node Readable
  const chunks: Buffer[] = [];
  for await (const chunk of body as AsyncIterable<Buffer>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf-8');
}

export async function readVideographyVideos(): Promise<VideoEntry[]> {
  try {
    const client = getR2Client();
    const out = await client.send(
      new GetObjectCommand({ Bucket: R2_BUCKET, Key: VIDEOGRAPHY_KEY }),
    );
    const text = await streamToString(out.Body);
    if (!text) return [];
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) return [];
    return parsed as VideoEntry[];
  } catch (err) {
    const name = (err as { name?: string; Code?: string })?.name;
    const code = (err as { name?: string; Code?: string })?.Code;
    if (name === 'NoSuchKey' || code === 'NoSuchKey' || name === 'NotFound') return [];
    throw err;
  }
}

export async function writeVideographyVideos(entries: VideoEntry[]): Promise<void> {
  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: VIDEOGRAPHY_KEY,
      Body: JSON.stringify(entries, null, 2),
      ContentType: 'application/json',
      CacheControl: 'public, max-age=0, must-revalidate',
    }),
  );
}
