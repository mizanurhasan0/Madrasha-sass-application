import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { GalleryContent } from "./gallery-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Gallery",
    description: config.galleryMeta.pageSubtitle,
  };
}

export default function GalleryPage() {
  const config = readWebsiteConfig();
  return <GalleryContent meta={config.galleryMeta} />;
}
