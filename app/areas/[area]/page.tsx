import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceIcon from "@/components/ui/ServiceIcon";
import CtaBanner from "@/components/sections/CtaBanner";
import FaqSection from "@/components/sections/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateLocalBusinessJsonLd,
} from "@/lib/metadata";
import {
  getAreaByNameOrAlias,
  getAreaBySlug,
  getAllAreaSlugs,
} from "@/data/areas";
import { services } from "@/data/services";

interface AreaPageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ area: slug }));
}

export async function generateMetadata({
  params,
}: AreaPageProps): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = getAreaBySlug(areaSlug);
  if (!area) return {};

  return generatePageMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/areas/${area.slug}`,
  });
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { area: areaSlug } = await params;
  const area = getAreaBySlug(areaSlug);
  if (!area) notFound();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Areas", url: "/areas" },
    { name: area.name, url: `/areas/${area.slug}` },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={generateLocalBusinessJsonLd({
          name: `Adi Photography ${area.name}`,
          city: area.name,
        })}
      />
      <JsonLd data={generateFaqJsonLd(area.faqs)} />

      <section className="pt-32 pb-12 bg-bg-primary">
        <Container>
          <Breadcrumbs
            items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
          />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mt-4 mb-4">
            {area.h1}
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-2xl">
            {area.description}
          </p>
        </Container>
      </section>

      <section className="py-16 bg-bg-primary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            <ScrollReveal>
              <div className="max-w-3xl">
                <p className="text-text-secondary font-dm text-base leading-relaxed">
                  {area.content}
                </p>
                <div className="mt-10 space-y-10">
                  {area.seoSections.map((section) => (
                    <section key={section.heading}>
                      <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-text-primary mb-4">
                        {section.heading}
                      </h2>
                      <p className="text-text-secondary font-dm text-base leading-relaxed">
                        {section.body}
                      </p>
                    </section>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="bg-bg-card border border-border rounded-card p-6">
                <h2 className="text-xl font-playfair font-semibold text-text-primary mb-5">
                  Coverage Includes
                </h2>
                <ul className="space-y-4">
                  {area.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
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
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
                {area.aliases && area.aliases.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-text-primary font-dm text-sm font-medium mb-3">
                      Also Searched As
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {area.aliases.map((alias) => (
                        <span
                          key={alias}
                          className="inline-flex items-center min-h-[36px] bg-bg-secondary border border-border rounded-card px-3 text-text-secondary font-dm text-xs"
                        >
                          {alias}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-secondary">
        <Container>
          <ScrollReveal>
            <div className="w-12 h-0.5 bg-accent mb-4" />
            <h2 className="text-3xl font-playfair font-semibold text-text-primary mb-8">
              Our Services in {area.name}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.08}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-4 bg-bg-card border border-border rounded-card p-5 hover:border-accent/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <ServiceIcon name={service.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-dm text-sm font-medium group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary font-dm text-xs mt-1">
                      Available in {area.name}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {area.nearbyAreas && area.nearbyAreas.length > 0 && (
        <section className="py-20 bg-bg-primary">
          <Container>
            <ScrollReveal>
              <div className="w-12 h-0.5 bg-accent mb-4" />
              <h2 className="text-3xl font-playfair font-semibold text-text-primary mb-8">
                Nearby Areas
              </h2>
            </ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {area.nearbyAreas.map((nearbyArea) => {
                const linkedArea = getAreaByNameOrAlias(nearbyArea);

                if (linkedArea) {
                  return (
                    <Link
                      key={nearbyArea}
                      href={`/areas/${linkedArea.slug}`}
                      className="inline-flex min-h-[44px] items-center bg-bg-card border border-border rounded-card px-4 text-text-secondary hover:text-accent hover:border-accent/50 font-dm text-sm transition-colors"
                    >
                      {nearbyArea}
                    </Link>
                  );
                }

                return (
                  <span
                    key={nearbyArea}
                    className="inline-flex min-h-[44px] items-center bg-bg-card border border-border rounded-card px-4 text-text-secondary font-dm text-sm"
                  >
                    {nearbyArea}
                  </span>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <FaqSection
        faqs={area.faqs}
        title={`Photography FAQs for ${area.name}`}
      />

      <CtaBanner
        title={`Book Photography Services in ${area.name}`}
        subtitle={`Ready to start your project in ${area.name}? Contact us for availability and pricing.`}
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
