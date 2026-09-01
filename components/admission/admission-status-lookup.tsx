"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PublicServiceLayout } from "@/components/public/public-service-layout";
import { LookupPanel } from "@/components/public/lookup-panel";
import { InfoCard } from "@/components/public/info-card";
import { DetailList } from "@/components/common/detail-list";
import { StatusBadge } from "@/components/common/status-badge";
import { LoadingState } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { admissionService } from "@/services/admission.service";
import type { AdmissionApplication } from "@/types/admission";
import { formatDate } from "@/lib/format";

export function AdmissionStatusLookup() {
  const initialId = useSearchParams().get("id") ?? "";
  const [applicationId, setApplicationId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<AdmissionApplication | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lookup = async (id = applicationId) => {
    const query = id.trim();
    if (!query) return;
    setLoading(true);
    setError(null);
    const res = await admissionService.getByApplicationNo(query);
    setLoading(false);
    if (res.success && res.data) {
      setApplication(res.data);
    } else {
      setApplication(null);
      setError("No application found with this ID.");
    }
  };

  useEffect(() => {
    if (initialId) void lookup(initialId);
  }, [initialId]);

  return (
    <PublicServiceLayout
      eyebrow="Admission"
      title="Track Application"
      description="Enter your application ID to check admission status."
      maxWidth="md"
    >
      <LookupPanel
        id="appId"
        label="Application ID"
        placeholder="ADM-2026-0001"
        value={applicationId}
        onChange={setApplicationId}
        onSubmit={() => lookup()}
        loading={loading}
      />

      {loading && <LoadingState rows={4} />}
      {error && <p className="text-center text-sm text-destructive">{error}</p>}

      {application && (
        <InfoCard>
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono font-semibold">{application.applicationNo}</p>
            <StatusBadge status={application.status} />
          </div>
          <DetailList
            className="mt-4"
            items={[
              { label: "Student", value: application.studentName, emphasis: true },
              { label: "Program", value: application.className },
              { label: "Guardian", value: application.guardianName },
              {
                label: "Submitted",
                value: formatDate(application.submittedAt.split("T")[0]),
              },
            ]}
          />
          <Button className="mt-6 w-full" variant="outline" render={<Link href="/contact" />}>
            Contact Office
          </Button>
        </InfoCard>
      )}
    </PublicServiceLayout>
  );
}
