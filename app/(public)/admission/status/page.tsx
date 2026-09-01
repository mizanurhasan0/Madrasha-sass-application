import type { Metadata } from "next";
import { Suspense } from "react";
import { readWebsiteConfig } from "@/lib/website/config";
import { AdmissionStatusLookup } from "@/components/admission/admission-status-lookup";
import { LoadingState } from "@/components/common/loading-state";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: "Admission Status",
    description: `Track your admission application status at ${config.general.madrasaName}.`,
  };
}

export default function AdmissionStatusPage() {
  return (
    <Suspense fallback={<LoadingState rows={6} />}>
      <AdmissionStatusLookup />
    </Suspense>
  );
}
