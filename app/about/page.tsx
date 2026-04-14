import { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TeamSection from "@/components/sections/TeamSection";
import CtaBanner from "@/components/sections/CtaBanner";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/metadata";
import { team } from "@/data/team";
import ServiceIcon from "@/components/ui/ServiceIcon";

export const metadata: Metadata = generatePageMetadata({
  title: "About Adi Photography",
  description:
    "Learn about Adi Photography, Peshawar's premier photography and videography studio. Meet our team of creative professionals with 10+ years of experience.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adi Photography",
    url: "https://adiphotography.pk",
    logo: "https://adiphotography.pk/images/logo.png",
    description:
      "Professional photography and videography studio based in Peshawar, Pakistan.",
    foundingDate: "2015",
    founder: {
      "@type": "Person",
      name: "Adi Khan",
      jobTitle: "Lead Photographer & Founder",
    },
    employee: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
    })),
  };

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={organizationJsonLd} />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://pub-45c507c035214836bf31cb43c8f8946b.r2.dev/adi.jpg"
            alt="About Adi Photography - professional photography studio in Peshawar"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-text-primary mb-4">
            About Adi Photography
          </h1>
          <p className="text-text-secondary font-dm text-lg max-w-xl mx-auto">
            Peshawar&apos;s premier photography and videography studio
          </p>
        </div>
      </section>

      <Container className="py-6">
        <Breadcrumbs
          items={breadcrumbs.map((b) => ({ label: b.name, href: b.url }))}
        />
      </Container>

      {/* Our Story */}
      <section className="py-20 bg-bg-primary">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <div className="w-12 h-0.5 bg-accent mb-4" />
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-text-primary mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-text-secondary font-dm text-base leading-relaxed">
                  <p>
                    Are you in need of an adept photographer in Peshawar or any other city? We, at
                    Adi Photography &amp; Films, are passionate about crafting visual narratives that
                    engage and inspire your target audience. With a keen eye for elegance in
                    complexity, we deliver outstanding photo and videography solutions.
                  </p>
                  <p>
                    We incite action in your audience through compelling cinematography, based on
                    practices aimed at generating results for you. Always eager to present our work
                    with the highest degree of professionalism and honesty, we are recognized as
                    one of the finest photographers in Peshawar.
                  </p>
                  <p>
                    Our mission, vision, and services are imbued with our core values of Impact,
                    Beauty, Innovation, and Wholeness. We are driven by the desire to touch
                    people&apos;s hearts through visuals that emotionally resonate with them. Our top
                    videographers, available in Peshawar and other major cities across Pakistan, are
                    ready to help you accomplish your goals.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-[4/5] rounded-card overflow-hidden">
                <Image
                  src="https://pub-45c507c035214836bf31cb43c8f8946b.r2.dev/adi.jpg"
                  alt="Adi Photography studio in Peshawar, Pakistan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 bg-bg-secondary">
        <Container>
          <SectionHeading
            title="What Sets Us Apart"
            subtitle="Our commitment to excellence drives everything we do"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Professional Skills",
                description:
                  "Always keen on delivering our work with utmost professionalism and sincerity. Every project reflects our dedication to excellence.",
                icon: "quality",
              },
              {
                title: "Perfect Equipment",
                description:
                  "Wide range of high-end equipment for all kinds of production requirements. Cinema-grade cameras, drones, lighting, and audio.",
                icon: "camera",
              },
              {
                title: "Creativity",
                description:
                  "Creativity flows through our team of passionate professionals. We craft visual narratives that engage and inspire your audience.",
                icon: "videography",
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="bg-bg-card border border-border rounded-card p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 text-accent">
                    <ServiceIcon name={value.icon} className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-playfair font-semibold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary font-dm text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <TeamSection />

      <CtaBanner
        title="Let's Work Together"
        subtitle="Whether it's a wedding, corporate event, or creative project — we'd love to hear from you."
        buttonLabel="Get in Touch"
      />
    </>
  );
}
