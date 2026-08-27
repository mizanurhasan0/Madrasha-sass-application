"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Wallet } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, type Column } from "@/components/common/data-table";
import { EmptyState } from "@/components/common/empty-state";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { guardians } from "@/data/guardians";
import { studentService } from "@/services/student.service";
import { feeService } from "@/services/fee.service";
import type { Payment } from "@/types/fee";

type FeeRow = Payment & {
  studentName: string;
  studentCode: string;
  className: string;
};

export function MyFeesView() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<FeeRow[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("all");
  const [search, setSearch] = useState("");

  const guardian = useMemo(
    () =>
      guardians.find(
        (g) => g.email === user?.email || g.phone === user?.email
      ),
    [user?.email]
  );

  const children = useMemo(() => {
    if (!guardian) return [];
    return studentService
      .getAll()
      .filter((s) => guardian.studentIds.includes(s.id));
  }, [guardian]);

  useEffect(() => {
    const paramStudent = searchParams.get("student");
    if (paramStudent && children.some((c) => c.id === paramStudent)) {
      setSelectedChildId(paramStudent);
    }
  }, [searchParams, children]);

  useEffect(() => {
    async function load() {
      if (!guardian) {
        setLoading(false);
        return;
      }

      const res = await feeService.getPayments({ limit: 100 });
      if (res.success) {
        const childIds = new Set(guardian.studentIds);
        const studentMap = new Map(children.map((c) => [c.id, c]));
        setPayments(
          res.data.data
            .filter((p) => childIds.has(p.studentId))
            .map((p) => {
              const student = studentMap.get(p.studentId);
              return {
                ...p,
                studentName: student?.name ?? "Unknown",
                studentCode: student?.studentId ?? "—",
                className: student?.className ?? "—",
              };
            })
        );
      }
      setLoading(false);
    }
    load();
  }, [guardian, children]);

  const filtered = useMemo(() => {
    let list = payments;
    if (selectedChildId !== "all") {
      list = list.filter((p) => p.studentId === selectedChildId);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.studentName.toLowerCase().includes(q) ||
          p.invoiceNo.toLowerCase().includes(q) ||
          p.feeType.toLowerCase().includes(q)
      );
    }
    return list;
  }, [payments, selectedChildId, search]);

  const totals = useMemo(() => {
    return filtered.reduce(
      (acc, p) => ({
        amount: acc.amount + p.amount,
        paid: acc.paid + p.paid,
        due: acc.due + p.due,
      }),
      { amount: 0, paid: 0, due: 0 }
    );
  }, [filtered]);

  const columns: Column<FeeRow>[] = [
    { key: "student", header: "Student", cell: (row) => row.studentName },
    { key: "invoice", header: "Invoice", cell: (row) => row.invoiceNo },
    {
      key: "feeType",
      header: "Fee Type",
      cell: (row) => <span className="capitalize">{row.feeType}</span>,
    },
    { key: "amount", header: "Total", cell: (row) => <Money amount={row.amount} /> },
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

  if (!guardian) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Fees" description="Fee records for your children." />
        <EmptyState
          title="Guardian profile not found"
          description="Your account is not linked to a guardian record."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Fees"
        description="View fee payments and outstanding balances for your children."
        actions={
          children.length > 1 ? (
            <Select
              value={selectedChildId}
              onValueChange={(v) => v && setSelectedChildId(v)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select child" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null
        }
      />

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              title="Total Fees"
              value={totals.amount}
              isCurrency
              icon={<Wallet className="size-5" />}
            />
            <StatCard title="Paid" value={totals.paid} isCurrency />
            <StatCard title="Outstanding" value={totals.due} isCurrency />
          </div>

          <DataTable
            data={filtered}
            columns={columns}
            searchPlaceholder="Search invoices..."
            searchValue={search}
            onSearchChange={setSearch}
            emptyTitle="No fee records"
            emptyDescription="No fee payments found for your children."
            mobileCard={(row) => (
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{row.studentName}</p>
                    <p className="text-xs text-muted-foreground">{row.invoiceNo}</p>
                  </div>
                  <StatusBadge status={row.status} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="capitalize text-muted-foreground">{row.feeType}</span>
                  <Money amount={row.due} />
                </div>
              </div>
            )}
          />
        </>
      )}
    </div>
  );
}
