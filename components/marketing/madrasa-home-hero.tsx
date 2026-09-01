"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WebsiteHomepage, WebsiteGeneral } from "@/types/website";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/website/config";
import { cn } from "@/lib/utils";
import { marketingContainer } from "./layout";
import { Reveal } from "./reveal";

type MadrasaHomeHeroProps = {
  general: WebsiteGeneral;
  homepage: WebsiteHomepage;
  whatsapp: string;
};

export function MadrasaHomeHero({ general, homepage, whatsapp }: MadrasaHomeHeroProps) {
  return (
    <section className="relative flex min-h-[36rem] items-center overflow-hidden py-16">
      <Image
        src="/theme/banner/banner-bg.jpg"
        alt=""
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-deep/88" />
      <div className={cn(marketingContainer, "relative z-10 max-w-3xl")}>
        <Reveal>
          <span className="mb-4 inline-block rounded-full bg-lime/15 px-4 py-1.5 text-[0.8125rem] font-semibold text-lime">
            {homepage.badgeText}
          </span>
          <h1 className="mb-4 font-heading text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-tight text-white">
            {homepage.heroTitle}
          </h1>
          <p className="mb-6 max-w-2xl leading-relaxed text-white/80">{homepage.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<Link href="/admission" />}>
              {homepage.primaryCta} <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              render={<Link href="/contact" />}
            >
              {homepage.secondaryCta}
            </Button>
            {whatsapp && whatsapp !== "#" && (
              <Button
                size="lg"
                variant="outline"
                className="border-[#25D366]/50 bg-[#25D366]/10 text-white hover:bg-[#25D366]/20"
                render={
                  <a
                    href={whatsappUrl(whatsapp, "Assalamu Alaikum, I want to know about admission.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                WhatsApp Us
              </Button>
            )}
          </div>
          <p className="mt-6 text-sm text-white/60">{general.madrasaName}</p>
        </Reveal>
      </div>
    </section>
  );
}
