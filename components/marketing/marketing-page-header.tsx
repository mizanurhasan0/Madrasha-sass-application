"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { marketingContainer } from "./layout";
import { Reveal } from "./reveal";

type MarketingPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function MarketingPageHeader({
  eyebrow,
  title,
  description,
  className,
}: MarketingPageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-deep py-20 pb-14 text-center text-white",
        className
      )}
    >
      <Image
        src="/theme/banner/banner-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-30"
        aria-hidden
      />
      <div className="absolute inset-0 bg-deep/75" />
      <div className={cn(marketingContainer, "relative z-10")}>
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-lime">
            {eyebrow}
          </p>
          <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-tight">{title}</h1>
          {description && (
            <p className="mx-auto mt-3 max-w-xl text-white/75">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
