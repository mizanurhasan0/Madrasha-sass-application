import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { notices, events } from "@/data/notices";
import { teachers } from "@/data/teachers";
import { MadrasaHomeContent } from "@/components/marketing/madrasa-home-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: config.general.madrasaName,
    description: config.general.description,
    openGraph: {
      title: config.general.madrasaName,
      description: config.general.description,
      url: config.general.websiteUrl,
    },
  };
}

export default function HomePage() {
  const config = readWebsiteConfig();
  const publishedNotices = notices
    .filter((n) => n.published)
    .slice(0, config.noticesMeta.maxVisible || 3);
  const upcomingEvents = events
    .filter((e) => e.status === "upcoming")
    .slice(0, config.eventsMeta.maxVisible || 3);
  const featuredTeachers = teachers.slice(0, config.teachersMeta.featuredCount || 3);

  return (
    <MadrasaHomeContent
      config={config}
      notices={publishedNotices}
      events={upcomingEvents}
      teachers={featuredTeachers}
    />
  );
}
