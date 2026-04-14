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
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: overrides?.name || "Adi Photography",
    description:
      "Professional photography and videography services in Peshawar, Pakistan. Specializing in weddings, corporate events, fashion, drone photography, and more.",
    url: SITE_URL,
    telephone: "+92 333 9365272",
    email: "info@adiphotography.pk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "UG-411 Deans Trade Center",
      addressLocality: overrides?.city || "Peshawar",
      addressRegion: "Khyber Pakhtunkhwa",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: overrides?.latitude || 34.0151,
      longitude: overrides?.longitude || 71.5249,
    },
    image: `${SITE_URL}/images/og-default.jpg`,
    priceRange: "$$",
    openingHours: ["Mo-Sa 09:00-20:00"],
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
    ],
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
        streetAddress: "UG-411 Deans Trade Center",
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
