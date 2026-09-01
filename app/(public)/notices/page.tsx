import type { Metadata } from "next";
import { notices } from "@/data/notices";
import { readWebsiteConfig } from "@/lib/website/config";
import { NoticesContent } from "./notices-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Notices",
    description: config.noticesMeta.pageSubtitle,
  };
}

export default function NoticesPage() {
  const config = readWebsiteConfig();
  return <NoticesContent notices={notices} meta={config.noticesMeta} />;
}
