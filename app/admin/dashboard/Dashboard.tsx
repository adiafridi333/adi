'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const FOLDERS = ['portfolio', 'team', 'hero', 'blog'] as const;
type Folder = (typeof FOLDERS)[number];

const FOLDER_LABELS: Record<Folder, string> = {
  portfolio: 'Portfolio',
  team: 'Team',
  hero: 'Hero',
  blog: 'Blog',
};

const FOLDER_HINTS: Record<Folder, string> = {
  portfolio: 'Portfolio shots organised by category.',
  team: 'Headshots & team member photos.',
  hero: 'Big banner / hero images.',
  blog: 'Cover images & inline blog photos.',
};

const PORTFOLIO_CATEGORIES = [
  'weddings',
  'corporate',
  'events',
  'drone',
  'fashion',
  'videography',
] as const;
type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  weddings: 'Weddings',
  corporate: 'Corporate',
  events: 'Events',
  drone: 'Drone',
  fashion: 'Fashion',
  videography: 'Videography',
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
  portfolioCategories?: Record<string, { count: number; bytes: number }>;
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
  const [folder, setFolder] = useState<Folder>('portfolio');
  const [category, setCategory] = useState<PortfolioCategory | 'all'>('all');
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [uploadLabel, setUploadLabel] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshList = useCallback(async (f: Folder, cat: PortfolioCategory | 'all') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ folder: f });
      if (f === 'portfolio' && cat !== 'all') params.set('category', cat);
      const res = await fetch(`/api/admin/list?${params.toString()}`, { cache: 'no-store' });
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
    refreshList(folder, category);
  }, [folder, category, refreshList]);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  // Reset category when leaving portfolio
  useEffect(() => {
    if (folder !== 'portfolio') setCategory('all');
  }, [folder]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }

  function putToR2(file: File, uploadUrl: string, onProgress: (loaded: number) => void) {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(e.loaded);
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`R2 rejected file (${xhr.status})`));
      };
      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(file);
    });
  }

  async function handleUpload(files: FileList | File[] | null) {
    if (!files || files.length === 0) return;
    if (folder === 'portfolio' && category === 'all') {
      setError('Pick a portfolio category before uploading (Weddings, Corporate, etc.)');
      return;
    }
    const list = Array.from(files);
    const totalBytesToUpload = list.reduce((sum, f) => sum + f.size, 0);
    setUploading(true);
    setUploadPct(0);
    setUploadLabel(`Preparing ${list.length} file${list.length === 1 ? '' : 's'}…`);
    setError(null);

    let okCount = 0;
    const failures: { name: string; reason: string }[] = [];
    const perFileLoaded = new Map<number, number>();

    const updateOverall = () => {
      const loaded = Array.from(perFileLoaded.values()).reduce((a, b) => a + b, 0);
      const pct = totalBytesToUpload > 0 ? Math.min(99, Math.round((loaded / totalBytesToUpload) * 100)) : 0;
      setUploadPct(pct);
      setUploadLabel(
        `Uploading ${okCount} of ${list.length} · ${formatBytes(loaded)} / ${formatBytes(totalBytesToUpload)}`,
      );
    };

    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      try {
        const signRes = await fetch('/api/admin/sign-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            folder,
            category: folder === 'portfolio' && category !== 'all' ? category : undefined,
            filename: file.name,
            contentType: file.type,
            size: file.size,
          }),
        });
        const signData = await signRes.json();
        if (!signRes.ok || !signData.ok) {
          throw new Error(signData.error ?? 'Failed to prepare upload');
        }
        await putToR2(file, signData.uploadUrl, (loaded) => {
          perFileLoaded.set(i, loaded);
          updateOverall();
        });
        perFileLoaded.set(i, file.size);
        okCount += 1;
        updateOverall();
      } catch (err) {
        failures.push({
          name: file.name,
          reason: err instanceof Error ? err.message : 'Upload failed',
        });
        perFileLoaded.set(i, file.size); // count as "done" for progress purposes
        updateOverall();
      }
    }

    setUploadPct(100);
    setUploadLabel('Done');
    notify(`Uploaded ${okCount}${failures.length ? ` · ${failures.length} failed` : ''}`);
    if (failures.length && failures[0].reason) {
      setError(`${failures[0].name}: ${failures[0].reason}`);
    }
    await Promise.all([refreshList(folder, category), refreshStats()]);
    setUploading(false);
    setUploadPct(0);
    setUploadLabel('');
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      await Promise.all([refreshList(folder, category), refreshStats()]);
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
  const uploadDisabled = uploading || (folder === 'portfolio' && category === 'all');

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

        <section className="mb-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 p-1.5">
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

        {folder === 'portfolio' && (
          <section className="mb-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/40 p-1.5">
            <button
              onClick={() => setCategory('all')}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs transition ${
                category === 'all'
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'text-neutral-300 hover:bg-neutral-800/80'
              }`}
            >
              All
            </button>
            {PORTFOLIO_CATEGORIES.map((c) => {
              const isActive = category === c;
              const count = stats?.portfolioCategories?.[c]?.count ?? 0;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs transition ${
                    isActive
                      ? 'bg-emerald-500 text-neutral-950'
                      : 'text-neutral-300 hover:bg-neutral-800/80'
                  }`}
                >
                  <span>{CATEGORY_LABELS[c]}</span>
                  <span
                    className={`rounded px-1 py-0.5 text-[10px] tabular-nums ${
                      isActive ? 'bg-emerald-700/40 text-emerald-50' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </section>
        )}

        <p className="mb-3 text-xs text-neutral-500">
          {folder === 'portfolio' && category !== 'all'
            ? `Uploads will be saved to portfolio/${category}/`
            : FOLDER_HINTS[folder]}
        </p>

        <section
          onDragOver={(e) => {
            if (uploadDisabled) return;
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            if (uploadDisabled) return;
            onDrop(e);
          }}
          className={`mb-4 rounded-xl border-2 border-dashed p-6 text-center transition ${
            dragOver
              ? 'border-emerald-400 bg-emerald-500/10'
              : 'border-neutral-800 bg-neutral-900/40'
          } ${uploadDisabled && !uploading ? 'opacity-60' : ''}`}
        >
          {folder === 'portfolio' && category === 'all' ? (
            <div className="text-sm text-amber-300">
              Pick a category above (Weddings, Corporate, …) before uploading.
            </div>
          ) : uploading ? (
            <div className="space-y-2">
              <div className="text-sm font-medium text-neutral-200">{uploadLabel || 'Uploading…'}</div>
              <div className="mx-auto h-2 max-w-md overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full bg-emerald-500 transition-all duration-150"
                  style={{ width: `${uploadPct}%` }}
                />
              </div>
              <div className="text-xs tabular-nums text-neutral-400">{uploadPct}%</div>
            </div>
          ) : (
            <>
              <div className="mb-3 text-sm text-neutral-400">Drag & drop images here, or</div>
              <label className="inline-block cursor-pointer rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-emerald-400">
                Choose files
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleUpload(e.target.files)}
                  disabled={uploadDisabled}
                  className="hidden"
                />
              </label>
              <div className="mt-2 text-[11px] text-neutral-500">
                JPG · PNG · WebP · GIF · AVIF · SVG · max 25 MB each
              </div>
            </>
          )}
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
              refreshList(folder, category);
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
            <div className="mb-1 text-neutral-300">
              No images in {FOLDER_LABELS[folder]}
              {folder === 'portfolio' && category !== 'all' ? ` / ${CATEGORY_LABELS[category]}` : ''} yet.
            </div>
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
