"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardList, TrendingUp, Wallet } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { ChartCard } from "@/components/common/chart-card";
import { CardSkeleton } from "@/components/common/loading-state";
import { RoleGuard } from "@/components/dashboard/role-guard";
import {
  AreaTrendChart,
  BarSeriesChart,
  DonutSplitChart,
} from "@/components/charts/chart-wrappers";
import { feeService } from "@/services/fee.service";
import type { Payment } from "@/types/fee";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export default function FinancialReportsPage() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof feeService.getStats>>["data"] | null>(
    null
  );
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [statsRes, paymentsRes] = await Promise.all([
        feeService.getStats(),
        feeService.getPayments({ limit: 100 }),
      ]);
      if (statsRes.success) setStats(statsRes.data);
      if (paymentsRes.success) setPayments(paymentsRes.data.data);
      setLoading(false);
    }
    load();
  }, []);

  const monthlyTrend = useMemo(() => {
    return MONTHS.map((month, i) => {
      const monthStr = `2025-${String(i + 1).padStart(2, "0")}`;
      const collected = payments
        .filter((p) => p.date.startsWith(monthStr))
        .reduce((s, p) => s + p.paid, 0);
      return { month, collected };
    });
  }, [payments]);

  const feeTypeBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of payments) {
      map.set(p.feeType, (map.get(p.feeType) ?? 0) + p.paid);
    }
    return Array.from(map.entries()).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, [payments]);

  const statusBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of payments) {
      map.set(p.status, (map.get(p.status) ?? 0) + 1);
    }
    return Array.from(map.entries()).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, [payments]);

  if (loading || !stats) {
    return (
      <RoleGuard allowed={["accountant"]}>
        <CardSkeleton count={4} />
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowed={["accountant"]}>
      <div className="space-y-6">
        <PageHeader
          title="Financial Reports"
          description="Collection trends and payment analytics."
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

        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Monthly Collection Trend" description="Paid amounts by month">
            <AreaTrendChart data={monthlyTrend} dataKey="collected" xKey="month" />
          </ChartCard>

          <ChartCard title="Collection by Fee Type" description="Breakdown of collected fees">
            {feeTypeBreakdown.length > 0 ? (
              <DonutSplitChart data={feeTypeBreakdown} />
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">No data available.</p>
            )}
          </ChartCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Payment Status Distribution" description="Count by payment status">
            {statusBreakdown.length > 0 ? (
              <BarSeriesChart
                data={statusBreakdown.map((s) => ({ status: s.name, count: s.value }))}
                dataKey="count"
                xKey="status"
              />
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">No data available.</p>
            )}
          </ChartCard>

          <ChartCard title="Summary" description="Quick financial overview">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <dt className="text-muted-foreground">Collection Rate</dt>
                <dd className="font-medium tabular-nums">
                  {stats.totalCollection + stats.totalDue > 0
                    ? Math.round(
                        (stats.totalCollection / (stats.totalCollection + stats.totalDue)) * 100
                      )
                    : 0}
                  %
                </dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="text-muted-foreground">Total Invoices</dt>
                <dd className="font-medium tabular-nums">{payments.length}</dd>
              </div>
              <div className="flex justify-between border-b pb-2">
                <dt className="text-muted-foreground">Paid Invoices</dt>
                <dd className="font-medium tabular-nums">
                  {payments.filter((p) => p.status === "paid").length}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Outstanding Invoices</dt>
                <dd className="font-medium tabular-nums">
                  {payments.filter((p) => p.due > 0).length}
                </dd>
              </div>
            </dl>
          </ChartCard>
        </div>
      </div>
    </RoleGuard>
  );
}
