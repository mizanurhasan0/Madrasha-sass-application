import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { PublicResultCheck } from "@/components/public/public-result-check";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Check Result",
    description: `View published exam results for ${config.general.madrasaName} students.`,
  };
}

export default function CheckResultPage() {
  return <PublicResultCheck />;
}
