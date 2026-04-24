"use client";

import Image from "next/image";
import { useState } from "react";
import LightboxWrapper from "./LightboxWrapper";

export type GalleryImage = {
  key: string;
  url: string;
};

interface PortfolioCategoryGalleryProps {
  images: GalleryImage[];
  categoryLabel: string;
}

export default function PortfolioCategoryGallery({
  images,
  categoryLabel,
}: PortfolioCategoryGalleryProps) {
  const [index, setIndex] = useState(-1);

  if (images.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border bg-bg-card px-6 py-16 text-center">
        <p className="text-text-secondary">
          {categoryLabel} portfolio coming soon — check back shortly.
        </p>
      </div>
    );
  }

  const slides = images.map((img) => ({
    src: img.url,
    alt: categoryLabel,
    width: 1600,
    height: 1067,
  }));

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, i) => (
          <li
            key={img.key}
            className="group relative aspect-square overflow-hidden rounded-card bg-bg-card"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="block h-full w-full"
              aria-label={`Open ${categoryLabel} image ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={`${categoryLabel} photograph ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </button>
          </li>
        ))}
      </ul>
      <LightboxWrapper
        slides={slides}
        index={index}
        onClose={() => setIndex(-1)}
      />
    </>
  );
}
