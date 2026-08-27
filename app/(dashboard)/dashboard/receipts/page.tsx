"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { Money, DateDisplay } from "@/components/common/format-display";
import { FormModal } from "@/components/common/form-modal";
import { TableSkeleton } from "@/components/common/loading-state";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { ReceiptPrintView } from "@/components/fees/receipt-print-view";
import { feeService } from "@/services/fee.service";
import { studentService } from "@/services/student.service";
import type { Receipt } from "@/types/fee";

type ReceiptRow = Receipt & { studentName: string; studentCode: string };

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ReceiptRow | null>(null);
  const { search, setSearch } = useTableState();

  const studentMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof studentService.getAll>[0]>();
    studentService.getAll().forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  const paymentMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof feeService.getAllPayments>[0]>();
    feeService.getAllPayments().forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  useEffect(() => {
    async function load() {
      const res = await feeService.getReceipts();
      if (res.success) {
        setReceipts(
          res.data.map((r) => {
            const student = studentMap.get(r.studentId);
            return {
              ...r,
              studentName: student?.name ?? "Unknown",
              studentCode: student?.studentId ?? "—",
            };
          })
        );
      }
      setLoading(false);
    }
    load();
  }, [studentMap]);

  const filtered = useMemo(() => {
    if (!search) return receipts;
    const q = search.toLowerCase();
    return receipts.filter(
      (r) =>
        r.receiptNo.toLowerCase().includes(q) ||
        r.studentName.toLowerCase().includes(q) ||
        r.studentCode.toLowerCase().includes(q)
    );
  }, [receipts, search]);

  const columns: Column<ReceiptRow>[] = [
    { key: "receiptNo", header: "Receipt No.", cell: (row) => row.receiptNo },
    { key: "student", header: "Student", cell: (row) => row.studentName },
    { key: "studentId", header: "Student ID", cell: (row) => row.studentCode },
    { key: "amount", header: "Amount", cell: (row) => <Money amount={row.amount} /> },
    {
      key: "date",
      header: "Date",
      cell: (row) => <DateDisplay date={row.date} />,
    },
    {
      key: "actions",
      header: "",
      cell: (row) => (
        <Button variant="ghost" size="sm" onClick={() => setSelected(row)}>
          <Eye className="size-4" />
          View
        </Button>
      ),
    },
  ];

  const selectedPayment = selected ? paymentMap.get(selected.paymentId) : undefined;

  return (
    <RoleGuard allowed={["accountant"]}>
      <div className="space-y-6">
        <PageHeader
          title="Receipts"
          description="View and print payment receipts."
        />

        {loading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            data={filtered}
            columns={columns}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by receipt no. or student..."
            emptyTitle="No receipts found"
            emptyDescription="Receipts appear when payments are recorded."
            mobileCard={(row) => (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{row.receiptNo}</span>
                  <Money amount={row.amount} />
                </div>
                <p className="text-sm">{row.studentName}</p>
                <div className="flex items-center justify-between">
                  <DateDisplay date={row.date} />
                  <Button variant="ghost" size="sm" onClick={() => setSelected(row)}>
                    View
                  </Button>
                </div>
              </div>
            )}
          />
        )}

        <FormModal
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
          title="Payment Receipt"
          className="sm:max-w-lg"
        >
          {selected && (
            <ReceiptPrintView
              receipt={selected}
              studentName={selected.studentName}
              studentId={selected.studentCode}
              feeType={selectedPayment?.feeType}
              method={selectedPayment?.method}
              onClose={() => setSelected(null)}
            />
          )}
        </FormModal>
      </div>
    </RoleGuard>
  );
}
