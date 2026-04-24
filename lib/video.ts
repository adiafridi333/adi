export type VideoProvider = 'youtube' | 'vimeo' | 'direct';

export type VideoEntry = {
  id: string;
  url: string;
  provider: VideoProvider;
  videoId?: string;
  embedUrl: string;
  thumbnailUrl?: string;
  title?: string;
  addedAt: number;
};

function youtubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, '');
  if (host === 'youtu.be') return url.pathname.slice(1) || null;
  if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    if (url.pathname === '/watch') return url.searchParams.get('v');
    const m = url.pathname.match(/^\/(embed|shorts|live|v)\/([^/?#]+)/);
    if (m) return m[2];
  }
  return null;
}

function vimeoId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, '');
  if (host === 'vimeo.com') {
    const m = url.pathname.match(/^\/(\d+)/);
    if (m) return m[1];
  }
  if (host === 'player.vimeo.com') {
    const m = url.pathname.match(/^\/video\/(\d+)/);
    if (m) return m[1];
  }
  return null;
}

export function parseVideoUrl(input: string): Omit<VideoEntry, 'id' | 'addedAt'> | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(url.protocol)) return null;

  const yt = youtubeId(url);
  if (yt) {
    return {
      url: trimmed,
      provider: 'youtube',
      videoId: yt,
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1`,
      thumbnailUrl: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
    };
  }

  const vm = vimeoId(url);
  if (vm) {
    return {
      url: trimmed,
      provider: 'vimeo',
      videoId: vm,
      embedUrl: `https://player.vimeo.com/video/${vm}`,
    };
  }

  // Fallback: direct video URL (mp4/webm/mov)
  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(url.pathname + url.search)) {
    return {
      url: trimmed,
      provider: 'direct',
      embedUrl: trimmed,
    };
  }

  return null;
}

export function newVideoEntry(parsed: Omit<VideoEntry, 'id' | 'addedAt'>, title?: string): VideoEntry {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  return {
    ...parsed,
    id,
    title: title?.trim() || undefined,
    addedAt: Date.now(),
  };
}
