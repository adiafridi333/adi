import { NextResponse } from 'next/server';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { isAuthed } from '@/lib/admin-auth';
import { R2_BUCKET, getR2Client, isAllowedFolder, publicUrlFor } from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get('folder') ?? 'gallery';
  if (!isAllowedFolder(folder)) {
    return NextResponse.json({ ok: false, error: 'Invalid folder' }, { status: 400 });
  }
  try {
    const client = getR2Client();
    const out = await client.send(
      new ListObjectsV2Command({ Bucket: R2_BUCKET, Prefix: `${folder}/`, MaxKeys: 1000 }),
    );
    const items = (out.Contents ?? [])
      .filter((o) => o.Key && !o.Key.endsWith('/'))
      .map((o) => ({
        key: o.Key!,
        size: o.Size ?? 0,
        lastModified: o.LastModified?.toISOString() ?? null,
        url: publicUrlFor(o.Key!),
      }))
      .sort((a, b) => (b.lastModified ?? '').localeCompare(a.lastModified ?? ''));
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'List failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
