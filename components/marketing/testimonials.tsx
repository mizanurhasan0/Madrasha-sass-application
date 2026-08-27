"use client";

import { useT } from "@/lib/i18n/locale-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, wowStaggerDelay } from "./reveal";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

export function Testimonials() {
  const t = useT();

  const items = [
    { name: t("testimonials.t1Name"), role: t("testimonials.t1Role"), quote: t("testimonials.t1Quote") },
    { name: t("testimonials.t2Name"), role: t("testimonials.t2Role"), quote: t("testimonials.t2Quote") },
    { name: t("testimonials.t3Name"), role: t("testimonials.t3Role"), quote: t("testimonials.t3Quote") },
  ];

  return (
    <Section tone="sand">
      <SectionTitle eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={wowStaggerDelay(i)}>
            <Card className="h-full border-border/60 shadow-soft">
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
