import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import { events } from "@/data/notices";
import { findEventBySlug, eventSlug } from "@/lib/events";
import { readWebsiteConfig } from "@/lib/website/config";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { Section } from "@/components/marketing/section";
import { EventJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return events.map((e) => ({ slug: eventSlug(e) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = findEventBySlug(slug, events);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = findEventBySlug(slug, events);
  if (!event) notFound();

  const config = readWebsiteConfig();
  const eventUrl = `${config.general.websiteUrl}/events/${eventSlug(event)}`;

  return (
    <>
      <EventJsonLd
        title={event.title}
        description={event.description}
        startDate={event.date}
        location={event.location}
        image={event.image}
        url={eventUrl}
      />
      <MarketingPageHeader
        eyebrow="Events"
        title={event.title}
        description={event.description}
      />
      <Section>
        <Button variant="ghost" size="sm" className="mb-6" render={<Link href="/events" />}>
          <ArrowLeft className="mr-1 size-4" /> Back to events
        </Button>
        {event.image && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <StatusBadge status={event.status} />
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" /> {formatDate(event.date)}
          </span>
          {event.time && (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" /> {event.time}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" /> {event.location}
            </span>
          )}
        </div>
        <p className="max-w-3xl leading-relaxed text-muted-foreground">{event.description}</p>
      </Section>
    </>
  );
}
