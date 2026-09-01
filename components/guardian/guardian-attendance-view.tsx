"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClipboardCheck } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { SimpleTable } from "@/components/common/simple-table";
import { CardSkeleton } from "@/components/common/loading-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { guardians } from "@/data/guardians";
import { studentService } from "@/services/student.service";
import { attendanceService } from "@/services/attendance.service";
import type { AttendanceRecord } from "@/types/attendance";
import type { StudentWithRelations } from "@/types/student";

export function GuardianAttendanceView() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const guardian = useMemo(
    () =>
      guardians.find(
        (g) => g.email === user?.email || g.phone === user?.email
      ),
    [user?.email]
  );

  const children = useMemo(() => {
    if (!guardian) return [];
    return studentService
      .getAll()
      .filter((s) => guardian.studentIds.includes(s.id));
  }, [guardian]);

  useEffect(() => {
    if (children.length > 0 && !selectedChildId) {
      const paramStudent = searchParams.get("student");
      const initial =
        paramStudent && children.some((c) => c.id === paramStudent)
          ? paramStudent
          : children[0].id;
      setSelectedChildId(initial);
    }
  }, [children, selectedChildId, searchParams]);

  useEffect(() => {
    async function load() {
      if (!selectedChildId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await attendanceService.getStudentHistory(selectedChildId);
      if (res.success) {
        setRecords(res.data.sort((a, b) => b.date.localeCompare(a.date)));
      } else {
        setRecords([]);
      }
      setLoading(false);
    }
    load();
  }, [selectedChildId]);

  const selectedChild = children.find((c) => c.id === selectedChildId);

  const summary = useMemo(() => {
    if (records.length === 0) {
      return { present: 0, absent: 0, late: 0, leave: 0, rate: 0 };
    }
    const present = records.filter((r) => r.status === "present").length;
    const absent = records.filter((r) => r.status === "absent").length;
    const late = records.filter((r) => r.status === "late").length;
    const leave = records.filter((r) => r.status === "leave").length;
    return {
      present,
      absent,
      late,
      leave,
      rate: Math.round((present / records.length) * 100),
    };
  }, [records]);

  if (!guardian) {
    return (
      <EmptyState
        title="Guardian profile not found"
        description="Your account is not linked to a guardian record."
      />
    );
  }

  if (children.length === 0) {
    return (
      <EmptyState
        title="No children linked"
        description="Contact the madrasa admin to link your children."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="View attendance records for your children (read-only)."
        actions={
          children.length > 1 ? (
            <ChildSelect
              students={children}
              value={selectedChildId}
              onChange={setSelectedChildId}
            />
          ) : null
        }
      />

      {selectedChild && (
        <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
          Viewing: <span className="font-medium">{selectedChild.name}</span>
          <span className="text-muted-foreground">
            {" "}
            · {selectedChild.className} ({selectedChild.sectionName})
          </span>
        </div>
      )}

      {loading ? (
        <CardSkeleton count={4} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard
              title="Attendance Rate"
              value={`${summary.rate}%`}
              icon={<ClipboardCheck className="size-5" />}
            />
            <StatCard title="Present" value={summary.present} />
            <StatCard title="Absent" value={summary.absent} />
            <StatCard title="Late" value={summary.late} />
            <StatCard title="Leave" value={summary.leave} />
          </div>

          {records.length === 0 ? (
            <EmptyState
              title="No attendance records"
              description="Attendance has not been recorded yet for this student."
            />
          ) : (
            <div className="rounded-xl border bg-card">
              <div className="hidden md:block">
                <SimpleTable
                  data={records}
                  getRowKey={(record) => record.id}
                  className="rounded-none border-0"
                  columns={[
                    {
                      key: "date",
                      header: "Date",
                      cell: (record) => <DateDisplay date={record.date} />,
                    },
                    {
                      key: "status",
                      header: "Status",
                      cell: (record) => <StatusBadge status={record.status} />,
                    },
                  ]}
                />
              </div>
              <div className="space-y-2 p-4 md:hidden">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                  >
                    <DateDisplay date={record.date} />
                    <StatusBadge status={record.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

type ChildSelectProps = {
  students: StudentWithRelations[];
  value: string;
  onChange: (id: string) => void;
};

function ChildSelect({ students, value, onChange }: ChildSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select child" />
      </SelectTrigger>
      <SelectContent>
        {students.map((child) => (
          <SelectItem key={child.id} value={child.id}>
            {child.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
