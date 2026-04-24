import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PortfolioCategoryGallery from "@/components/portfolio/PortfolioCategoryGallery";
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
import { listPortfolioCategoryImages } from "@/lib/r2";

interface PortfolioCategoryPageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 60;

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

  const images = await listPortfolioCategoryImages(
    categorySlug as PortfolioCategory,
  );

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
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mt-4 mb-2">
            {category.h1}
          </h1>
          <p className="text-text-secondary font-dm">
            {images.length === 0
              ? "Photographs coming soon."
              : `${images.length} photograph${images.length === 1 ? "" : "s"}`}
          </p>
        </Container>
      </section>

      <section className="py-12 bg-bg-primary">
        <Container>
          <PortfolioCategoryGallery
            images={images.map(({ key, url }) => ({ key, url }))}
            categoryLabel={category.label}
          />
        </Container>
      </section>
    </>
  );
}
