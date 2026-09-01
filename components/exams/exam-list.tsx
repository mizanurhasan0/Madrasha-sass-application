"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { useResourceList } from "@/hooks/use-resource-list";
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
  const {
    data: fetchedExams,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    filters,
    setFilter,
    isInitialLoad,
  } = useResourceList<Exam, { status: string }>({
    fetchFn: (params) => examService.getExams(params),
    initialFilters: { status: "" },
  });

  const classMap = useMemo(
    () => new Map(classes.map((c) => [c.id, c.name])),
    []
  );

  const exams = useMemo(() => {
    if (!filters.status) return fetchedExams;
    return fetchedExams.filter((e) => e.status === filters.status);
  }, [fetchedExams, filters.status]);

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

  if (isInitialLoad) {
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
        onSearchChange={setSearch}
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
