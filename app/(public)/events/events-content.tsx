"use client";

import type { Event } from "@/types/notice";
import type { WebsiteEventsMeta } from "@/types/website";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { EventsList } from "@/components/marketing/events-list";
import { Section } from "@/components/marketing/section";

type EventsContentProps = {
  events: Event[];
  meta: WebsiteEventsMeta;
};

export function EventsContent({ events, meta }: EventsContentProps) {
  return (
    <>
      <MarketingPageHeader
        eyebrow="Events"
        title={meta.pageTitle}
        description={meta.pageSubtitle}
      />
      <Section>
        <EventsList events={events} />
      </Section>
    </>
  );
}
