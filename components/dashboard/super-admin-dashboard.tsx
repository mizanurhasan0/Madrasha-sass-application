"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CreditCard,
  GraduationCap,
  UserSquare2,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { ChartCard } from "@/components/common/chart-card";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import { CardSkeleton, TableSkeleton } from "@/components/common/loading-state";
import { AreaTrendChart, DonutSplitChart } from "@/components/charts/chart-wrappers";
import { madrasaService } from "@/services/madrasa.service";
import { studentService } from "@/services/student.service";
import type { Madrasa } from "@/types/madrasa";
import type { Payment } from "@/types/fee";

type PaymentRow = Payment & { studentName: string };

export function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Awaited<
    ReturnType<typeof madrasaService.getSuperAdminMetrics>
  >["data"] | null>(null);
  const [madrasas, setMadrasas] = useState<Madrasa[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);

  const studentMap = useMemo(() => {
    const map = new Map<string, string>();
    studentService.getAll().forEach((s) => map.set(s.id, s.name));
    return map;
  }, []);

  useEffect(() => {
    async function load() {
      const [metricsRes, madrasasRes, paymentsRes] = await Promise.all([
        madrasaService.getSuperAdminMetrics(),
        madrasaService.getMadrasas({ limit: 5 }),
        madrasaService.getRecentPayments(5),
      ]);

      if (metricsRes.success) setMetrics(metricsRes.data);
      if (madrasasRes.success) setMadrasas(madrasasRes.data.data);
      if (paymentsRes.success) {
        setPayments(
          paymentsRes.data.map((p) => ({
            ...p,
            studentName: studentMap.get(p.studentId) ?? "Unknown",
          }))
        );
      }
      setLoading(false);
    }
    load();
  }, [studentMap]);

  const madrasaColumns: Column<Madrasa>[] = [
    { key: "name", header: "Madrasa", cell: (row) => row.name },
    { key: "admin", header: "Admin", cell: (row) => row.adminName },
    {
      key: "students",
      header: "Students",
      cell: (row) => row.studentCount.toLocaleString(),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "joined",
      header: "Joined",
      cell: (row) => <DateDisplay date={row.joinedAt} />,
    },
  ];

  const paymentColumns: Column<PaymentRow>[] = [
    { key: "invoice", header: "Invoice", cell: (row) => row.invoiceNo },
    { key: "student", header: "Student", cell: (row) => row.studentName },
    {
      key: "amount",
      header: "Amount",
      cell: (row) => <Money amount={row.paid} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "date",
      header: "Date",
      cell: (row) => <DateDisplay date={row.date} />,
    },
  ];

  if (loading || !metrics) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={4} />
        <div className="grid gap-4 lg:grid-cols-2">
          <CardSkeleton count={1} />
          <CardSkeleton count={1} />
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Super Admin Dashboard"
        description="Platform-wide overview of madrasas, subscriptions, and revenue."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          title="Total Madrasas"
          value={metrics.totalMadrasas}
          icon={<Building2 className="size-5" />}
        />
        <StatCard
          title="Active Madrasas"
          value={metrics.activeMadrasas}
          icon={<Building2 className="size-5" />}
        />
        <StatCard
          title="Total Students"
          value={metrics.totalStudents}
          icon={<GraduationCap className="size-5" />}
        />
        <StatCard
          title="Total Teachers"
          value={metrics.totalTeachers}
          icon={<UserSquare2 className="size-5" />}
        />
        <StatCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions}
          icon={<CreditCard className="size-5" />}
        />
        <StatCard
          title="Monthly Revenue"
          value={metrics.monthlyRevenue}
          isCurrency
          icon={<Wallet className="size-5" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Madrasa Growth" description="New madrasas over time">
          <AreaTrendChart data={metrics.madrasaGrowth} dataKey="count" />
        </ChartCard>
        <ChartCard title="Monthly Revenue" description="Subscription revenue trend">
          <AreaTrendChart data={metrics.monthlyRevenueChart} dataKey="revenue" />
        </ChartCard>
      </div>

      <ChartCard title="Subscription Plans" description="Distribution by plan type">
        <DonutSplitChart data={metrics.subscriptionDistribution} />
      </ChartCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent Madrasas</h2>
          <DataTable data={madrasas} columns={madrasaColumns} />
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent Payments</h2>
          <DataTable data={payments} columns={paymentColumns} />
        </div>
      </div>
    </div>
  );
}
