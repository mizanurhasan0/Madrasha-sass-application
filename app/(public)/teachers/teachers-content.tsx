"use client";

import type { Teacher } from "@/types/teacher";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { TeachersDirectory } from "@/components/marketing/teachers-directory";
import { Section } from "@/components/marketing/section";
import { useT } from "@/lib/i18n/locale-provider";

type TeachersContentProps = {
  teachers: Teacher[];
};

export function TeachersContent({ teachers }: TeachersContentProps) {
  const t = useT();

  return (
    <>
      <MarketingPageHeader
        eyebrow={t("teachersPage.eyebrow")}
        title={t("teachersPage.title")}
        description={t("teachersPage.subtitle", { count: teachers.length })}
      />
      <Section>
        <TeachersDirectory teachers={teachers} />
      </Section>
    </>
  );
}
