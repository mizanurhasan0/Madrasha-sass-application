"use client";

import { useT } from "@/lib/i18n/locale-provider";

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <section className="overflow-hidden bg-deep py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 px-10 font-heading text-[clamp(1.25rem,2vw,1.75rem)] uppercase tracking-tight text-white"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
