import type { Metadata } from "next";
import { teachers } from "@/data/teachers";
import { readWebsiteConfig } from "@/lib/website/config";
import { TeachersContent } from "./teachers-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Teachers",
    description: config.teachersMeta.pageSubtitle,
  };
}

export default function TeachersPage() {
  const config = readWebsiteConfig();
  if (!config.teachersMeta.showOnWebsite) {
    return <TeachersContent teachers={[]} meta={config.teachersMeta} />;
  }
  return <TeachersContent teachers={teachers} meta={config.teachersMeta} />;
}
