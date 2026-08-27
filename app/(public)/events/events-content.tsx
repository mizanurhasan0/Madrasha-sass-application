"use client";

import type { Event } from "@/types/notice";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { EventsList } from "@/components/marketing/events-list";
import { Section } from "@/components/marketing/section";
import { useT } from "@/lib/i18n/locale-provider";

type EventsContentProps = {
  events: Event[];
};

export function EventsContent({ events }: EventsContentProps) {
  const t = useT();

  return (
    <>
      <MarketingPageHeader
        eyebrow={t("eventsPage.eyebrow")}
        title={t("eventsPage.title")}
        description={t("eventsPage.subtitle")}
      />
      <Section>
        <EventsList events={events} />
      </Section>
    </>
  );
}
