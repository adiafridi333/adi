import { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.adiphotography.pk";
const SITE_NAME = "Adi Photography Peshawar";
const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_PK",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: type === "article" ? "article" : "website",
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateLocalBusinessJsonLd(overrides?: {
  name?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: overrides?.name || "Adi Photography & Films",
    alternateName: ["Adi Photography", "Adi Photography Peshawar"],
    description:
      "Professional photography and videography studio in Peshawar, Pakistan. Specialising in weddings, corporate events, music events, fashion editorials, and licensed drone aerial work. Serving Peshawar, Islamabad, Lahore, Karachi, and across Khyber Pakhtunkhwa since 2014.",
    slogan:
      "Crafting visual narratives that engage and inspire — Peshawar's trusted photography studio.",
    url: SITE_URL,
    telephone: "+923339365272",
    email: "info@adiphotography.pk",
    foundingDate: "2014",
    founder: {
      "@type": "Person",
      name: "Adnan Afridi",
      jobTitle: "Founder, Lead Photographer & Drone Operator",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "UG-453 Deans Trade Center",
      addressLocality: overrides?.city || "Peshawar",
      addressRegion: "Khyber Pakhtunkhwa",
      postalCode: "25000",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: overrides?.latitude || 34.0151,
      longitude: overrides?.longitude || 71.5249,
    },
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Adi+Photography+Deans+Trade+Center+Peshawar",
    image: `${SITE_URL}/images/og-default.jpg`,
    logo: `${SITE_URL}/images/logo.png`,
    priceRange: "$$",
    paymentAccepted: ["Cash", "Bank Transfer", "EasyPaisa", "JazzCash"],
    currenciesAccepted: "PKR",
    knowsLanguage: ["en", "ur", "ps"],
    knowsAbout: [
      "Wedding Photography",
      "Corporate Photography",
      "Event Photography",
      "Music Event Photography",
      "Fashion Photography",
      "Drone Aerial Photography",
      "Cinematic Videography",
      "Commercial Video Production",
      "Photo Editing & Color Grading",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/adi.photographyandfilms/",
      "https://www.facebook.com/adiPhotograpyandFilms",
      "https://www.youtube.com/channel/UCrSrPfmYnFhh0c-Pckt5RtQ",
      "https://www.tiktok.com/@adi_photographyandfilms",
    ],
    areaServed: [
      { "@type": "City", name: "Peshawar" },
      { "@type": "City", name: "Islamabad" },
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Karachi" },
      { "@type": "AdministrativeArea", name: "Khyber Pakhtunkhwa" },
      { "@type": "Country", name: "Pakistan" },
    ],
    serviceType: [
      "Wedding Photography",
      "Corporate Photography",
      "Event Photography",
      "Fashion Photography",
      "Drone Videography",
      "Cinematic Videography",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Adi Photography Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Photography",
            url: `${SITE_URL}/services/wedding-photography-peshawar`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Photography",
            url: `${SITE_URL}/services/corporate-photography-peshawar`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Videography",
            url: `${SITE_URL}/services/videography-peshawar`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Drone Videography",
            url: `${SITE_URL}/services/drone-videography-peshawar`,
          },
        },
      ],
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Adi Photography & Films",
    legalName: "Adi Photography & Films",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
    },
    foundingDate: "2014",
    founders: [{ "@type": "Person", name: "Adnan Afridi" }],
    description:
      "Photography and videography studio based in Peshawar, Pakistan, producing wedding, corporate, music event, fashion and aerial work.",
    sameAs: [
      "https://www.instagram.com/adi.photographyandfilms/",
      "https://www.facebook.com/adiPhotograpyandFilms",
      "https://www.youtube.com/channel/UCrSrPfmYnFhh0c-Pckt5RtQ",
      "https://www.tiktok.com/@adi_photographyandfilms",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+923339365272",
        contactType: "customer service",
        email: "info@adiphotography.pk",
        areaServed: "PK",
        availableLanguage: ["English", "Urdu", "Pashto"],
      },
    ],
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Adi Photography & Films",
    url: SITE_URL,
    inLanguage: "en-PK",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateServiceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  image: string;
  serviceType?: string;
  offers?: string[];
}) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Adi Photography",
      url: SITE_URL,
      telephone: "+923339365272",
      address: {
        "@type": "PostalAddress",
        streetAddress: "UG-453 Deans Trade Center",
        addressLocality: "Peshawar",
        addressRegion: "Khyber Pakhtunkhwa",
        addressCountry: "PK",
      },
      priceRange: "$$",
    },
    url: `${SITE_URL}${service.url}`,
    image: `${SITE_URL}${service.image}`,
    areaServed: {
      "@type": "City",
      name: "Peshawar",
    },
  };

  if (service.serviceType) {
    jsonLd.serviceType = service.serviceType;
  }

  if (service.offers && service.offers.length > 0) {
    jsonLd.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${service.serviceType || service.name} Services`,
      itemListElement: service.offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer,
        },
      })),
    };
  }

  return jsonLd;
}

export function generateFaqJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}${article.url}`,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Adi Photography",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };
}

export function generateImageGalleryJsonLd(
  images: { src: string; title: string; caption: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Adi Photography Portfolio",
    url: `${SITE_URL}/portfolio`,
    image: images.map((img) => ({
      "@type": "ImageObject",
      url: `${SITE_URL}${img.src}`,
      name: img.title,
      caption: img.caption,
    })),
  };
}
