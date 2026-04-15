import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
  generateLocalBusinessJsonLd,
} from "@/lib/metadata";
import {
  getLocationBySlug,
  getAllLocationSlugs,
} from "@/data/locations";
import { services } from "@/data/services";
import ServiceIcon from "@/components/ui/ServiceIcon";

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ city: slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return {};

  return generatePageMetadata({
    title: location.metaTitle.replace(" | Adi Photography", ""),
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/" },
    { name: location.name, url: `/locations/${location.slug}` },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd
        data={generateLocalBusinessJsonLd({
          name: `Adi Photography ${location.name}`,
          city: location.name,
          latitude: location.geo.latitude,
          longitude: location.geo.longitude,
        })}
      />

      <section className="pt-32 pb-12 bg-bg-primary">
        <Container>
          <Breadcrumbs
            items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
          />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mt-4 mb-4">
            {location.h1}
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-2xl">
            {location.description}
          </p>
        </Container>
      </section>

      <section className="py-16 bg-bg-primary">
        <Container>
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-text-secondary font-dm text-base leading-relaxed mb-8">
                {location.content}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Services available */}
      <section className="py-20 bg-bg-secondary">
        <Container>
          <ScrollReveal>
            <div className="w-12 h-0.5 bg-accent mb-4" />
            <h2 className="text-3xl font-playfair font-semibold text-text-primary mb-8">
              Our Services in {location.name}
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
                      Available in {location.name}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title={`Book Photography Services in ${location.name}`}
        subtitle={`Ready to start your project in ${location.name}? Contact us for availability and pricing.`}
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
