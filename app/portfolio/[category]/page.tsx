import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
} from "@/lib/metadata";
import {
  getPortfolioCategoryData,
  getAllPortfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";

interface PortfolioCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getAllPortfolioCategories().map((slug) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: PortfolioCategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getPortfolioCategoryData(categorySlug);
  if (!category) return {};

  return generatePageMetadata({
    title: category.metaTitle.replace(" | Adi Photography Peshawar", ""),
    description: category.metaDescription,
    path: `/portfolio/${category.slug}`,
  });
}

export default async function PortfolioCategoryPage({
  params,
}: PortfolioCategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getPortfolioCategoryData(categorySlug);
  if (!category) notFound();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
    { name: category.label, url: `/portfolio/${category.slug}` },
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
            {category.h1}
          </h1>
        </Container>
      </section>

      <section className="py-12 bg-bg-primary">
        <Container>
          <PortfolioGrid
            category={categorySlug as PortfolioCategory}
            showFilters={false}
          />
        </Container>
      </section>
    </>
  );
}
