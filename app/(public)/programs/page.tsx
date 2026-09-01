import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { ProgramsContent } from "./programs-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Programs",
    description: config.programsMeta.pageSubtitle,
  };
}

export default function ProgramsPage() {
  const config = readWebsiteConfig();
  return (
    <ProgramsContent programs={config.programs} meta={config.programsMeta} />
  );
}
