import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
  generateServiceJsonLd,
  generateFaqJsonLd,
} from "@/lib/metadata";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import { getPortfolioByCategory, type PortfolioCategory } from "@/data/portfolio";

interface ServicePageProps {
  params: { service: string };
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ service: slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.service);
  if (!service) return {};

  return generatePageMetadata({
    title: service.metaTitle.replace(" | Adi Photography Peshawar", ""),
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage,
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.service);
  if (!service) notFound();

  const portfolioSamples = getPortfolioByCategory(
    service.portfolioCategory as PortfolioCategory
  ).slice(0, 6);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={generateServiceJsonLd({
          name: service.title,
          description: service.description,
          url: `/services/${service.slug}`,
          image: service.heroImage,
        })}
      />
      <JsonLd data={generateFaqJsonLd(service.faqs)} />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={`${service.title} in Peshawar by Adi Photography`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mb-4">
            {service.h1}
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-xl mx-auto">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <Container className="py-6">
        <Breadcrumbs
          items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
        />
      </Container>

      {/* Description */}
      <section className="py-16 bg-bg-primary">
        <Container>
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-text-secondary font-dm text-base leading-relaxed">
                {service.description}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section className="py-20 bg-bg-secondary">
        <Container>
          <ScrollReveal>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
            <h2 className="text-3xl font-playfair font-semibold text-text-primary text-center mb-12">
              What&apos;s Included
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {service.deliverables.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.05}>
                <div className="flex items-start gap-3 bg-bg-card border border-border rounded-card p-4">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-text-secondary font-dm text-sm">
                    {item}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20 bg-bg-primary">
        <Container>
          <ScrollReveal>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
            <h2 className="text-3xl font-playfair font-semibold text-text-primary text-center mb-12">
              Our Process
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {service.process.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-accent font-playfair font-bold text-xl">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-playfair font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary font-dm text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio Samples */}
      {portfolioSamples.length > 0 && (
        <section className="py-20 bg-bg-secondary">
          <Container>
            <ScrollReveal>
              <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
              <h2 className="text-3xl font-playfair font-semibold text-text-primary text-center mb-12">
                Portfolio Samples
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioSamples.map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 0.08}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                href={`/portfolio/${service.portfolioCategory}`}
                variant="outline"
              >
                View Full {service.title} Portfolio
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <FaqSection faqs={service.faqs} />

      {/* CTA */}
      <CtaBanner
        title={`Book ${service.title} in Peshawar`}
        subtitle={`Ready to get started? Contact us to discuss your ${service.title.toLowerCase()} project.`}
        buttonLabel="Get a Free Quote"
        buttonHref="/contact"
      />
    </>
  );
}
