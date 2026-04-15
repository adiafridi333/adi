export interface Area {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  content: string;
  highlights: string[];
  nearbyAreas?: string[];
}

type AreaOverrides = Partial<Omit<Area, "name" | "slug">> & {
  slug?: string;
};

function toAreaSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createArea(name: string, overrides: AreaOverrides = {}): Area {
  const slug = overrides.slug || toAreaSlug(name);

  return {
    slug,
    name,
    h1:
      overrides.h1 || `Photography & Videography Services in ${name}`,
    metaTitle:
      overrides.metaTitle ||
      `Photography & Videography Services in ${name}`,
    metaDescription:
      overrides.metaDescription ||
      `Book professional photography and videography services in ${name}. Adi Photography covers weddings, events, corporate shoots, drone videos, and portraits.`,
    description:
      overrides.description ||
      `Professional photography and videography services for weddings, events, brands, and family sessions in ${name}.`,
    content:
      overrides.content ||
      `Adi Photography provides complete photo and video coverage in ${name}, with a team experienced in weddings, corporate events, private functions, fashion shoots, portraits, and drone videography. We plan each shoot around the venue, schedule, lighting, and client style so the final gallery feels polished, natural, and ready to share.`,
    highlights: overrides.highlights || [
      "Wedding photography and films",
      "Event and corporate coverage",
      "Drone videography",
      "Portrait, fashion, and family sessions",
    ],
    nearbyAreas: overrides.nearbyAreas,
  };
}

export const areas: Area[] = [];

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((area) => area.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return areas.map((area) => area.slug);
}
