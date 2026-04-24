import type { MetadataRoute } from 'next';
import { getAllAreaSlugs } from '@/data/areas';
import { getAllLocationSlugs } from '@/data/locations';
import { getAllServiceSlugs } from '@/data/services';
import { portfolioCategories } from '@/data/portfolio';
import { getAllPosts, getAllCategories } from '@/lib/blog';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.adiphotography.pk';

type Entry = MetadataRoute.Sitemap[number];

function url(path: string, opts: Partial<Entry> = {}): Entry {
  return {
    url: `${SITE}${path}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? 'weekly',
    priority: opts.priority ?? 0.7,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    url('/', { priority: 1.0, changeFrequency: 'daily' }),
    url('/about', { priority: 0.7 }),
    url('/portfolio', { priority: 0.9 }),
    url('/services', { priority: 0.9 }),
    url('/areas', { priority: 0.8 }),
    url('/blog', { priority: 0.8 }),
    url('/contact', { priority: 0.7 }),
  ];

  for (const cat of portfolioCategories) {
    entries.push(url(`/portfolio/${cat.slug}`, { priority: 0.8 }));
  }

  for (const slug of getAllServiceSlugs()) {
    entries.push(url(`/services/${slug}`, { priority: 0.9 }));
  }

  for (const slug of getAllAreaSlugs()) {
    entries.push(url(`/areas/${slug}`, { priority: 0.8 }));
  }

  for (const slug of getAllLocationSlugs()) {
    entries.push(url(`/locations/${slug}`, { priority: 0.8 }));
  }

  for (const post of getAllPosts()) {
    entries.push(
      url(`/blog/${post.slug}`, {
        priority: 0.7,
        lastModified: new Date(post.date),
      }),
    );
  }

  for (const category of getAllCategories()) {
    entries.push(url(`/blog/category/${category}`, { priority: 0.6 }));
  }

  return entries;
}
