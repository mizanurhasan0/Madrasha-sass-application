import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { PublicFeeCheck } from "@/components/public/public-fee-check";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Check Fee",
    description: `Look up fee status and dues at ${config.general.madrasaName}.`,
  };
}

export default function CheckFeePage() {
  return <PublicFeeCheck />;
}
