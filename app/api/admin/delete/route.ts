import { NextResponse } from 'next/server';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { isAuthed } from '@/lib/admin-auth';
import { ALLOWED_FOLDERS, R2_BUCKET, getR2Client } from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  let body: { keys?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const rawKeys = Array.isArray(body.keys) ? body.keys : [];
  const keys = rawKeys.filter((k): k is string => typeof k === 'string' && k.length > 0);
  if (keys.length === 0) {
    return NextResponse.json({ ok: false, error: 'No keys provided' }, { status: 400 });
  }
  const allowedPrefixes = ALLOWED_FOLDERS.map((f) => `${f}/`);
  const safeKeys = keys.filter((k) => allowedPrefixes.some((p) => k.startsWith(p)));
  if (safeKeys.length === 0) {
    return NextResponse.json({ ok: false, error: 'No valid keys' }, { status: 400 });
  }
  try {
    const client = getR2Client();
    const out = await client.send(
      new DeleteObjectsCommand({
        Bucket: R2_BUCKET,
        Delete: { Objects: safeKeys.map((Key) => ({ Key })), Quiet: false },
      }),
    );
    return NextResponse.json({
      ok: true,
      deleted: out.Deleted?.map((d) => d.Key) ?? [],
      errors: out.Errors?.map((e) => ({ key: e.Key, message: e.Message })) ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
