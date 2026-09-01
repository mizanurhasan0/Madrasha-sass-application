"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { SimpleTable } from "@/components/common/simple-table";
import { Money } from "@/components/common/format-display";
import { CardSkeleton } from "@/components/common/loading-state";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { FeeStatsGrid } from "@/components/fees/fee-stats-grid";
import { feeService } from "@/services/fee.service";
import type { Fee } from "@/types/fee";

export default function FeesPage() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof feeService.getStats>>["data"] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [feesRes, statsRes] = await Promise.all([
        feeService.getFees(),
        feeService.getStats(),
      ]);
      if (feesRes.success) setFees(feesRes.data);
      if (statsRes.success) setStats(statsRes.data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !stats) {
    return (
      <RoleGuard allowed={["madrasa_admin"]}>
        <CardSkeleton count={4} />
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <div className="space-y-6">
        <PageHeader
          title="Fees & Payments"
          description="Manage fee types and view collection overview."
          actions={
            <Button render={<Link href="/dashboard/payments" />}>
              View Payments
            </Button>
          }
        />

        <FeeStatsGrid stats={stats} />

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Fee Types</h2>
          <SimpleTable
            data={fees}
            getRowKey={(fee) => fee.id}
            columns={[
              { key: "name", header: "Name", cell: (fee) => <span className="font-medium">{fee.name}</span> },
              { key: "type", header: "Type", cell: (fee) => <span className="capitalize">{fee.type}</span> },
              {
                key: "amount",
                header: "Amount",
                align: "right",
                cell: (fee) => <Money amount={fee.amount} />,
              },
              {
                key: "status",
                header: "Status",
                cell: (fee) => <StatusBadge status={fee.status} />,
              },
            ]}
          />
        </div>
      </div>
    </RoleGuard>
  );
}
