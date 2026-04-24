'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Login failed');
        setLoading(false);
        return;
      }
      router.replace('/admin/dashboard');
      router.refresh();
    } catch {
      setError('Network error');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="password"
        inputMode="numeric"
        autoComplete="off"
        autoFocus
        placeholder="Passcode"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-center tracking-[0.4em] outline-none focus:border-neutral-400"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || passcode.length === 0}
        className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-neutral-900 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  );
}
