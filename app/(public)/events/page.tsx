import type { Metadata } from "next";
import { events } from "@/data/notices";
import { readWebsiteConfig } from "@/lib/website/config";
import { EventsContent } from "./events-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Events",
    description: config.eventsMeta.pageSubtitle,
  };
}

export default function EventsPage() {
  const config = readWebsiteConfig();
  return <EventsContent events={events} meta={config.eventsMeta} />;
}
