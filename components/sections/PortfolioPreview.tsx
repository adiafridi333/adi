"use client";

import Image from "next/image";
import { portfolioItems } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export default function PortfolioPreview() {
  const previewItems = portfolioItems.slice(0, 6);

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Work"
          subtitle="A glimpse of our recent projects across weddings, corporate events, and commercial photography"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-card">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/60 transition-all duration-300 flex items-end">
                  <div className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-text-primary font-dm text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-accent text-xs font-dm capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/portfolio" variant="outline">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
