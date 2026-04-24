import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { isAuthed } from '@/lib/admin-auth';
import {
  R2_BUCKET,
  getR2Client,
  isAllowedFolder,
  isAllowedPortfolioCategory,
  publicUrlFor,
} from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB
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
  let body: {
    folder?: string;
    category?: string;
    filename?: string;
    contentType?: string;
    size?: number;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const folder = body.folder ?? '';
  if (!isAllowedFolder(folder)) {
    return NextResponse.json({ ok: false, error: 'Invalid folder' }, { status: 400 });
  }

  let keyPrefix: string = folder;
  if (folder === 'portfolio') {
    const category = body.category ?? '';
    if (!category) {
      return NextResponse.json(
        { ok: false, error: 'Pick a portfolio category before uploading' },
        { status: 400 },
      );
    }
    if (!isAllowedPortfolioCategory(category)) {
      return NextResponse.json({ ok: false, error: 'Invalid category' }, { status: 400 });
    }
    keyPrefix = `portfolio/${category}`;
  }

  const filename = (body.filename ?? '').trim();
  if (!filename) {
    return NextResponse.json({ ok: false, error: 'Filename required' }, { status: 400 });
  }
  const contentType = body.contentType ?? '';
  if (!ALLOWED_TYPES.has(contentType)) {
    return NextResponse.json(
      { ok: false, error: `Unsupported type: ${contentType || 'unknown'}` },
      { status: 400 },
    );
  }
  const size = typeof body.size === 'number' ? body.size : 0;
  if (size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: `File larger than ${Math.round(MAX_BYTES / 1024 / 1024)} MB` },
      { status: 400 },
    );
  }

  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const key = `${keyPrefix}/${stamp}-${rand}-${safeName(filename)}`;

  try {
    const client = getR2Client();
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    });
    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 60 * 10 });
    return NextResponse.json({
      ok: true,
      key,
      uploadUrl,
      contentType,
      publicUrl: publicUrlFor(key),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to sign upload';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
