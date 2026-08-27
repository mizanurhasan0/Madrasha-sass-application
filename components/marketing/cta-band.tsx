"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/locale-provider";
import { Reveal } from "./reveal";
import { Section } from "./section";

type CtaBandProps = {
  title?: string;
  description?: string;
};

export function CtaBand({ title, description }: CtaBandProps) {
  const t = useT();

  return (
    <Section tone="deep" containerClassName="text-center">
      <Reveal>
        <h2 className="font-heading text-3xl text-white sm:text-4xl">
          {title ?? t("cta.defaultTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">
          {description ?? t("cta.defaultDescription", { name: siteConfig.madrasaName })}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" render={<Link href="/login" />}>
            {t("cta.getStartedFree")} <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
            render={<Link href="/contact" />}
          >
            {t("cta.contactUs")}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
