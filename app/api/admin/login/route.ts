import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, makeSessionToken, verifyPasscode } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: { passcode?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
  const passcode = (body.passcode ?? '').trim();
  if (!passcode || !verifyPasscode(passcode)) {
    return NextResponse.json({ ok: false, error: 'Wrong passcode' }, { status: 401 });
  }
  const { value, maxAge } = makeSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  });
  return res;
}
