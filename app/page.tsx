import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
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
    canonical: "https://adiphotography.pk",
  },
  openGraph: {
    title:
      "Adi Photography | Professional Photography & Videography in Peshawar",
    description:
      "Premium photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography.",
    url: "https://adiphotography.pk",
    type: "website",
  },
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={generateLocalBusinessJsonLd()} />

      <HeroSection
        title="Photography & Videography Services in Peshawar, Pakistan"
        subtitle="Cinematic storytelling for weddings, corporate events, and commercial projects. Let us capture your most cherished moments with artistry and precision."
        backgroundImage="/images/hero/home-hero.jpg"
        primaryCta={{ label: "View Portfolio", href: "/portfolio" }}
        secondaryCta={{ label: "Get a Quote", href: "/contact" }}
      />

      <StatsBar />

      <ServicesGrid />

      <PortfolioPreview />

      <TestimonialsSection />

      <TeamSection />

      <CtaBanner />

      <BlogPreview posts={posts} />
    </>
  );
}
