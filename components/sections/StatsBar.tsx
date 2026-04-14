"use client";

import CountUp from "@/components/ui/CountUp";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  { value: 200, suffix: "+", label: "Happy Clients" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 8, suffix: "+", label: "Years Experience" },
];

export default function StatsBar() {
  return (
    <section className="py-16 bg-bg-secondary border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-accent mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-text-secondary font-dm text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
