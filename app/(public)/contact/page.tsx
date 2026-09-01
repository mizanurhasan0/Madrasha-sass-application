import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { ContactContent } from "./contact-content";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Contact",
    description: config.contact.pageSubtitle,
  };
}

export default function ContactPage() {
  const config = readWebsiteConfig();
  return <ContactContent contact={config.contact} />;
}
