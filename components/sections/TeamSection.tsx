"use client";

import Image from "next/image";
import { team } from "@/data/team";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function TeamSection() {
  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Meet the Team"
          subtitle="The creative minds behind Adi Photography"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 0.1}>
              <div className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors duration-300">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role} at Adi Photography Peshawar`}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-dm text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-text-secondary font-dm text-sm leading-relaxed max-w-sm mx-auto mb-2">
                  {member.bio}
                </p>
                <p className="text-text-secondary font-dm text-xs uppercase tracking-wider">
                  {member.yearsExperience}+ Years Experience
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
