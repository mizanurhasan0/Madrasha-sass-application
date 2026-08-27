"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, type Column } from "@/components/common/data-table";
import { EmptyState } from "@/components/common/empty-state";
import { UserAvatar } from "@/components/common/user-avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { formatPhone } from "@/lib/format";
import { teacherService } from "@/services/teacher.service";
import { studentService } from "@/services/student.service";
import type { StudentWithRelations } from "@/types/student";

export function MyStudentsList() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const teacher = useMemo(
    () => teacherService.getAll().find((t) => t.email === user?.email),
    [user?.email]
  );

  const students = useMemo(() => {
    if (!teacher) return [];
    return studentService.getAll().filter((s) => teacher.classIds.includes(s.classId));
  }, [teacher]);

  const classOptions = useMemo(() => {
    const names = new Map<string, string>();
    for (const s of students) {
      names.set(s.classId, s.className);
    }
    return [
      { label: "All Classes", value: "" },
      ...Array.from(names.entries()).map(([value, label]) => ({ label, value })),
    ];
  }, [students]);

  const filtered = useMemo(() => {
    let list = students;
    if (classFilter) list = list.filter((s) => s.classId === classFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [students, classFilter, search]);

  const columns: Column<StudentWithRelations>[] = [
    {
      key: "student",
      header: "Student",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.name} src={row.avatar} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.name}</p>
            {row.nameBn && (
              <p className="truncate text-xs text-muted-foreground">{row.nameBn}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "studentId",
      header: "ID",
      cell: (row) => (
        <span className="font-mono text-sm text-muted-foreground">{row.studentId}</span>
      ),
    },
    {
      key: "class",
      header: "Class / Section",
      cell: (row) => (
        <div>
          <p className="text-sm">{row.className}</p>
          <p className="text-xs text-muted-foreground">{row.sectionName}</p>
        </div>
      ),
    },
    {
      key: "guardian",
      header: "Guardian",
      cell: (row) => (
        <div>
          <p className="text-sm">{row.guardianName}</p>
          <p className="text-xs text-muted-foreground">{formatPhone(row.guardianPhone)}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (!teacher) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Students" description="Students in your assigned classes." />
        <EmptyState
          title="Teacher profile not found"
          description="Your account is not linked to a teacher record."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Students"
        description={`${students.length} student${students.length === 1 ? "" : "s"} across your classes.`}
      />

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by name or ID..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            key: "class",
            label: "Class",
            options: classOptions,
            value: classFilter,
            onChange: setClassFilter,
          },
        ]}
        emptyTitle="No students found"
        emptyDescription="No students match your search or filter."
        mobileCard={(row) => (
          <div className="flex items-start gap-3">
            <UserAvatar name={row.name} src={row.avatar} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="font-medium">{row.name}</p>
              <p className="text-xs text-muted-foreground">
                {row.studentId} · {row.className} ({row.sectionName})
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{row.guardianName}</p>
            </div>
            <StatusBadge status={row.status} />
          </div>
        )}
      />
    </div>
  );
}
