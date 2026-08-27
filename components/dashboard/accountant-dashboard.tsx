"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardList, TrendingUp, Wallet } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import { CardSkeleton, TableSkeleton } from "@/components/common/loading-state";
import { feeService } from "@/services/fee.service";
import { studentService } from "@/services/student.service";
import type { Payment } from "@/types/fee";

type PaymentRow = Payment & { studentName: string };

export function AccountantDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Awaited<
    ReturnType<typeof feeService.getStats>
  >["data"] | null>(null);
  const [payments, setPayments] = useState<PaymentRow[]>([]);

  const studentMap = useMemo(() => {
    const map = new Map<string, string>();
    studentService.getAll().forEach((s) => map.set(s.id, s.name));
    return map;
  }, []);

  useEffect(() => {
    async function load() {
      const [statsRes, paymentsRes] = await Promise.all([
        feeService.getStats(),
        feeService.getPayments({ limit: 10 }),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (paymentsRes.success) {
        setPayments(
          paymentsRes.data.data.map((p) => ({
            ...p,
            studentName: studentMap.get(p.studentId) ?? "Unknown",
          }))
        );
      }
      setLoading(false);
    }
    load();
  }, [studentMap]);

  const columns: Column<PaymentRow>[] = [
    { key: "invoice", header: "Invoice", cell: (row) => row.invoiceNo },
    { key: "student", header: "Student", cell: (row) => row.studentName },
    {
      key: "feeType",
      header: "Fee Type",
      cell: (row) => <span className="capitalize">{row.feeType}</span>,
    },
    {
      key: "paid",
      header: "Paid",
      cell: (row) => <Money amount={row.paid} />,
    },
    {
      key: "due",
      header: "Due",
      cell: (row) => <Money amount={row.due} />,
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

  if (loading || !stats) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={4} />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Accountant Dashboard"
        description="Fee collection overview and recent payment activity."
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
        <h2 className="text-lg font-semibold">Recent Payments</h2>
        <DataTable data={payments} columns={columns} />
      </div>
    </div>
  );
}
