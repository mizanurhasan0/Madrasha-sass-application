import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { AboutContent } from "./about-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "About",
    description: config.about.intro.slice(0, 160),
  };
}

export default function AboutPage() {
  const config = readWebsiteConfig();
  return <AboutContent about={config.about} madrasaName={config.general.madrasaName} />;
}
