"use client";

import { ClipboardCheck } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import { DataTable } from "@/components/common/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n/locale-provider";
import { getAttendanceColumns } from "@/components/students/profile/attendance-columns";
import type { AttendanceRecord } from "@/types/attendance";

type AttendanceStats = {
  present: number;
  absent: number;
  late: number;
  leave: number;
};

type AttendanceTabProps = {
  attendance: AttendanceRecord[];
  attendanceStats: AttendanceStats;
};

export function AttendanceTab({ attendance, attendanceStats }: AttendanceTabProps) {
  const t = useT();
  const attendanceColumns = getAttendanceColumns(t);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="size-4" />
          {t("students.attendanceTab")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: t("status.present"), count: attendanceStats.present, status: "present" },
            { label: t("status.absent"), count: attendanceStats.absent, status: "absent" },
            { label: t("status.late"), count: attendanceStats.late, status: "late" },
            { label: t("status.leave"), count: attendanceStats.leave, status: "leave" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border p-3 text-center">
              <StatusBadge status={item.status} />
              <p className="mt-2 text-2xl font-bold">{item.count}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
        <DataTable
          data={attendance}
          columns={attendanceColumns}
          emptyTitle={t("common.noAttendance")}
          emptyDescription="Attendance will appear here once teachers mark daily attendance."
        />
      </CardContent>
    </Card>
  );
}
