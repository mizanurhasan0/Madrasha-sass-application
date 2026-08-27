"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { TableSkeleton } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { academicService } from "@/services/academic.service";
import type { Section } from "@/types/academic";

type SectionsTableProps = {
  classId?: string;
  refreshKey?: number;
};

export function SectionsTable({ classId, refreshKey = 0 }: SectionsTableProps) {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const classMap = new Map(academicService.getAllClasses().map((c) => [c.id, c.name]));

  const loadSections = useCallback(async () => {
    setLoading(true);
    const result = await academicService.getSections(classId);
    if (result.success) {
      setSections(result.data);
    }
    setLoading(false);
  }, [classId, refreshKey]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const columns: Column<Section>[] = [
    {
      key: "name",
      header: "Section",
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "class",
      header: "Class",
      cell: (row) => classMap.get(row.classId) ?? "—",
      className: classId ? "hidden" : "",
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
      header: "Fill Rate",
      cell: (row) => {
        const pct = row.capacity > 0 ? Math.round((row.studentCount / row.capacity) * 100) : 0;
        return (
          <Badge variant={pct >= 90 ? "destructive" : "secondary"} className="text-xs">
            {pct}%
          </Badge>
        );
      },
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
      data={sections}
      columns={columns}
      emptyTitle="No sections found"
      emptyDescription={
        classId ? "No sections for this class yet." : "Select a class or add a new section."
      }
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">Section {row.name}</p>
              {!classId && (
                <p className="text-xs text-muted-foreground">
                  {classMap.get(row.classId) ?? "—"}
                </p>
              )}
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
