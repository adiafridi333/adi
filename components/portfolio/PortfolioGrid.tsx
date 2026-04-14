"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { portfolioItems, portfolioCategories, type PortfolioCategory } from "@/data/portfolio";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LightboxWrapper = dynamic(() => import("./LightboxWrapper") as any, {
  ssr: false,
}) as React.ComponentType<{
  slides: { src: string; alt: string; width: number; height: number }[];
  index: number;
  onClose: () => void;
}>;

interface PortfolioGridProps {
  category?: PortfolioCategory;
  showFilters?: boolean;
}

export default function PortfolioGrid({
  category,
  showFilters = true,
}: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>(category || "all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const lightboxSlides = filteredItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    width: item.width,
    height: item.height,
  }));

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveFilter("all")}
            className={cn(
              "px-5 py-2 text-sm font-dm font-medium rounded-btn transition-all duration-300",
              activeFilter === "all"
                ? "bg-accent text-bg-primary"
                : "bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-accent/50"
            )}
          >
            All
          </button>
          {portfolioCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveFilter(cat.slug)}
              className={cn(
                "px-5 py-2 text-sm font-dm font-medium rounded-btn transition-all duration-300",
                activeFilter === cat.slug
                  ? "bg-accent text-bg-primary"
                  : "bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-accent/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredItems.map((item, index) => (
          <ScrollReveal key={item.id} delay={Math.min(index * 0.05, 0.3)}>
            <div
              className="group relative overflow-hidden rounded-card cursor-pointer break-inside-avoid"
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-10 h-10 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <LightboxWrapper
        slides={lightboxSlides}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
      />
    </>
  );
}
