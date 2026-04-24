import type { VideoEntry } from "@/lib/video";

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
          <div className="relative aspect-video bg-black">
            {v.provider === "direct" ? (
              <video
                src={v.embedUrl}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full"
              />
            ) : (
              <iframe
                src={v.embedUrl}
                title={v.title || "Adi Photography videography"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
          </div>
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
