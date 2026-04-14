"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-bg-primary/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center -ml-2"
            aria-label="Adi Photography Home"
          >
            <Image
              src="https://pub-45c507c035214836bf31cb43c8f8946b.r2.dev/adi%20photography%20white.png"
              alt="Adi Photography & Films"
              width={180}
              height={64}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {mainNavLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.children && setActiveDropdown(link.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-dm font-medium tracking-wide transition-colors relative py-2",
                    pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  {(pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent" />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-bg-card border border-border rounded-card shadow-xl py-2 animate-fade-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2.5 text-sm font-dm transition-colors",
                          pathname === child.href
                            ? "text-accent bg-bg-secondary"
                            : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Book Now CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center px-6 py-2.5 bg-accent hover:bg-accent-hover text-bg-primary font-dm font-medium text-sm tracking-wide rounded-btn transition-all duration-300"
          >
            Book Now
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span
              className={cn(
                "w-6 h-0.5 bg-text-primary transition-all duration-300",
                isMobileOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 bg-text-primary transition-all duration-300",
                isMobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "w-6 h-0.5 bg-text-primary transition-all duration-300",
                isMobileOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Mobile Menu Panel */}
        <div
          className={cn(
            "lg:hidden fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out",
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <span className="text-lg font-playfair font-bold text-gray-900">Menu</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center w-11 h-11 text-gray-600 hover:text-gray-900"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-6 overflow-y-auto h-[calc(100%-80px)]">
            {mainNavLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-3 min-h-[44px] flex items-center text-base font-dm font-medium transition-colors border-b border-gray-100",
                    pathname === link.href
                      ? "text-accent"
                      : "text-gray-900 hover:text-accent"
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block py-2 text-sm font-dm transition-colors",
                          pathname === child.href
                            ? "text-accent"
                            : "text-gray-600 hover:text-accent"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-hover text-white font-dm font-medium text-sm tracking-wide rounded-btn transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
