"use client";

import type { Notice } from "@/types/notice";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { NoticesList } from "@/components/marketing/notices-list";
import { Section } from "@/components/marketing/section";
import { useT } from "@/lib/i18n/locale-provider";

type NoticesContentProps = {
  notices: Notice[];
};

export function NoticesContent({ notices }: NoticesContentProps) {
  const t = useT();

  return (
    <>
      <MarketingPageHeader
        eyebrow={t("noticesPage.eyebrow")}
        title={t("noticesPage.title")}
        description={t("noticesPage.subtitle")}
      />
      <Section>
        <NoticesList notices={notices} />
      </Section>
    </>
  );
}
