"use client";

import { StatCounter } from "./stat-counter";

const madrasaStats = [
  { value: "500+", label: "Students" },
  { value: "25+", label: "Teachers" },
  { value: "7", label: "Programs" },
  { value: "15+", label: "Years of Service" },
];

export function MadrasaStatsBand() {
  return (
    <section className="bg-primary py-10 text-white sm:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
        {madrasaStats.map((item, index) => (
          <StatCounter
            key={item.label}
            value={item.value}
            label={item.label}
            delay={index * 120}
          />
        ))}
      </div>
    </section>
  );
}
