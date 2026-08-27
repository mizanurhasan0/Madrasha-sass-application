"use client";

import { Bell, ClipboardCheck, GraduationCap, Wallet } from "lucide-react";
import { StatCard } from "@/components/common/stat-card";
import { DataTable } from "@/components/common/data-table";
import { EmptyState } from "@/components/common/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n/locale-provider";
import { formatDate } from "@/lib/format";
import { InfoRow } from "@/components/students/profile/info-row";
import { getAttendanceColumns } from "@/components/students/profile/attendance-columns";
import type { StudentWithRelations } from "@/types/student";
import type { AttendanceRecord } from "@/types/attendance";
import type { Notice } from "@/types/notice";
import type { StudentResult } from "@/types/exam";

type AttendanceStats = {
  total: number;
  present: number;
};

type OverviewTabProps = {
  student: StudentWithRelations;
  attendance: AttendanceRecord[];
  attendanceStats: AttendanceStats;
  attendanceRate: number;
  totalPaid: number;
  totalDue: number;
  latestResult?: StudentResult;
  notices: Notice[];
};

export function OverviewTab({
  student,
  attendance,
  attendanceStats,
  attendanceRate,
  totalPaid,
  totalDue,
  latestResult,
  notices,
}: OverviewTabProps) {
  const t = useT();
  const attendanceColumns = getAttendanceColumns(t);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("students.attendanceRate")}
          value={`${attendanceRate}%`}
          description={`${attendanceStats.present} of ${attendanceStats.total} days present`}
          icon={<ClipboardCheck className="size-5" />}
        />
        <StatCard
          title={t("students.feeStatus")}
          value={totalDue > 0 ? t("status.due") : t("status.paid")}
          description={
            totalDue > 0
              ? `${totalDue.toLocaleString()} BDT ${t("common.outstanding").toLowerCase()}`
              : `${totalPaid.toLocaleString()} BDT ${t("status.paid").toLowerCase()}`
          }
          icon={<Wallet className="size-5" />}
        />
        <StatCard
          title={t("students.latestGrade")}
          value={latestResult?.grade ?? "—"}
          description={latestResult?.examName ?? t("common.recentExamGrade")}
          icon={<GraduationCap className="size-5" />}
        />
        <StatCard
          title={t("nav.notices")}
          value={notices.length}
          description="Published notices"
          icon={<Bell className="size-5" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow
              label="Gender"
              value={<span className="capitalize">{student.gender}</span>}
            />
            <InfoRow label="Date of Birth" value={formatDate(student.dateOfBirth)} />
            <InfoRow label="Blood Group" value={student.bloodGroup} />
            <InfoRow label={t("students.guardian")} value={student.guardianName} />
            <InfoRow label="Admission Date" value={formatDate(student.admissionDate)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            {attendance.length === 0 ? (
              <EmptyState
                title={t("common.noAttendance")}
                description="Attendance data will appear here once recorded."
                className="py-8"
              />
            ) : (
              <DataTable
                data={attendance.slice(0, 5)}
                columns={attendanceColumns}
                emptyTitle="No records"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
