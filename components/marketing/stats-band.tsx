"use client";

import { useT } from "@/lib/i18n/locale-provider";
import { stats } from "@/config/site";
import { cn } from "@/lib/utils";
import { marketingContainer } from "./layout";
import { StatCounter } from "./stat-counter";

export function StatsBand() {
  const t = useT();
  const items = [
    { value: stats.studentsManaged, label: t("stats.studentsManaged") },
    { value: stats.teachers, label: t("stats.teachers") },
    { value: stats.institutions, label: t("stats.institutions") },
    { value: stats.availability, label: t("stats.availability") },
  ];

  return (
    <section className="bg-primary py-10 text-white sm:py-12">
      <div
        className={cn(
          marketingContainer,
          "grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 min-[480px]:gap-x-6 min-[480px]:gap-y-10 lg:grid-cols-4 lg:gap-8"
        )}
      >
        {items.map((item, index) => (
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
