"use client";

import { BookOpen, Globe, Heart, Shield, Users, Wallet } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { Reveal, wowStaggerDelay } from "./reveal";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

const items = [
  { icon: BookOpen, titleKey: "madrasaFeatures.hifz", descKey: "madrasaFeatures.hifzDesc" },
  { icon: Globe, titleKey: "madrasaFeatures.curriculum", descKey: "madrasaFeatures.curriculumDesc" },
  { icon: Wallet, titleKey: "madrasaFeatures.waqf", descKey: "madrasaFeatures.waqfDesc" },
  { icon: Globe, titleKey: "madrasaFeatures.bilingual", descKey: "madrasaFeatures.bilingualDesc" },
  { icon: Shield, titleKey: "madrasaFeatures.rbac", descKey: "madrasaFeatures.rbacDesc" },
  { icon: Users, titleKey: "madrasaFeatures.guardianEngagement", descKey: "madrasaFeatures.guardianEngagementDesc" },
];

export function MadrasaFeatures() {
  const t = useT();

  return (
    <Section tone="deep">
      <SectionTitle
        tone="deep"
        eyebrow={t("madrasaFeatures.eyebrow")}
        title={t("madrasaFeatures.title")}
        subtitle={t("madrasaFeatures.subtitle")}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.titleKey} delay={wowStaggerDelay(i)}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <item.icon className="size-8 text-lime" />
              <h3 className="mt-4 font-heading text-xl text-white">{t(item.titleKey)}</h3>
              <p className="mt-2 text-white/70 leading-relaxed">{t(item.descKey)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
