"use client";

import { Building2, Link2, TrendingUp, UserPlus } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { advanceSpreadItemClass } from "./layout";
import { Section } from "./section";
import { SectionTitle } from "./section-title";
import { useAdvanceSpread } from "./use-advance-spread";

const steps = [
  { icon: UserPlus, titleKey: "howItWorks.step1", descKey: "howItWorks.step1Desc" },
  { icon: Building2, titleKey: "howItWorks.step2", descKey: "howItWorks.step2Desc" },
  { icon: Link2, titleKey: "howItWorks.step3", descKey: "howItWorks.step3Desc" },
  { icon: TrendingUp, titleKey: "howItWorks.step4", descKey: "howItWorks.step4Desc" },
];

export function HowItWorks() {
  const t = useT();
  const wrapRef = useAdvanceSpread();

  return (
    <Section>
      <SectionTitle
        eyebrow={t("howItWorks.eyebrow")}
        title={t("howItWorks.title")}
        subtitle={t("howItWorks.subtitle")}
      />
      <div
        ref={wrapRef}
        className={cn(
          "relative grid gap-8 md:grid-cols-2 min-[1200px]:flex min-[1200px]:items-stretch"
        )}
      >
        {steps.map((step, i) => (
          <div
            key={step.titleKey}
            className={cn(advanceSpreadItemClass, "min-[1200px]:min-w-0 min-[1200px]:flex-1")}
          >
            <div className="relative h-full rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <span className="text-sm font-semibold text-primary">0{i + 1}</span>
              <step.icon className="mt-4 size-8 text-primary" />
              <h3 className="mt-4 font-heading text-xl">{t(step.titleKey)}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
