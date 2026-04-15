"use client";

import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[70vh] bg-bg-primary pt-32 pb-20 flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mb-4">
          Something went wrong
        </h1>
        <p className="text-text-secondary font-dm text-base leading-relaxed mb-8">
          The page could not load correctly. Try refreshing the page, or return
          to the homepage and continue browsing.
        </p>
        {error.digest && (
          <p className="text-text-secondary/80 font-dm text-xs mb-6">
            Error reference: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={reset} type="button">
            Try Again
          </Button>
          <Button href="/" variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
