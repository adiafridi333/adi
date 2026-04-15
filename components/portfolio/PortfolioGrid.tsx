"use client";

import Link from "next/link";
import { portfolioCategories, type PortfolioCategory } from "@/data/portfolio";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface PortfolioGridProps {
  category?: PortfolioCategory;
  showFilters?: boolean;
}

export default function PortfolioGrid({
  category,
  showFilters = true,
}: PortfolioGridProps) {
  const visibleCategories = category
    ? portfolioCategories.filter((cat) => cat.slug === category)
    : portfolioCategories;

  return (
    <div className="space-y-10">
      {showFilters && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {portfolioCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/portfolio/${cat.slug}`}
              className="inline-flex min-h-[44px] items-center px-5 py-2 text-sm font-dm font-medium rounded-btn bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-accent/50 transition-all duration-300"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCategories.map((cat, index) => (
          <ScrollReveal key={cat.slug} delay={index * 0.05}>
            <Link
              href={`/portfolio/${cat.slug}`}
              className="group block bg-bg-card border border-border rounded-card p-8 hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-2xl font-playfair font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {cat.label}
                </h2>
                <svg
                  className="w-5 h-5 text-accent shrink-0 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
              <p className="text-text-secondary font-dm text-sm leading-relaxed">
                View {cat.label.toLowerCase()} portfolio details and service
                information.
              </p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
