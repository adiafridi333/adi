// Client-side image downscaling so we never upload 20+ MB camera originals
// to R2. Skips SVG and GIF (animated). Falls back to original on any error.

const MAX_LONG_EDGE = 2560;
const QUALITY = 0.9;
const SKIP_TYPES = new Set(['image/svg+xml', 'image/gif']);
const SKIP_BELOW_BYTES = 1.5 * 1024 * 1024; // already small enough

export async function compressImageIfBig(file: File): Promise<File> {
  if (typeof window === 'undefined') return file;
  if (SKIP_TYPES.has(file.type)) return file;
  if (file.size <= SKIP_BELOW_BYTES) return file;
  if (!file.type.startsWith('image/')) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const longEdge = Math.max(bitmap.width, bitmap.height);
    if (longEdge <= MAX_LONG_EDGE) {
      bitmap.close?.();
      return file;
    }
    const scale = MAX_LONG_EDGE / longEdge;
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close?.();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();
    const outType =
      file.type === 'image/png' || file.type === 'image/webp' ? file.type : 'image/jpeg';
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, outType, QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;
    const ext = outType === 'image/png' ? 'png' : outType === 'image/webp' ? 'webp' : 'jpg';
    const newName = file.name.replace(/\.[^.]+$/, '') + '.' + ext;
    return new File([blob], newName, { type: outType, lastModified: Date.now() });
  } catch {
    return file;
  }
}
