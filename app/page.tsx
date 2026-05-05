import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import CtaBanner from "@/components/sections/CtaBanner";
import BlogPreview from "@/components/sections/BlogPreview";
import FaqSection from "@/components/sections/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import {
  SITE_URL,
  generateFaqJsonLd,
  generateLocalBusinessJsonLd,
} from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";

const homepageFaqs = [
  {
    question: "What photography services do you offer in Peshawar?",
    answer:
      "Adi Photography offers wedding photography, corporate photography, event coverage, fashion shoots, portrait sessions, drone videography, and full video production in Peshawar and nearby cities.",
  },
  {
    question: "Do you provide both photography and videography packages?",
    answer:
      "Yes. Clients can book photography only, videography only, or combined packages for weddings, corporate events, private functions, and commercial projects.",
  },
  {
    question: "Can you travel outside Peshawar for destination shoots?",
    answer:
      "Yes. We travel for destination weddings, corporate shoots, and outdoor sessions in Islamabad, Swat, Mardan, Nowshera, Lahore, Karachi, and other cities when scheduled in advance.",
  },
  {
    question: "How far in advance should I book Adi Photography?",
    answer:
      "For weddings and major event dates, booking a few months in advance is safest. For portraits, business shoots, and smaller sessions, availability depends on the date and location.",
  },
  {
    question: "How do I get a quote for photography or videography in Peshawar?",
    answer:
      "Send us your date, venue, city, and the type of coverage you need. We will recommend the right package and share pricing based on hours, team size, and deliverables.",
  },
];

export const metadata: Metadata = {
  title:
    "Adi Photography | Professional Photography & Videography in Peshawar, Pakistan",
  description:
    "Premium photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography by Adi Photography. Book your session today.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title:
      "Adi Photography | Professional Photography & Videography in Peshawar",
    description:
      "Premium photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography.",
    url: SITE_URL,
    type: "website",
    locale: "en_PK",
    siteName: "Adi Photography",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Adi Photography & Films — professional photography in Peshawar, Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Adi Photography | Professional Photography & Videography in Peshawar",
    description:
      "Premium photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={generateLocalBusinessJsonLd()} />
      <JsonLd data={generateFaqJsonLd(homepageFaqs)} />

      <HeroSection
        title="Professional Photography & Videography in Peshawar"
        subtitle="Adi Photography & Films — wedding, corporate, music event, fashion, and aerial drone work. Always eager to present our work with the highest degree of professionalism and honesty, recognised as one of the finest photographers in Peshawar."
        backgroundImage="https://pub-45c507c035214836bf31cb43c8f8946b.r2.dev/IMG_3721%20website.webp"
        primaryCta={{ label: "View Portfolio", href: "/portfolio" }}
        secondaryCta={{ label: "Get a Quote", href: "/contact" }}
      />

      <StatsBar />

      <ServicesGrid />

      <TestimonialsSection />

      <TeamSection />

      <CtaBanner />

      <FaqSection
        faqs={homepageFaqs}
        title="Frequently Asked Questions About Adi Photography"
      />

      <BlogPreview posts={posts} />
    </>
  );
}
