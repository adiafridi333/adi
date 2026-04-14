"use client";

import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export default function CtaBanner({
  title = "Ready to Capture Your Moments?",
  subtitle = "Let's create something beautiful together. Book a session with Adi Photography today.",
  buttonLabel = "Book a Session",
  buttonHref = "/contact",
}: CtaBannerProps) {
  return (
    <section className="py-20 bg-bg-primary relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-text-primary mb-4">
            {title}
          </h2>
          <p className="text-text-secondary font-dm text-lg mb-8 max-w-xl mx-auto">
            {subtitle}
          </p>
          <Button href={buttonHref} variant="primary" size="lg">
            {buttonLabel}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
