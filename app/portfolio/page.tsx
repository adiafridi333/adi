import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
} from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Photography Portfolio",
  description:
    "Explore the Adi Photography portfolio featuring stunning wedding, corporate, event, drone, and fashion photography from Peshawar, Pakistan.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
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
            Our Photography Portfolio
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-2xl">
            Explore our collection of wedding, corporate, music event, fashion, and
            videography work from across Peshawar and Pakistan.
          </p>
        </Container>
      </section>

      <section className="py-12 bg-bg-primary">
        <Container>
          <PortfolioGrid showFilters={false} />
        </Container>
      </section>
    </>
  );
}
