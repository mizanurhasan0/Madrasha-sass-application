"use client";

import type { WebsiteContact } from "@/types/website";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { ContactForm } from "@/components/marketing/contact-form";
import { Section } from "@/components/marketing/section";

type ContactContentProps = {
  contact: WebsiteContact;
};

export function ContactContent({ contact }: ContactContentProps) {
  return (
    <>
      <MarketingPageHeader
        eyebrow="Contact"
        title={contact.pageTitle}
        description={contact.pageSubtitle}
      />
      <Section>
        <ContactForm contact={contact} />
      </Section>
    </>
  );
}
