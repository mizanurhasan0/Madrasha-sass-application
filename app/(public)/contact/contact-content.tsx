"use client";

import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { ContactForm } from "@/components/marketing/contact-form";
import { Section } from "@/components/marketing/section";
import { useT } from "@/lib/i18n/locale-provider";

export function ContactContent() {
  const t = useT();

  return (
    <>
      <MarketingPageHeader
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.pageDesc")}
      />
      <Section>
        <ContactForm />
      </Section>
    </>
  );
}
