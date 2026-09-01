"use client";

import type { Notice } from "@/types/notice";
import type { WebsiteNoticesMeta } from "@/types/website";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { NoticesList } from "@/components/marketing/notices-list";
import { Section } from "@/components/marketing/section";

type NoticesContentProps = {
  notices: Notice[];
  meta: WebsiteNoticesMeta;
};

export function NoticesContent({ notices, meta }: NoticesContentProps) {
  return (
    <>
      <MarketingPageHeader
        eyebrow="Notices"
        title={meta.pageTitle}
        description={meta.pageSubtitle}
      />
      <Section>
        <NoticesList notices={notices} />
      </Section>
    </>
  );
}
