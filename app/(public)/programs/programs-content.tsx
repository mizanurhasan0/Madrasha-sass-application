"use client";

import Link from "next/link";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { Section } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal, wowStaggerDelay } from "@/components/marketing/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n/locale-provider";

const programKeys = [
  { key: "hifz", durationKey: "hifzDuration" },
  { key: "nazera", durationKey: "nazeraDuration" },
  { key: "islamicStudies", durationKey: "islamicStudiesDuration" },
  { key: "arabic", durationKey: "arabicDuration" },
  { key: "hadith", durationKey: "hadithDuration" },
  { key: "fiqh", durationKey: "fiqhDuration" },
  { key: "general", durationKey: "generalDuration" },
] as const;

export function ProgramsContent() {
  const t = useT();

  return (
    <>
      <MarketingPageHeader
        eyebrow={t("programs.headerEyebrow")}
        title={t("programs.title")}
        description={t("programs.subtitle")}
      />
      <Section tone="sand">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programKeys.map((program, i) => (
            <Reveal key={program.key} delay={wowStaggerDelay(i)}>
              <Card className="h-full border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle>{t(`programs.${program.key}`)}</CardTitle>
                  <CardDescription>
                    {t("programs.duration")}: {t(`programs.${program.durationKey}`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`programs.${program.key}Desc`)}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand title={t("programs.ctaTitle")} description={t("programs.ctaDesc")} />
      <Section>
        <div className="flex flex-wrap justify-center gap-4">
          <Button render={<Link href="/contact" />}>
            {t("programs.ctaPrimary")}
          </Button>
          <Button variant="outline" render={<Link href="/notices" />}>
            {t("programs.ctaSecondary")}
          </Button>
        </div>
      </Section>
    </>
  );
}
