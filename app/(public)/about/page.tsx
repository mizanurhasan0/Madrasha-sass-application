import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.madrasaName} and our mission.`,
};

export default function AboutPage() {
  return <AboutContent />;
}
