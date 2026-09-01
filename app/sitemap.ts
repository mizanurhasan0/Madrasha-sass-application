import type { MetadataRoute } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { events } from "@/data/notices";
import { eventSlug } from "@/lib/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = readWebsiteConfig();
  const base = config.general.websiteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/teachers`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/notices`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/events`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/admission`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/check-result`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/check-fee`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/platform`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${base}/events/${eventSlug(event)}`,
    lastModified: event.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
