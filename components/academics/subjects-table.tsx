"use client";

import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { TableSkeleton } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { useResourceList } from "@/hooks/use-resource-list";
import { academicService } from "@/services/academic.service";
import { teacherService } from "@/services/teacher.service";
import type { Subject } from "@/types/academic";

type SubjectsTableProps = {
  refreshKey?: number;
};

export function SubjectsTable({ refreshKey = 0 }: SubjectsTableProps) {
  const { data: subjects, search, setSearch, page, setPage, totalPages, isInitialLoad } =
    useResourceList({
      fetchFn: (params) => academicService.getSubjects(params),
      refreshKey,
    });

  const classMap = new Map(academicService.getAllClasses().map((c) => [c.id, c.name]));
  const teacherMap = new Map(teacherService.getAll().map((t) => [t.id, t.name]));

  const columns: Column<Subject>[] = [
    {
      key: "name",
      header: "Subject",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.code}</p>
        </div>
      ),
    },
    {
      key: "class",
      header: "Class",
      cell: (row) => classMap.get(row.classId) ?? "—",
      className: "hidden md:table-cell",
    },
    {
      key: "teacher",
      header: "Teacher",
      cell: (row) => teacherMap.get(row.teacherId) ?? "—",
    },
    {
      key: "type",
      header: "Type",
      cell: (row) => (
        <Badge variant={row.type === "core" ? "default" : "secondary"} className="text-xs capitalize">
          {row.type}
        </Badge>
      ),
      className: "hidden lg:table-cell",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (isInitialLoad) {
    return <TableSkeleton />;
  }

  return (
    <DataTable
      data={subjects}
      columns={columns}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search subjects..."
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      emptyTitle="No subjects found"
      emptyDescription="Add a new subject to get started."
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.code}</p>
            </div>
            <StatusBadge status={row.status} />
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span>{classMap.get(row.classId)}</span>
            <span>·</span>
            <span>{teacherMap.get(row.teacherId)}</span>
          </div>
          <Badge variant="secondary" className="text-xs capitalize">
            {row.type}
          </Badge>
        </div>
      )}
    />
  );
}
