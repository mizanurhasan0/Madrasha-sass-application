"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { feeService } from "@/services/fee.service";
import { studentService } from "@/services/student.service";
import type { Payment } from "@/types/fee";

type DueRow = Payment & {
  studentName: string;
  studentCode: string;
  className: string;
};

export default function DueListPage() {
  const [dueList, setDueList] = useState<DueRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { search, setSearch } = useTableState();

  const studentMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof studentService.getAll>[0]>();
    studentService.getAll().forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  useEffect(() => {
    async function load() {
      const res = await feeService.getDueList();
      if (res.success) {
        setDueList(
          res.data.map((p) => {
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
  }, [studentMap]);

  const filtered = useMemo(() => {
    if (!search) return dueList;
    const q = search.toLowerCase();
    return dueList.filter(
      (p) =>
        p.studentName.toLowerCase().includes(q) ||
        p.studentCode.toLowerCase().includes(q) ||
        p.invoiceNo.toLowerCase().includes(q)
    );
  }, [dueList, search]);

  const columns: Column<DueRow>[] = [
    { key: "student", header: "Student", cell: (row) => row.studentName },
    { key: "studentId", header: "Student ID", cell: (row) => row.studentCode },
    { key: "class", header: "Class", cell: (row) => row.className },
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

  return (
    <RoleGuard allowed={["accountant"]}>
      <div className="space-y-6">
        <PageHeader
          title="Due List"
          description="Students with outstanding fee balances."
        />

        {loading ? (
          <TableSkeleton />
        ) : (
          <DataTable
            data={filtered}
            columns={columns}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by student or invoice..."
            emptyTitle="No dues found"
            emptyDescription="All students are up to date on payments."
            mobileCard={(row) => (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{row.studentName}</span>
                  <StatusBadge status={row.status} />
                </div>
                <p className="text-sm text-muted-foreground">{row.className}</p>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{row.feeType}</span>
                  <Money amount={row.due} />
                </div>
              </div>
            )}
          />
        )}
      </div>
    </RoleGuard>
  );
}
