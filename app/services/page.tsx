import { Metadata } from "next";
import Container from "@/components/layout/Container";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CtaBanner from "@/components/sections/CtaBanner";
import FaqSection from "@/components/sections/FaqSection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import {
  generatePageMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Photography & Videography Services in Peshawar",
  description:
    "Explore our professional photography and videography services in Peshawar. Wedding, corporate, event, drone, and fashion photography by Adi Photography.",
  path: "/services",
});

const servicePageFaqs = [
  {
    question: "What photography and videography services do you offer in Peshawar?",
    answer:
      "Adi Photography offers wedding photography, corporate photography, event coverage, fashion photography, drone videography, and cinematic video production in Peshawar and nearby cities.",
  },
  {
    question: "Do you cover both photography and videography for the same event?",
    answer:
      "Yes. Many clients book both photography and videography together so the event is covered consistently across portraits, candid moments, stage coverage, reels, and highlight films.",
  },
  {
    question: "Can I book Adi Photography outside Peshawar?",
    answer:
      "Yes. We regularly travel for shoots in Islamabad, Swat, Mardan, Nowshera, Charsadda, and other cities when the event schedule and travel plan are confirmed in advance.",
  },
  {
    question: "How do I choose the right service for my event or business?",
    answer:
      "We usually start with your event type, location, timeline, and final deliverables. From there we recommend the most suitable photography service, videography package, or combined coverage plan.",
  },
  {
    question: "How can I get pricing for photography services in Peshawar?",
    answer:
      "Send us your date, venue, city, and the type of shoot you need. We will recommend the right package and share pricing based on coverage hours, team size, and deliverables.",
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={generateFaqJsonLd(servicePageFaqs)} />

      <section className="pt-32 pb-12 bg-bg-primary">
        <Container>
          <Breadcrumbs
            items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
          />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mt-4 mb-4">
            Photography & Videography Services in Peshawar
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-2xl">
            From intimate weddings to large-scale corporate events, we offer a complete range
            of professional photography and videography services across Pakistan.
          </p>
        </Container>
      </section>

      <ServicesGrid />

      <FaqSection
        faqs={servicePageFaqs}
        title="FAQs About Photography Services in Peshawar"
      />

      <CtaBanner />
    </>
  );
}
