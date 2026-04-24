import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import type { Metadata } from 'next';
import Image from 'next/image';
import { R2_BUCKET, getR2Client, publicUrlFor } from '@/lib/r2';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Latest photographs from our work.',
};

export const revalidate = 60;

async function loadGalleryItems() {
  try {
    const client = getR2Client();
    const out = await client.send(
      new ListObjectsV2Command({ Bucket: R2_BUCKET, Prefix: 'gallery/', MaxKeys: 1000 }),
    );
    return (out.Contents ?? [])
      .filter((o) => o.Key && !o.Key.endsWith('/'))
      .map((o) => ({
        key: o.Key!,
        url: publicUrlFor(o.Key!),
        lastModified: o.LastModified?.getTime() ?? 0,
      }))
      .sort((a, b) => b.lastModified - a.lastModified);
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const items = await loadGalleryItems();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Gallery</h1>
        <p className="mt-1 text-neutral-500">
          {items.length === 0 ? 'No images yet.' : `${items.length} photographs`}
        </p>
      </header>
      {items.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <li key={item.key} className="overflow-hidden rounded-xl bg-neutral-100">
              <Image
                src={item.url}
                alt=""
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
