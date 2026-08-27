"use client";

import { CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

export function BenefitsSection() {
  const t = useT();

  const guardianItems = [t("benefits.g1"), t("benefits.g2"), t("benefits.g3"), t("benefits.g4")];
  const teacherItems = [t("benefits.t1"), t("benefits.t2"), t("benefits.t3"), t("benefits.t4")];

  return (
    <Section>
      <SectionTitle
        eyebrow={t("benefits.eyebrow")}
        title={t("benefits.title")}
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-soft">
            <span className="text-sm font-semibold text-primary">{t("benefits.guardiansBadge")}</span>
            <h3 className="mt-2 font-heading text-2xl">{t("benefits.guardiansTitle")}</h3>
            <ul className="mt-6 space-y-3">
              {guardianItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-soft">
            <span className="text-sm font-semibold text-primary">{t("benefits.teachersBadge")}</span>
            <h3 className="mt-2 font-heading text-2xl">{t("benefits.teachersTitle")}</h3>
            <ul className="mt-6 space-y-3">
              {teacherItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
