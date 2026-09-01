"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicServiceLayout } from "@/components/public/public-service-layout";
import { LookupPanel } from "@/components/public/lookup-panel";
import { InfoCard } from "@/components/public/info-card";
import { DetailList } from "@/components/common/detail-list";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { feeService } from "@/services/fee.service";
import { whatsappUrl } from "@/lib/website/config";
import { useWebsiteConfig } from "@/components/marketing/public-site-provider";
import { formatCurrency, formatDate } from "@/lib/format";

type FeeLookup = NonNullable<Awaited<ReturnType<typeof feeService.lookupFeePublic>>["data"]>;

export function PublicFeeCheck() {
  const config = useWebsiteConfig();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FeeLookup | null>(null);

  const lookup = async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    const res = await feeService.lookupFeePublic({ studentId: q, invoiceNo: q });
    setLoading(false);
    if (res.success && res.data) setResult(res.data);
    else {
      setResult(null);
      setError(res.message ?? "No fee record found.");
    }
  };

  return (
    <PublicServiceLayout
      eyebrow="Quick Services"
      title="Check Fee Status"
      description="Look up fee dues and payment history using student ID or invoice number."
      maxWidth="md"
    >
      <LookupPanel
        id="feeQuery"
        label="Student ID or Invoice Number"
        placeholder="AN-0001 or INV-00001"
        value={query}
        onChange={setQuery}
        onSubmit={lookup}
        loading={loading}
      />

      {error && <EmptyState title="Not found" description={error} />}

      {result && (
        <InfoCard>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-heading text-xl">{result.studentName}</p>
              <p className="text-sm text-muted-foreground">{result.studentId}</p>
            </div>
            <StatusBadge status={result.status} />
          </div>
          <DetailList
            className="mt-6"
            items={[
              { label: "Invoice", value: <span className="font-mono">{result.invoiceNo}</span> },
              { label: "Fee Type", value: <span className="capitalize">{result.feeType}</span> },
              { label: "Total Amount", value: formatCurrency(result.amount) },
              { label: "Paid", value: formatCurrency(result.paid) },
              {
                label: "Due",
                value: (
                  <span className={result.due > 0 ? "text-destructive" : "text-status-success"}>
                    {formatCurrency(result.due)}
                  </span>
                ),
                emphasis: true,
              },
              { label: "Last Updated", value: formatDate(result.date) },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" render={<Link href="/contact" />}>
              Contact Office
            </Button>
            {config.contact.whatsapp && config.contact.whatsapp !== "#" && (
              <Button
                render={
                  <a
                    href={whatsappUrl(
                      config.contact.whatsapp,
                      `Assalamu Alaikum, I have a question about fee invoice ${result.invoiceNo}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                WhatsApp
              </Button>
            )}
          </div>
        </InfoCard>
      )}
    </PublicServiceLayout>
  );
}
