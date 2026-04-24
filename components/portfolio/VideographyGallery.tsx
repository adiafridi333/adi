import type { VideoEntry } from "@/lib/video";
import MinimalVideoPlayer from "./MinimalVideoPlayer";

interface VideographyGalleryProps {
  videos: VideoEntry[];
}

export default function VideographyGallery({ videos }: VideographyGalleryProps) {
  if (videos.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border bg-bg-card px-6 py-16 text-center">
        <p className="text-text-secondary">
          Videography showreels coming soon — check back shortly.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {videos.map((v) => (
        <li
          key={v.id}
          className="overflow-hidden rounded-card border border-border bg-bg-card"
        >
          <MinimalVideoPlayer video={v} />
          {v.title && (
            <div className="p-4">
              <h3 className="font-playfair text-lg text-text-primary">{v.title}</h3>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
