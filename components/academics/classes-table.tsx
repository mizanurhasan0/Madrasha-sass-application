"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { TableSkeleton } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { academicService } from "@/services/academic.service";
import type { Class } from "@/types/academic";

type ClassesTableProps = {
  refreshKey?: number;
};

export function ClassesTable({ refreshKey = 0 }: ClassesTableProps) {
  const { search, setSearch, page, setPage } = useTableState();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<Class[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [sessionMap, setSessionMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    academicService.getSessions().then((res) => {
      if (res.success) {
        setSessionMap(new Map(res.data.map((s) => [s.id, s.name])));
      }
    });
  }, []);

  const loadClasses = useCallback(async () => {
    setLoading(true);
    const result = await academicService.getClasses({ page, limit: 10, search });
    if (result.success) {
      setClasses(result.data.data);
      setTotalPages(result.data.totalPages);
    }
    setLoading(false);
  }, [page, search, refreshKey]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const columns: Column<Class>[] = [
    {
      key: "name",
      header: "Class",
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "session",
      header: "Session",
      cell: (row) => sessionMap.get(row.sessionId) ?? "—",
      className: "hidden md:table-cell",
    },
    {
      key: "students",
      header: "Students",
      cell: (row) => (
        <span>
          {row.studentCount} / {row.capacity}
        </span>
      ),
    },
    {
      key: "capacity",
      header: "Capacity",
      cell: (row) => {
        const pct = row.capacity > 0 ? Math.round((row.studentCount / row.capacity) * 100) : 0;
        return (
          <Badge variant={pct >= 90 ? "destructive" : "secondary"} className="text-xs">
            {pct}% filled
          </Badge>
        );
      },
      className: "hidden lg:table-cell",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (loading && classes.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <DataTable
      data={classes}
      columns={columns}
      searchValue={search}
      onSearchChange={(v) => {
        setSearch(v);
        setPage(1);
      }}
      searchPlaceholder="Search classes..."
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      emptyTitle="No classes found"
      emptyDescription="Add a new class to get started."
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{row.name}</p>
              <p className="text-xs text-muted-foreground">
                {sessionMap.get(row.sessionId) ?? "—"}
              </p>
            </div>
            <StatusBadge status={row.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {row.studentCount} / {row.capacity} students
          </p>
        </div>
      )}
    />
  );
}
