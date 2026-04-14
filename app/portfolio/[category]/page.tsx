import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
  generateImageGalleryJsonLd,
} from "@/lib/metadata";
import {
  getPortfolioCategoryData,
  getPortfolioByCategory,
  getAllPortfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";

interface PortfolioCategoryPageProps {
  params: { category: string };
}

export async function generateStaticParams() {
  return getAllPortfolioCategories().map((slug) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: PortfolioCategoryPageProps): Promise<Metadata> {
  const category = getPortfolioCategoryData(params.category);
  if (!category) return {};

  return generatePageMetadata({
    title: category.metaTitle.replace(" | Adi Photography Peshawar", ""),
    description: category.metaDescription,
    path: `/portfolio/${category.slug}`,
  });
}

export default function PortfolioCategoryPage({
  params,
}: PortfolioCategoryPageProps) {
  const category = getPortfolioCategoryData(params.category);
  if (!category) notFound();

  const items = getPortfolioByCategory(params.category as PortfolioCategory);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
    { name: category.label, url: `/portfolio/${category.slug}` },
  ];

  const galleryJsonLd = generateImageGalleryJsonLd(
    items.map((item) => ({
      src: item.src,
      title: item.title,
      caption: item.alt,
    }))
  );

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={galleryJsonLd} />

      <section className="pt-32 pb-12 bg-bg-primary">
        <Container>
          <Breadcrumbs
            items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
          />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mt-4 mb-4">
            {category.h1}
          </h1>
        </Container>
      </section>

      <section className="py-12 bg-bg-primary">
        <Container>
          <PortfolioGrid
            category={params.category as PortfolioCategory}
            showFilters={false}
          />
        </Container>
      </section>
    </>
  );
}
