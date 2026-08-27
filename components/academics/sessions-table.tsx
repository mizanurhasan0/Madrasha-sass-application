"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { academicService } from "@/services/academic.service";
import type { AcademicSession } from "@/types/academic";

export function SessionsTable() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<AcademicSession[]>([]);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    const result = await academicService.getSessions();
    if (result.success) {
      setSessions(result.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const columns: Column<AcademicSession>[] = [
    {
      key: "name",
      header: "Session",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.name}</span>
          {row.isCurrent && (
            <Badge variant="default" className="text-xs">
              Current
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      cell: (row) => <DateDisplay date={row.startDate} />,
      className: "hidden md:table-cell",
    },
    {
      key: "endDate",
      header: "End Date",
      cell: (row) => <DateDisplay date={row.endDate} />,
      className: "hidden md:table-cell",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <DataTable
      data={sessions}
      columns={columns}
      emptyTitle="No sessions found"
      emptyDescription="Academic sessions will appear here."
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <p className="font-medium">{row.name}</p>
              {row.isCurrent && (
                <Badge variant="default" className="text-xs">
                  Current
                </Badge>
              )}
            </div>
            <StatusBadge status={row.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            <DateDisplay date={row.startDate} /> – <DateDisplay date={row.endDate} />
          </p>
        </div>
      )}
    />
  );
}
