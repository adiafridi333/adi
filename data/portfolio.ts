export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type PortfolioCategory =
  | "weddings"
  | "corporate"
  | "events"
  | "drone"
  | "fashion"
  | "videography";

export const portfolioCategories: {
  slug: PortfolioCategory;
  label: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
}[] = [
  {
    slug: "weddings",
    label: "Weddings",
    h1: "Wedding Photography Portfolio | Peshawar, Pakistan",
    metaTitle: "Wedding Photography Portfolio | Adi Photography Peshawar",
    metaDescription:
      "Explore our stunning wedding photography portfolio from Peshawar and across Pakistan. View real wedding moments captured by Adi Photography.",
  },
  {
    slug: "corporate",
    label: "Corporate",
    h1: "Corporate Photography Portfolio | Peshawar, Pakistan",
    metaTitle: "Corporate Photography Portfolio | Adi Photography Peshawar",
    metaDescription:
      "View our corporate photography portfolio featuring professional headshots, events, and brand imagery in Peshawar by Adi Photography.",
  },
  {
    slug: "events",
    label: "Events",
    h1: "Event Photography Portfolio | Peshawar, Pakistan",
    metaTitle: "Event Photography Portfolio | Adi Photography Peshawar",
    metaDescription:
      "Browse our event photography portfolio showcasing celebrations, seminars, and gatherings in Peshawar captured by Adi Photography.",
  },
  {
    slug: "drone",
    label: "Drone",
    h1: "Drone & Aerial Photography Portfolio | Peshawar, Pakistan",
    metaTitle: "Drone Photography Portfolio | Adi Photography Peshawar",
    metaDescription:
      "View stunning aerial and drone photography from Peshawar and Pakistan. Breathtaking bird's-eye views by Adi Photography.",
  },
  {
    slug: "fashion",
    label: "Fashion",
    h1: "Fashion Photography Portfolio | Peshawar, Pakistan",
    metaTitle: "Fashion Photography Portfolio | Adi Photography Peshawar",
    metaDescription:
      "Explore our fashion photography portfolio featuring lookbooks, campaigns, and editorial shoots in Peshawar by Adi Photography.",
  },
  {
    slug: "videography",
    label: "Videography",
    h1: "Videography Portfolio | Peshawar, Pakistan",
    metaTitle: "Videography Portfolio | Adi Photography Peshawar",
    metaDescription:
      "Watch our videography portfolio featuring cinematic wedding films, corporate videos, and commercial productions in Peshawar by Adi Photography.",
  },
];

export const portfolioItems: PortfolioItem[] = [];

export function getPortfolioByCategory(
  category: PortfolioCategory
): PortfolioItem[] {
  return portfolioItems.filter((item) => item.category === category);
}

export function getPortfolioCategoryData(slug: string) {
  return portfolioCategories.find((c) => c.slug === slug);
}

export function getAllPortfolioCategories(): string[] {
  return portfolioCategories.map((c) => c.slug);
}
