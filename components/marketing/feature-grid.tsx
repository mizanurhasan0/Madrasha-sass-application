"use client";

import {
  Bell,
  BookOpen,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { FeatureCard } from "./feature-card";
import { Reveal, wowStaggerDelay } from "./reveal";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

const features = [
  { icon: Users, titleKey: "features.studentManagement", descKey: "features.studentManagementDesc" },
  { icon: GraduationCap, titleKey: "features.teachers", descKey: "features.teachersDesc" },
  { icon: BookOpen, titleKey: "features.exams", descKey: "features.examsDesc" },
  { icon: CreditCard, titleKey: "features.fees", descKey: "features.feesDesc" },
  { icon: Bell, titleKey: "features.attendance", descKey: "features.attendanceDesc" },
  { icon: LayoutDashboard, titleKey: "features.guardian", descKey: "features.guardianDesc" },
];

export function FeatureGrid() {
  const t = useT();

  return (
    <Section tone="sand" id="features">
      <SectionTitle
        eyebrow={t("features.eyebrow")}
        title={t("features.title")}
        subtitle={t("features.subtitle")}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.titleKey} delay={wowStaggerDelay(i)}>
            <FeatureCard
              icon={f.icon}
              title={t(f.titleKey)}
              description={t(f.descKey)}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
