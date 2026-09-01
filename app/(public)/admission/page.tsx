import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { AdmissionForm } from "@/components/admission/admission-form";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Online Admission",
    description: `Apply online to ${config.general.madrasaName} for the current academic session.`,
  };
}

export default function AdmissionPage() {
  return <AdmissionForm />;
}
