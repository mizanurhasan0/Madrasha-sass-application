"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { DashboardPreview } from "./dashboard-preview";
import { marketingContainer } from "./layout";
import { Reveal } from "./reveal";

export function Hero() {
  const t = useT();

  return (
    <section className="relative flex min-h-[36rem] items-center overflow-hidden py-16">
      <Image
        src="/theme/banner/banner-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-deep/88" />
      <div className={cn(marketingContainer, "relative z-10 grid items-center gap-12 lg:grid-cols-2")}>
        <Reveal>
          <span className="mb-4 inline-block rounded-full bg-lime/15 px-4 py-1.5 text-[0.8125rem] font-semibold text-lime">
            {t("hero.badge")}
          </span>
          <h1 className="mb-4 font-heading text-[clamp(2rem,4vw+0.5rem,3.5rem)] leading-tight text-white">
            {t("hero.title")}{" "}
            <em className="not-italic text-lime">{t("hero.titleHighlight")}</em>
          </h1>
          <p className="mb-6 max-w-lg leading-relaxed text-white/80">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<Link href="/login" />}>
              {t("hero.getStarted")} <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              render={<Link href="/contact" />}
            >
              {t("hero.bookDemo")}
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/60">
            {t("hero.serving", { name: siteConfig.madrasaName })}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  );
}
