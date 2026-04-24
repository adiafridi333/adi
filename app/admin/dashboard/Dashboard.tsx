'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const FOLDERS = ['gallery', 'team', 'hero', 'blog'] as const;
type Folder = (typeof FOLDERS)[number];

type Item = {
  key: string;
  size: number;
  lastModified: string | null;
  url: string;
};

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export default function Dashboard() {
  const router = useRouter();
  const [folder, setFolder] = useState<Folder>('gallery');
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refresh = useCallback(async (f: Folder) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/list?folder=${f}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Failed to load');
      setItems(data.items);
      setSelected(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh(folder);
  }, [folder, refresh]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('folder', folder);
      Array.from(files).forEach((f) => form.append('files', f));
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Upload failed');
      const okCount = data.uploaded?.length ?? 0;
      const failCount = data.failures?.length ?? 0;
      notify(`Uploaded ${okCount}${failCount ? ` · ${failCount} failed` : ''}`);
      if (failCount && data.failures?.[0]?.reason) {
        setError(`${data.failures[0].name}: ${data.failures[0].reason}`);
      }
      await refresh(folder);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleDeleteSelected() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} file(s)? This cannot be undone.`)) return;
    setError(null);
    try {
      const res = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys: Array.from(selected) }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Delete failed');
      notify(`Deleted ${data.deleted?.length ?? 0}`);
      await refresh(folder);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin');
    router.refresh();
  }

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === items.length ? new Set() : new Set(items.map((i) => i.key)),
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Image library</h1>
          <p className="text-sm text-neutral-400">Manage what's stored in Cloudflare R2.</p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800"
        >
          Sign out
        </button>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {FOLDERS.map((f) => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`rounded-lg px-3 py-1.5 text-sm capitalize transition ${
              folder === f
                ? 'bg-white text-neutral-900'
                : 'border border-neutral-800 text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="cursor-pointer rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-neutral-950 hover:bg-emerald-400">
          {uploading ? 'Uploading…' : 'Upload images'}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <button
          onClick={handleDeleteSelected}
          disabled={selected.size === 0}
          className="rounded-lg border border-red-700 px-3 py-2 text-sm text-red-300 hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Delete selected ({selected.size})
        </button>
        <button
          onClick={() => refresh(folder)}
          className="ml-auto rounded-lg border border-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-900"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-neutral-500">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-800 px-4 py-16 text-center text-neutral-500">
          No images in <span className="text-neutral-300">{folder}/</span> yet. Upload some.
        </div>
      ) : (
        <>
          <div className="mb-2 text-xs text-neutral-500">
            {items.length} item{items.length === 1 ? '' : 's'} ·{' '}
            <button onClick={toggleAll} className="underline-offset-2 hover:underline">
              {selected.size === items.length ? 'Clear selection' : 'Select all'}
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item) => {
              const isSel = selected.has(item.key);
              const name = item.key.split('/').slice(1).join('/');
              return (
                <li
                  key={item.key}
                  className={`group relative overflow-hidden rounded-xl border ${
                    isSel ? 'border-emerald-400' : 'border-neutral-800'
                  } bg-neutral-900`}
                >
                  <button
                    onClick={() => toggle(item.key)}
                    className="block w-full text-left"
                    aria-label={`Toggle ${name}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={name}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                    <div className="space-y-0.5 p-2 text-xs">
                      <div className="truncate text-neutral-200" title={name}>
                        {name}
                      </div>
                      <div className="text-neutral-500">{formatBytes(item.size)}</div>
                    </div>
                  </button>
                  <div
                    className={`pointer-events-none absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                      isSel ? 'bg-emerald-400 text-neutral-950' : 'bg-black/60 text-neutral-300 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {isSel ? 'Selected' : 'Click to select'}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-neutral-200 opacity-0 transition group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-neutral-800 px-3 py-2 text-sm text-neutral-100 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
