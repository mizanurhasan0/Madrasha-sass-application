"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { SuperAdminPaymentsOverview } from "@/components/super-admin/payments-overview";
import { PaymentModal } from "@/components/fees/payment-modal";
import { useAuth } from "@/lib/auth/auth-provider";
import { feeService } from "@/services/fee.service";
import { studentService } from "@/services/student.service";
import type { Fee, Payment } from "@/types/fee";

type PaymentRow = Payment & { studentName: string };

export function PaymentsPageContent() {
  const { role } = useAuth();

  if (role === "super_admin") {
    return <SuperAdminPaymentsOverview />;
  }

  return <MadrasaPaymentsContent />;
}

function MadrasaPaymentsContent() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { search, setSearch, page, setPage, filters, setFilter } = useTableState();

  const studentMap = useMemo(() => {
    const map = new Map<string, string>();
    studentService.getAll().forEach((s) => map.set(s.id, s.name));
    return map;
  }, []);

  const loadPayments = useCallback(async () => {
    setLoading(true);
    const [paymentsRes, feesRes] = await Promise.all([
      feeService.getPayments({
        page,
        limit: 10,
        search: search || undefined,
        status: filters.status !== "all" ? filters.status : undefined,
      }),
      feeService.getFees(),
    ]);

    if (paymentsRes.success) {
      setPayments(
        paymentsRes.data.data.map((p) => ({
          ...p,
          studentName: studentMap.get(p.studentId) ?? "Unknown",
        }))
      );
    }
    if (feesRes.success) setFees(feesRes.data);
    setLoading(false);
  }, [page, filters.status, search, studentMap]);

  useEffect(() => {
    const timer = setTimeout(loadPayments, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [loadPayments, search]);

  const columns: Column<PaymentRow>[] = [
    { key: "invoice", header: "Invoice", cell: (row) => row.invoiceNo },
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
        description="View and record student fee payments."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="size-4" />
            Record Payment
          </Button>
        }
      />

      {loading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          data={payments}
          columns={columns}
          searchValue={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          searchPlaceholder="Search by invoice or student..."
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
          totalPages={Math.ceil(payments.length / 10) || 1}
          onPageChange={setPage}
          emptyTitle="No payments found"
          emptyDescription="Record a payment to get started."
          mobileCard={(row) => (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{row.invoiceNo}</span>
                <StatusBadge status={row.status} />
              </div>
              <p className="text-sm">{row.studentName}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="capitalize">{row.feeType}</span>
                <Money amount={row.paid} />
              </div>
            </div>
          )}
        />
      )}

      <PaymentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        fees={fees}
        onSuccess={loadPayments}
      />
    </div>
  );
}
