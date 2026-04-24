'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const FOLDERS = ['gallery', 'portfolio', 'team', 'hero', 'blog'] as const;
type Folder = (typeof FOLDERS)[number];

const FOLDER_LABELS: Record<Folder, string> = {
  gallery: 'Gallery',
  portfolio: 'Portfolio',
  team: 'Team',
  hero: 'Hero',
  blog: 'Blog',
};

const FOLDER_HINTS: Record<Folder, string> = {
  gallery: 'Public photo gallery shown at /gallery.',
  portfolio: 'Portfolio shots used across the site.',
  team: 'Headshots & team member photos.',
  hero: 'Big banner / hero images.',
  blog: 'Cover images & inline blog photos.',
};

type Item = {
  key: string;
  size: number;
  lastModified: string | null;
  url: string;
};

type Stats = {
  totalCount: number;
  totalBytes: number;
  folders: Record<string, { count: number; bytes: number }>;
};

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function timeAgo(iso: string | null): string {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

const FREE_TIER_BYTES = 10 * 1024 * 1024 * 1024; // 10 GB

export default function Dashboard() {
  const router = useRouter();
  const [folder, setFolder] = useState<Folder>('gallery');
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshList = useCallback(async (f: Folder) => {
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

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.ok) setStats(data);
    } catch {
      // non-fatal
    }
  }, []);

  useEffect(() => {
    refreshList(folder);
  }, [folder, refreshList]);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }

  async function handleUpload(files: FileList | File[] | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setUploading(true);
    setError(null);
    setUploadProgress(`Uploading 0 / ${list.length}…`);
    try {
      const form = new FormData();
      form.append('folder', folder);
      list.forEach((f) => form.append('files', f));
      setUploadProgress(`Uploading ${list.length} file${list.length === 1 ? '' : 's'}…`);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Upload failed');
      const okCount = data.uploaded?.length ?? 0;
      const failCount = data.failures?.length ?? 0;
      notify(`Uploaded ${okCount}${failCount ? ` · ${failCount} failed` : ''}`);
      if (failCount && data.failures?.[0]?.reason) {
        setError(`${data.failures[0].name}: ${data.failures[0].reason}`);
      }
      await Promise.all([refreshList(folder), refreshStats()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function deleteKeys(keys: string[], confirmMessage: string) {
    if (keys.length === 0) return;
    if (!confirm(confirmMessage)) return;
    setError(null);
    try {
      const res = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keys }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Delete failed');
      notify(`Deleted ${data.deleted?.length ?? 0}`);
      await Promise.all([refreshList(folder), refreshStats()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  async function handleDeleteSelected() {
    await deleteKeys(
      Array.from(selected),
      `Delete ${selected.size} file(s)? This cannot be undone.`,
    );
  }

  async function handleDeleteOne(key: string) {
    const name = key.split('/').slice(1).join('/');
    await deleteKeys([key], `Delete "${name}"? This cannot be undone.`);
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

  function copyUrl(url: string) {
    navigator.clipboard?.writeText(url).then(() => notify('URL copied'));
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files?.length) handleUpload(e.dataTransfer.files);
  }

  const totalBytes = stats?.totalBytes ?? 0;
  const totalCount = stats?.totalCount ?? 0;
  const usedPct = Math.min(100, (totalBytes / FREE_TIER_BYTES) * 100);
  const folderBytes = stats?.folders?.[folder]?.bytes ?? 0;
  const folderCount = stats?.folders?.[folder]?.count ?? 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-20 border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-sm font-bold text-neutral-950">
              A
            </div>
            <div>
              <div className="text-sm font-semibold">Admin</div>
              <div className="text-[11px] text-neutral-500">Adi Photography · Cloudflare R2</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg border border-neutral-800 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900 sm:inline-block"
            >
              View site ↗
            </a>
            <button
              onClick={logout}
              className="rounded-lg border border-neutral-800 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">Storage used</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{formatBytes(totalBytes)}</div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${usedPct}%` }}
              />
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">
              {usedPct.toFixed(2)}% of 10 GB free tier
            </div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">Total files</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{totalCount}</div>
            <div className="mt-1 text-[11px] text-neutral-500">across all folders</div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">
              {FOLDER_LABELS[folder]} folder
            </div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{folderCount}</div>
            <div className="mt-1 text-[11px] text-neutral-500">{formatBytes(folderBytes)}</div>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">Bucket</div>
            <div className="mt-1 truncate text-sm font-medium text-neutral-200">images</div>
            <div className="mt-1 text-[11px] text-neutral-500">Cloudflare R2 · public</div>
          </div>
        </section>

        <section className="mb-4 flex flex-wrap items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 p-1.5">
          {FOLDERS.map((f) => {
            const count = stats?.folders?.[f]?.count ?? 0;
            const isActive = folder === f;
            return (
              <button
                key={f}
                onClick={() => setFolder(f)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition ${
                  isActive
                    ? 'bg-white text-neutral-900'
                    : 'text-neutral-300 hover:bg-neutral-800/80'
                }`}
              >
                <span>{FOLDER_LABELS[f]}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] tabular-nums ${
                    isActive ? 'bg-neutral-200 text-neutral-700' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </section>

        <p className="mb-3 text-xs text-neutral-500">{FOLDER_HINTS[folder]}</p>

        <section
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`mb-4 rounded-xl border-2 border-dashed p-6 text-center transition ${
            dragOver
              ? 'border-emerald-400 bg-emerald-500/10'
              : 'border-neutral-800 bg-neutral-900/40'
          }`}
        >
          <div className="mb-3 text-sm text-neutral-400">
            Drag & drop images here, or
          </div>
          <label className="inline-block cursor-pointer rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-emerald-400">
            {uploading ? uploadProgress ?? 'Uploading…' : 'Choose files'}
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
          <div className="mt-2 text-[11px] text-neutral-500">
            JPG · PNG · WebP · GIF · AVIF · SVG · max 25 MB each
          </div>
        </section>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button
            onClick={handleDeleteSelected}
            disabled={selected.size === 0}
            className="rounded-lg border border-red-700/60 bg-red-950/30 px-3 py-1.5 text-sm text-red-300 hover:bg-red-900/50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Delete selected ({selected.size})
          </button>
          {items.length > 0 && (
            <button
              onClick={toggleAll}
              className="rounded-lg border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-900"
            >
              {selected.size === items.length ? 'Clear selection' : 'Select all'}
            </button>
          )}
          <div className="ml-auto text-xs text-neutral-500">
            {items.length} item{items.length === 1 ? '' : 's'}
          </div>
          <button
            onClick={() => {
              refreshList(folder);
              refreshStats();
            }}
            className="rounded-lg border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-900"
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-xl bg-neutral-900"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30 px-4 py-16 text-center">
            <div className="mb-1 text-neutral-300">No images in {FOLDER_LABELS[folder]} yet.</div>
            <div className="text-xs text-neutral-500">
              Drag files into the area above to upload.
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item) => {
              const isSel = selected.has(item.key);
              const name = item.key.split('/').slice(1).join('/');
              return (
                <li
                  key={item.key}
                  className={`group relative overflow-hidden rounded-xl border transition ${
                    isSel
                      ? 'border-emerald-400 ring-2 ring-emerald-400/40'
                      : 'border-neutral-800 hover:border-neutral-700'
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
                  </button>
                  <div className="space-y-0.5 p-2">
                    <div className="truncate text-xs text-neutral-200" title={name}>
                      {name}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span>{formatBytes(item.size)}</span>
                      <span>{timeAgo(item.lastModified)}</span>
                    </div>
                  </div>
                  <div
                    className={`pointer-events-none absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold transition ${
                      isSel
                        ? 'bg-emerald-400 text-neutral-950'
                        : 'bg-black/60 text-white opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {isSel ? '✓' : '+'}
                  </div>
                  <div className="absolute bottom-12 right-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(item.url);
                      }}
                      className="rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] text-white hover:bg-black"
                      title="Copy URL"
                    >
                      Copy
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] text-white hover:bg-black"
                      title="Open"
                    >
                      Open
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOne(item.key);
                      }}
                      className="rounded-md bg-red-600/90 px-1.5 py-0.5 text-[10px] font-medium text-white hover:bg-red-500"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {toast && (
          <div className="fixed bottom-4 right-4 z-30 rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-900 shadow-xl">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
