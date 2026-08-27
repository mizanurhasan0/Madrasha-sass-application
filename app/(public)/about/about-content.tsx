"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { Section } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal } from "@/components/marketing/reveal";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/locale-provider";

export function AboutContent() {
  const t = useT();

  const whyItems = [
    t("about.why1"),
    t("about.why2"),
    t("about.why3"),
    t("about.why4"),
    t("about.why5"),
    t("about.why6"),
  ];

  return (
    <>
      <MarketingPageHeader
        eyebrow={t("about.eyebrow")}
        title={t("about.whyTitle")}
        description={t("about.whyDescExtended")}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("about.intro", { name: siteConfig.madrasaName })}
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 p-6 shadow-soft">
                <h3 className="font-heading text-xl">{t("about.mission")}</h3>
                <p className="mt-2 text-muted-foreground">{t("about.missionDesc")}</p>
              </div>
              <div className="rounded-2xl border border-border/60 p-6 shadow-soft">
                <h3 className="font-heading text-xl">{t("about.vision")}</h3>
                <p className="mt-2 text-muted-foreground">{t("about.visionDesc")}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h3 className="font-heading text-2xl">{t("about.whyChoose")}</h3>
            <ul className="mt-6 space-y-3">
              {whyItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button render={<Link href="/contact" />}>
                {t("about.visitCampus")}
              </Button>
              <Button variant="outline" render={<Link href="/programs" />}>
                {t("about.viewPrograms")}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
