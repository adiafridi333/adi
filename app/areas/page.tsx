import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CtaBanner from "@/components/sections/CtaBanner";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceIcon from "@/components/ui/ServiceIcon";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
} from "@/lib/metadata";
import { areaCategories, getAreasByCategory } from "@/data/areas";
import { services } from "@/data/services";

export const metadata: Metadata = generatePageMetadata({
  title: "Photographer in Peshawar Areas & Nearby Cities",
  description:
    "Find professional photography and videography services across Peshawar areas and nearby cities including Hayatabad, University Town, Swat, Islamabad, Mardan, and more.",
  path: "/areas",
});

export default function AreasPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Areas", url: "/areas" },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />

      <section className="pt-32 pb-12 bg-bg-primary">
        <Container>
          <Breadcrumbs
            items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
          />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mt-4 mb-4">
            Photographer in Peshawar Areas & Nearby Cities
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-2xl">
            Professional photography and videography services for weddings,
            corporate events, private functions, portraits, fashion shoots, and
            drone projects across major Peshawar areas and important nearby
            cities.
          </p>
        </Container>
      </section>

      <section className="py-20 bg-bg-primary">
        <Container>
          <div className="space-y-16">
            {areaCategories.map((category, categoryIndex) => {
              const categoryAreas = getAreasByCategory(category.slug);

              return (
                <div key={category.slug}>
                  <ScrollReveal delay={categoryIndex * 0.05}>
                    <div className="w-12 h-0.5 bg-accent mb-4" />
                    <h2 className="text-3xl font-playfair font-semibold text-text-primary mb-3">
                      {category.label}
                    </h2>
                    <p className="text-text-secondary font-dm text-base leading-relaxed max-w-3xl mb-8">
                      {category.description}
                    </p>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryAreas.map((area, index) => (
                      <ScrollReveal key={area.slug} delay={index * 0.04}>
                        <Link
                          href={`/areas/${area.slug}`}
                          className="group block bg-bg-card border border-border rounded-card p-6 hover:border-accent/50 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <h3 className="text-xl font-playfair font-semibold text-text-primary group-hover:text-accent transition-colors">
                              {area.name}
                            </h3>
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
                            {area.description}
                          </p>
                          {area.aliases && area.aliases.length > 0 && (
                            <p className="text-text-secondary/80 font-dm text-xs leading-relaxed mt-4">
                              Also covering: {area.aliases.join(", ")}
                            </p>
                          )}
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-bg-secondary">
        <Container>
          <ScrollReveal>
            <div className="w-12 h-0.5 bg-accent mb-4" />
            <h2 className="text-3xl font-playfair font-semibold text-text-primary mb-8">
              Photography Services Available by Area
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
                      Available across our service areas
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Need Photography in Your Area?"
        subtitle="Contact us with your event date and location to check availability and pricing."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
