import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TeamSection from "@/components/sections/TeamSection";
import CtaBanner from "@/components/sections/CtaBanner";
import BlogPreview from "@/components/sections/BlogPreview";
import JsonLd from "@/components/seo/JsonLd";
import { generateLocalBusinessJsonLd } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title:
    "Adi Photography | Professional Photography & Videography in Peshawar, Pakistan",
  description:
    "Premium photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography by Adi Photography. Book your session today.",
  alternates: {
    canonical: "https://www.adiphotography.pk/",
  },
  openGraph: {
    title:
      "Adi Photography | Professional Photography & Videography in Peshawar",
    description:
      "Premium photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography.",
    url: "https://www.adiphotography.pk/",
    type: "website",
    locale: "en_PK",
    siteName: "Adi Photography",
    images: [
      {
        url: "https://www.adiphotography.pk/images/og-default.jpg",
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
    images: ["https://www.adiphotography.pk/images/og-default.jpg"],
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={generateLocalBusinessJsonLd()} />

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

      <BlogPreview posts={posts} />
    </>
  );
}
