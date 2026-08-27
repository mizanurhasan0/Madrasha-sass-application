"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { examService } from "@/services/exam.service";
import { classes } from "@/data/academic";
import type { Exam, ExamStatus } from "@/types/exam";

const statusOptions = [
  { label: "All Status", value: "" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
];

export function ExamList() {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<Exam[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { search, setSearch, page, setPage, filters, setFilter } = useTableState();

  const classMap = useMemo(
    () => new Map(classes.map((c) => [c.id, c.name])),
    []
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await examService.getExams({
        page,
        limit: 10,
        search: search || undefined,
      });
      if (res.success) {
        let data = res.data.data;
        if (filters.status) {
          data = data.filter((e) => e.status === filters.status);
        }
        setExams(data);
        setTotalPages(res.data.totalPages);
      }
      setLoading(false);
    }
    load();
  }, [page, search, filters.status]);

  const columns: Column<Exam>[] = [
    { key: "name", header: "Exam", cell: (row) => <span className="font-medium">{row.name}</span> },
    {
      key: "class",
      header: "Class",
      cell: (row) => classMap.get(row.classId) ?? "—",
    },
    {
      key: "dates",
      header: "Schedule",
      cell: (row) => (
        <span className="text-sm">
          <DateDisplay date={row.startDate} /> – <DateDisplay date={row.endDate} />
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (row) => (
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/dashboard/exams/${row.id}/marks`} />}
        >
          <ClipboardList className="mr-1.5 size-4" />
          Marks
        </Button>
      ),
    },
  ];

  if (loading && exams.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title="Exams & Results" description="Manage examinations and mark entry." />
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exams & Results"
        description="View all examinations, enter marks, and manage results."
        actions={
          <Button variant="outline" render={<Link href="/dashboard/results" />}>
            View Results
          </Button>
        }
      />

      <DataTable
        data={exams}
        columns={columns}
        searchPlaceholder="Search exams..."
        searchValue={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        filters={[
          {
            key: "status",
            label: "Status",
            options: statusOptions,
            value: filters.status ?? "",
            onChange: (v) => setFilter("status", v),
          },
        ]}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyTitle="No exams found"
        emptyDescription="Examinations will appear here once scheduled."
        mobileCard={(row) => (
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{row.name}</p>
              <StatusBadge status={row.status as ExamStatus} />
            </div>
            <p className="text-sm text-muted-foreground">{classMap.get(row.classId)}</p>
            <p className="text-xs text-muted-foreground">
              <DateDisplay date={row.startDate} /> – <DateDisplay date={row.endDate} />
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              render={<Link href={`/dashboard/exams/${row.id}/marks`} />}
            >
              Enter Marks
            </Button>
          </div>
        )}
      />
    </div>
  );
}
