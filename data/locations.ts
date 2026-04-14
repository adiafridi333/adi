export interface Location {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  content: string;
  geo: { latitude: number; longitude: number };
}

export const locations: Location[] = [
  {
    slug: "islamabad",
    name: "Islamabad",
    h1: "Photography & Videography Services in Islamabad",
    metaTitle:
      "Photography & Videography Services in Islamabad | Adi Photography",
    metaDescription:
      "Professional photography and videography services in Islamabad. Wedding, corporate, event & drone photography by Adi Photography. Book your session today.",
    description:
      "Adi Photography proudly serves Islamabad, Pakistan's capital city, with premium photography and videography services.",
    content:
      "As Pakistan's capital city, Islamabad offers stunning backdrops for photography — from the iconic Faisal Mosque and Margalla Hills to elegant venue halls and modern corporate spaces. Adi Photography brings our signature cinematic style to every project in Islamabad, whether it's a destination wedding at a luxury hotel, corporate headshots at your office, or aerial drone footage of the city's beautiful landscape. Our team regularly travels from Peshawar to Islamabad to serve our growing client base in the twin cities. With years of experience shooting in Islamabad's most prestigious venues, we understand the unique lighting, logistics, and cultural nuances that make each event special.",
    geo: { latitude: 33.6844, longitude: 73.0479 },
  },
  {
    slug: "lahore",
    name: "Lahore",
    h1: "Photography & Videography Services in Lahore",
    metaTitle:
      "Photography & Videography Services in Lahore | Adi Photography",
    metaDescription:
      "Professional photography and videography services in Lahore. Weddings, events, corporate & fashion photography by Adi Photography. Contact us for a quote.",
    description:
      "Adi Photography extends its premium photography and videography services to Lahore, the cultural heart of Pakistan.",
    content:
      "Lahore — the city of gardens, Mughal heritage, and vibrant celebrations — is one of our most popular destinations for wedding and event photography. The city's rich architectural heritage, from the Badshahi Mosque to the Lahore Fort, provides magnificent settings for photography sessions. Adi Photography has covered numerous weddings, corporate events, and fashion shoots across Lahore's top venues including Pearl Continental, Nishat Hotel, and Royal Palm. Our team brings professional equipment, creative vision, and years of experience to deliver results that match the grandeur and energy of Lahore's celebrations. Whether you are planning a baraat at a haveli-style venue or need commercial photography for your brand, Adi Photography delivers excellence in Lahore.",
    geo: { latitude: 31.5204, longitude: 74.3587 },
  },
  {
    slug: "karachi",
    name: "Karachi",
    h1: "Photography & Videography Services in Karachi",
    metaTitle:
      "Photography & Videography Services in Karachi | Adi Photography",
    metaDescription:
      "Professional photography and videography services in Karachi. Destination weddings, corporate events & fashion shoots by Adi Photography. Book now.",
    description:
      "Adi Photography offers destination photography and videography services in Karachi, Pakistan's largest metropolitan city.",
    content:
      "Karachi's dynamic energy, coastal beauty, and world-class venues make it an exciting destination for photography. From beachside pre-wedding shoots along Clifton and Sea View to luxury weddings at Mohatta Palace and corporate events at Expo Centre, Adi Photography brings our award-winning expertise to Pakistan's largest city. Our Karachi services are ideal for destination weddings, large-scale corporate events, fashion campaigns, and commercial shoots. We coordinate all logistics including travel, equipment transport, and local scouting to ensure seamless execution. Many of our Karachi clients appreciate our fresh perspective and cinematic style, which stands apart from the local market. Let Adi Photography bring the same artistry and professionalism we're known for in Peshawar to your next project in Karachi.",
    geo: { latitude: 24.8607, longitude: 67.0011 },
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
