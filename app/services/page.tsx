import { Metadata } from "next";
import Container from "@/components/layout/Container";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CtaBanner from "@/components/sections/CtaBanner";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Photography & Videography Services in Peshawar",
  description:
    "Explore our professional photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography by Adi Photography.",
  path: "/services",
});

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
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
            Photography & Videography Services in Peshawar
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-2xl">
            From intimate weddings to large-scale corporate events, we offer a complete range
            of professional photography and videography services across Pakistan.
          </p>
        </Container>
      </section>

      <ServicesGrid />

      <CtaBanner />
    </>
  );
}
