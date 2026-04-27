"use client";

import { useState, type ReactNode } from "react";

export interface PortfolioTab {
  slug: string;
  label: string;
  panel: ReactNode;
}

interface PortfolioTabsProps {
  tabs: PortfolioTab[];
  defaultSlug?: string;
}

export default function PortfolioTabs({ tabs, defaultSlug }: PortfolioTabsProps) {
  const [active, setActive] = useState<string>(defaultSlug ?? tabs[0]?.slug ?? "");

  return (
    <div className="space-y-8">
      <div
        role="tablist"
        aria-label="Portfolio categories"
        className="flex flex-wrap items-center gap-2 border-b border-border pb-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <button
              key={tab.slug}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`portfolio-panel-${tab.slug}`}
              id={`portfolio-tab-${tab.slug}`}
              onClick={() => setActive(tab.slug)}
              className={`inline-flex min-h-[44px] items-center px-5 py-2 text-sm font-dm font-medium rounded-btn border transition-all duration-300 ${
                isActive
                  ? "bg-accent text-white border-accent"
                  : "bg-bg-card border-border text-text-secondary hover:text-text-primary hover:border-accent/50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.slug}
          role="tabpanel"
          id={`portfolio-panel-${tab.slug}`}
          aria-labelledby={`portfolio-tab-${tab.slug}`}
          hidden={tab.slug !== active}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
