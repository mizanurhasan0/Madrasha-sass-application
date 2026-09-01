"use client";

import type { Teacher } from "@/types/teacher";
import type { WebsiteTeachersMeta } from "@/types/website";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { TeachersDirectory } from "@/components/marketing/teachers-directory";
import { Section } from "@/components/marketing/section";

type TeachersContentProps = {
  teachers: Teacher[];
  meta: WebsiteTeachersMeta;
};

export function TeachersContent({ teachers, meta }: TeachersContentProps) {
  return (
    <>
      <MarketingPageHeader
        eyebrow="Teachers"
        title={meta.pageTitle}
        description={meta.pageSubtitle}
      />
      <Section>
        <TeachersDirectory teachers={teachers} />
      </Section>
    </>
  );
}
