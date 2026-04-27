import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PortfolioTabs, {
  type PortfolioTab,
} from "@/components/portfolio/PortfolioTabs";
import PortfolioCategoryGallery from "@/components/portfolio/PortfolioCategoryGallery";
import VideographyGallery from "@/components/portfolio/VideographyGallery";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
} from "@/lib/metadata";
import {
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";
import { listPortfolioCategoryImages } from "@/lib/r2";
import { readVideographyVideos } from "@/lib/videos-store";

export const metadata: Metadata = generatePageMetadata({
  title: "Photography Portfolio",
  description:
    "Explore the Adi Photography portfolio featuring stunning wedding, corporate, event, drone, and fashion photography from Peshawar, Pakistan.",
  path: "/portfolio",
});

export const revalidate = 60;

export default async function PortfolioPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
  ];

  // Fetch every category's data in parallel.
  const photoCategories = portfolioCategories.filter(
    (c) => c.slug !== "videography",
  );

  const [photoResults, videos] = await Promise.all([
    Promise.all(
      photoCategories.map((c) =>
        listPortfolioCategoryImages(c.slug as PortfolioCategory),
      ),
    ),
    readVideographyVideos(),
  ]);

  const tabs: PortfolioTab[] = portfolioCategories.map((cat) => {
    if (cat.slug === "videography") {
      return {
        slug: cat.slug,
        label: cat.label,
        panel: <VideographyGallery videos={videos} />,
      };
    }

    const idx = photoCategories.findIndex((c) => c.slug === cat.slug);
    const images = photoResults[idx] ?? [];
    return {
      slug: cat.slug,
      label: cat.label,
      panel: (
        <PortfolioCategoryGallery
          images={images.map(({ key, url }) => ({ key, url }))}
          categoryLabel={cat.label}
        />
      ),
    };
  });

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
          <PortfolioTabs tabs={tabs} defaultSlug="weddings" />
        </Container>
      </section>
    </>
  );
}
