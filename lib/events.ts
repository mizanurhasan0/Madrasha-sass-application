import type { Event } from "@/types/notice";

export function eventSlug(event: Event): string {
  return event.id.replace(/_/g, "-");
}

export function findEventBySlug(slug: string, events: Event[]): Event | undefined {
  return events.find((e) => eventSlug(e) === slug || e.id === slug);
}
