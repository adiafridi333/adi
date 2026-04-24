import { NextResponse } from 'next/server';
import { isAuthed } from '@/lib/admin-auth';
import { newVideoEntry, parseVideoUrl } from '@/lib/video';
import { readVideographyVideos, writeVideographyVideos } from '@/lib/videos-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const items = await readVideographyVideos();
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load videos';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  let body: { url?: string; title?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const parsed = parseVideoUrl(body.url ?? '');
  if (!parsed) {
    return NextResponse.json(
      { ok: false, error: 'Unsupported URL. Paste a YouTube, Vimeo, or direct .mp4/.webm link.' },
      { status: 400 },
    );
  }
  try {
    const existing = await readVideographyVideos();
    // dedupe by url
    if (existing.some((v) => v.url === parsed.url)) {
      return NextResponse.json({ ok: false, error: 'That video is already added.' }, { status: 409 });
    }
    const entry = newVideoEntry(parsed, body.title);
    const next = [entry, ...existing];
    await writeVideographyVideos(next);
    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  let body: { id?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const id = (body.id ?? '').trim();
  if (!id) return NextResponse.json({ ok: false, error: 'id required' }, { status: 400 });
  try {
    const existing = await readVideographyVideos();
    const next = existing.filter((v) => v.id !== id);
    if (next.length === existing.length) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }
    await writeVideographyVideos(next);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
