import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { isAuthed } from '@/lib/admin-auth';
import { R2_BUCKET, getR2Client, isAllowedFolder, publicUrlFor } from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);

function safeName(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');
  return cleaned || 'upload';
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
  }
  const folder = String(form.get('folder') ?? '');
  if (!isAllowedFolder(folder)) {
    return NextResponse.json({ ok: false, error: 'Invalid folder' }, { status: 400 });
  }
  const files = form.getAll('files').filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ ok: false, error: 'No files provided' }, { status: 400 });
  }

  const client = getR2Client();
  const uploaded: { key: string; url: string }[] = [];
  const failures: { name: string; reason: string }[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      failures.push({ name: file.name, reason: `Unsupported type: ${file.type || 'unknown'}` });
      continue;
    }
    if (file.size > MAX_BYTES) {
      failures.push({ name: file.name, reason: 'Larger than 25 MB' });
      continue;
    }
    const stamp = Date.now().toString(36);
    const rand = Math.random().toString(36).slice(2, 8);
    const key = `${folder}/${stamp}-${rand}-${safeName(file.name)}`;
    try {
      const buf = Buffer.from(await file.arrayBuffer());
      await client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: key,
          Body: buf,
          ContentType: file.type,
          CacheControl: 'public, max-age=31536000, immutable',
        }),
      );
      uploaded.push({ key, url: publicUrlFor(key) });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      failures.push({ name: file.name, reason: message });
    }
  }

  return NextResponse.json({ ok: true, uploaded, failures });
}
