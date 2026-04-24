import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 16) {
    throw new Error('ADMIN_SESSION_SECRET must be set (>= 16 chars). Generate with: openssl rand -hex 32');
  }
  return value;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export function verifyPasscode(input: string): boolean {
  const expected = process.env.ADMIN_PASSCODE ?? '';
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function makeSessionToken(): { value: string; maxAge: number } {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `v1.${expiresAt}`;
  const sig = sign(payload);
  return { value: `${payload}.${sig}`, maxAge: SESSION_TTL_SECONDS };
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [version, expiresAtStr, sig] = parts;
  if (version !== 'v1') return false;
  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
  let expectedSig: string;
  try {
    expectedSig = sign(`${version}.${expiresAtStr}`);
  } catch {
    return false;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(ADMIN_COOKIE)?.value);
}
