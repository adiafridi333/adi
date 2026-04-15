import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] bg-bg-primary pt-32 pb-20 flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
        <p className="text-accent font-dm text-sm font-medium tracking-wide uppercase mb-3">
          404
        </p>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary font-dm text-base leading-relaxed mb-8">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/">
            Back to Home
          </Button>
          <Button href="/areas" variant="outline">
            View Areas
          </Button>
        </div>
      </div>
    </section>
  );
}
