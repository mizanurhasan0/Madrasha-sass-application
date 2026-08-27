"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { Money } from "@/components/common/format-display";
import { CardSkeleton } from "@/components/common/loading-state";
import { RoleGuard } from "@/components/dashboard/role-guard";
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Collection"
            value={stats.totalCollection}
            isCurrency
            icon={<Wallet className="size-5" />}
          />
          <StatCard
            title="Total Due"
            value={stats.totalDue}
            isCurrency
            icon={<ClipboardList className="size-5" />}
          />
          <StatCard
            title="Today's Collection"
            value={stats.todayCollection}
            isCurrency
            icon={<TrendingUp className="size-5" />}
          />
          <StatCard
            title="Monthly Collection"
            value={stats.monthlyCollection}
            isCurrency
            icon={<Wallet className="size-5" />}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Fee Types</h2>
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {fees.map((fee) => (
                  <tr key={fee.id}>
                    <td className="px-4 py-3 font-medium">{fee.name}</td>
                    <td className="px-4 py-3 capitalize">{fee.type}</td>
                    <td className="px-4 py-3 text-right">
                      <Money amount={fee.amount} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={fee.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
