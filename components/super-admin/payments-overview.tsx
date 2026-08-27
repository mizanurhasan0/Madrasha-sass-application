"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import { CardSkeleton, TableSkeleton } from "@/components/common/loading-state";
import { madrasaService } from "@/services/madrasa.service";
import { studentService } from "@/services/student.service";
import type { Payment } from "@/types/fee";
import { DollarSign, Receipt, TrendingUp } from "lucide-react";

type PaymentRow = Payment & {
  studentName: string;
  madrasaName: string;
};

export function SuperAdminPaymentsOverview() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { search, setSearch, page, setPage, filters, setFilter } = useTableState();

  const madrasaMap = useMemo(() => {
    const map = new Map<string, string>();
    madrasaService.getAllMadrasas().forEach((m) => map.set(m.id, m.name));
    return map;
  }, []);

  const studentMap = useMemo(() => {
    const map = new Map<string, string>();
    studentService.getAll().forEach((s) => map.set(s.id, s.name));
    return map;
  }, []);

  const loadPayments = useCallback(async () => {
    setLoading(true);
    const res = await madrasaService.getPayments({ page, limit: 10 });
    if (res.success) {
      setPayments(
        res.data.data.map((p) => ({
          ...p,
          studentName: studentMap.get(p.studentId) ?? "Unknown",
          madrasaName: madrasaMap.get(p.madrasaId) ?? "Unknown",
        }))
      );
    }
    setLoading(false);
  }, [page, studentMap, madrasaMap]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const filtered = useMemo(() => {
    let rows = payments;
    if (filters.status && filters.status !== "all") {
      rows = rows.filter((p) => p.status === filters.status);
    }
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter(
      (p) =>
        p.invoiceNo.toLowerCase().includes(q) ||
        p.studentName.toLowerCase().includes(q) ||
        p.madrasaName.toLowerCase().includes(q) ||
        p.feeType.toLowerCase().includes(q)
    );
  }, [payments, search, filters.status]);

  const stats = useMemo(() => {
    const totalCollected = payments.reduce((sum, p) => sum + p.paid, 0);
    const totalDue = payments.reduce((sum, p) => sum + p.due, 0);
    const paidCount = payments.filter((p) => p.status === "paid").length;
    return { totalCollected, totalDue, paidCount };
  }, [payments]);

  const columns: Column<PaymentRow>[] = [
    { key: "invoice", header: "Invoice", cell: (row) => row.invoiceNo },
    { key: "madrasa", header: "Madrasa", cell: (row) => row.madrasaName },
    { key: "student", header: "Student", cell: (row) => row.studentName },
    {
      key: "feeType",
      header: "Fee Type",
      cell: (row) => <span className="capitalize">{row.feeType}</span>,
    },
    { key: "amount", header: "Amount", cell: (row) => <Money amount={row.amount} /> },
    { key: "paid", header: "Paid", cell: (row) => <Money amount={row.paid} /> },
    { key: "due", header: "Due", cell: (row) => <Money amount={row.due} /> },
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Platform-wide overview of student fee payments across all madrasas."
      />

      {loading ? (
        <CardSkeleton count={3} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Collected"
            value={stats.totalCollected}
            isCurrency
            icon={<DollarSign className="size-5" />}
          />
          <StatCard
            title="Outstanding Due"
            value={stats.totalDue}
            isCurrency
            icon={<TrendingUp className="size-5" />}
          />
          <StatCard
            title="Paid Invoices"
            value={stats.paidCount}
            icon={<Receipt className="size-5" />}
          />
        </div>
      )}

      {loading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          data={filtered}
          columns={columns}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by invoice, madrasa, student, or fee type..."
          filters={[
            {
              key: "status",
              label: "Status",
              value: filters.status ?? "all",
              onChange: (v) => setFilter("status", v),
              options: [
                { label: "Paid", value: "paid" },
                { label: "Partial", value: "partial" },
                { label: "Due", value: "due" },
                { label: "Overdue", value: "overdue" },
              ],
            },
          ]}
          page={page}
          totalPages={Math.ceil(filtered.length / 10) || 1}
          onPageChange={setPage}
          emptyTitle="No payments found"
          emptyDescription="No payment records match your filters."
          mobileCard={(row) => (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{row.invoiceNo}</span>
                <StatusBadge status={row.status} />
              </div>
              <p className="text-sm">{row.madrasaName}</p>
              <p className="text-sm text-muted-foreground">{row.studentName}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="capitalize">{row.feeType}</span>
                <Money amount={row.paid} />
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}
