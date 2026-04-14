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
            src="/images/hero/about-hero.jpg"
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
                    Founded in 2015, Adi Photography began with a simple passion: to capture
                    life&apos;s most meaningful moments with cinematic beauty. Based in Peshawar,
                    Pakistan, we&apos;ve grown from a solo photographer into a full-service creative
                    studio serving clients across Pakistan.
                  </p>
                  <p>
                    Our approach combines technical precision with artistic vision. Every project —
                    whether a grand wedding celebration, a corporate brand shoot, or an intimate
                    portrait session — receives our complete creative dedication and attention to
                    detail.
                  </p>
                  <p>
                    Over the years, we&apos;ve had the privilege of working with hundreds of clients,
                    documenting their stories and helping brands establish powerful visual identities.
                    Our work has taken us across Pakistan, from the bustling streets of Karachi to the
                    majestic landscapes of northern Pakistan.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-[4/5] rounded-card overflow-hidden">
                <Image
                  src="/images/about/studio.jpg"
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
                title: "Cinematic Quality",
                description:
                  "We approach every shoot with a filmmaker's eye, creating images that tell compelling visual stories with depth and emotion.",
                icon: "videography",
              },
              {
                title: "Client-First Approach",
                description:
                  "Your vision drives our creativity. We listen, plan meticulously, and deliver results that exceed expectations every time.",
                icon: "handshake",
              },
              {
                title: "Technical Excellence",
                description:
                  "Using industry-leading equipment and post-production techniques, we deliver images and videos of the highest professional standard.",
                icon: "camera",
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
