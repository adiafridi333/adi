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
  | "fashion";

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
];

export const portfolioItems: PortfolioItem[] = [
  // Weddings
  {
    id: "w1",
    title: "Nikah Ceremony in Peshawar",
    category: "weddings",
    src: "/images/portfolio/wedding-photography-peshawar-01.jpg",
    alt: "Wedding photography in Peshawar - nikah ceremony captured by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "w2",
    title: "Bridal Portrait Peshawar",
    category: "weddings",
    src: "/images/portfolio/wedding-photography-peshawar-02.jpg",
    alt: "Bridal portrait photography in Peshawar by Adi Photography",
    width: 800,
    height: 1200,
  },
  {
    id: "w3",
    title: "Wedding Reception Peshawar",
    category: "weddings",
    src: "/images/portfolio/wedding-photography-peshawar-03.jpg",
    alt: "Wedding reception photography in Peshawar - valima event by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "w4",
    title: "Mehndi Celebration",
    category: "weddings",
    src: "/images/portfolio/wedding-photography-peshawar-04.jpg",
    alt: "Mehndi ceremony photography in Peshawar by Adi Photography",
    width: 1200,
    height: 900,
  },
  {
    id: "w5",
    title: "Couple Portrait Session",
    category: "weddings",
    src: "/images/portfolio/wedding-photography-peshawar-05.jpg",
    alt: "Wedding couple portrait photography in Peshawar by Adi Photography",
    width: 800,
    height: 1100,
  },
  {
    id: "w6",
    title: "Baraat Procession",
    category: "weddings",
    src: "/images/portfolio/wedding-photography-peshawar-06.jpg",
    alt: "Baraat procession wedding photography in Peshawar by Adi Photography",
    width: 1200,
    height: 800,
  },
  // Corporate
  {
    id: "c1",
    title: "Corporate Headshots",
    category: "corporate",
    src: "/images/portfolio/corporate-photography-peshawar-01.jpg",
    alt: "Corporate headshot photography in Peshawar by Adi Photography",
    width: 800,
    height: 1000,
  },
  {
    id: "c2",
    title: "Business Conference",
    category: "corporate",
    src: "/images/portfolio/corporate-photography-peshawar-02.jpg",
    alt: "Business conference photography in Peshawar by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "c3",
    title: "Office Team Photo",
    category: "corporate",
    src: "/images/portfolio/corporate-photography-peshawar-03.jpg",
    alt: "Corporate team photography in Peshawar by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "c4",
    title: "Product Launch Event",
    category: "corporate",
    src: "/images/portfolio/corporate-photography-peshawar-04.jpg",
    alt: "Product launch event photography in Peshawar by Adi Photography",
    width: 1200,
    height: 900,
  },
  // Events
  {
    id: "e1",
    title: "Gala Dinner Event",
    category: "events",
    src: "/images/portfolio/event-photography-peshawar-01.jpg",
    alt: "Event photography at gala dinner in Peshawar by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "e2",
    title: "Birthday Celebration",
    category: "events",
    src: "/images/portfolio/event-photography-peshawar-02.jpg",
    alt: "Birthday party event photography in Peshawar by Adi Photography",
    width: 1200,
    height: 900,
  },
  {
    id: "e3",
    title: "University Convocation",
    category: "events",
    src: "/images/portfolio/event-photography-peshawar-03.jpg",
    alt: "University convocation event photography in Peshawar by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "e4",
    title: "Charity Gala",
    category: "events",
    src: "/images/portfolio/event-photography-peshawar-04.jpg",
    alt: "Charity gala event photography in Peshawar by Adi Photography",
    width: 800,
    height: 1100,
  },
  // Drone
  {
    id: "d1",
    title: "Aerial View of Peshawar",
    category: "drone",
    src: "/images/portfolio/drone-photography-peshawar-01.jpg",
    alt: "Aerial drone photography of Peshawar cityscape by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "d2",
    title: "Wedding Venue Aerial",
    category: "drone",
    src: "/images/portfolio/drone-photography-peshawar-02.jpg",
    alt: "Drone aerial photography of wedding venue in Peshawar by Adi Photography",
    width: 1200,
    height: 700,
  },
  {
    id: "d3",
    title: "Real Estate Aerial",
    category: "drone",
    src: "/images/portfolio/drone-photography-peshawar-03.jpg",
    alt: "Drone real estate photography in Peshawar by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "d4",
    title: "Landscape Aerial Shot",
    category: "drone",
    src: "/images/portfolio/drone-photography-peshawar-04.jpg",
    alt: "Aerial landscape photography in Peshawar region by Adi Photography",
    width: 1200,
    height: 800,
  },
  // Fashion
  {
    id: "f1",
    title: "Fashion Lookbook",
    category: "fashion",
    src: "/images/portfolio/fashion-photography-peshawar-01.jpg",
    alt: "Fashion lookbook photography in Peshawar by Adi Photography",
    width: 800,
    height: 1200,
  },
  {
    id: "f2",
    title: "Editorial Fashion Shoot",
    category: "fashion",
    src: "/images/portfolio/fashion-photography-peshawar-02.jpg",
    alt: "Editorial fashion photography in Peshawar by Adi Photography",
    width: 800,
    height: 1100,
  },
  {
    id: "f3",
    title: "Brand Campaign",
    category: "fashion",
    src: "/images/portfolio/fashion-photography-peshawar-03.jpg",
    alt: "Fashion brand campaign photography in Peshawar by Adi Photography",
    width: 1200,
    height: 800,
  },
  {
    id: "f4",
    title: "Clothing Collection",
    category: "fashion",
    src: "/images/portfolio/fashion-photography-peshawar-04.jpg",
    alt: "Clothing collection fashion photography in Peshawar by Adi Photography",
    width: 800,
    height: 1200,
  },
];

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
