"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ClipboardCheck,
  GraduationCap,
  UserSquare2,
  Wallet,
  AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { ChartCard } from "@/components/common/chart-card";
import { AttendanceStatGrid } from "@/components/common/attendance-stat-grid";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import { CardSkeleton, TableSkeleton } from "@/components/common/loading-state";
import {
  AreaTrendChart,
  BarSeriesChart,
} from "@/components/charts/chart-wrappers";
import { madrasaService } from "@/services/madrasa.service";
import { examService } from "@/services/exam.service";
import { noticeService } from "@/services/notice.service";
import { attendanceService } from "@/services/attendance.service";
import { studentService } from "@/services/student.service";
import type { Payment } from "@/types/fee";
import type { Exam } from "@/types/exam";
import type { Notice } from "@/types/notice";

type PaymentRow = Payment & { studentName: string };
type AbsentRow = { id: string; name: string; className: string; sectionName: string };

export function MadrasaAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Awaited<
    ReturnType<typeof madrasaService.getMadrasaAdminMetrics>
  >["data"] | null>(null);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [absentStudents, setAbsentStudents] = useState<AbsentRow[]>([]);

  const studentMap = useMemo(() => {
    const students = studentService.getAll();
    return {
      byId: new Map(students.map((s) => [s.id, s])),
      names: new Map(students.map((s) => [s.id, s.name])),
    };
  }, []);

  useEffect(() => {
    async function load() {
      const today = new Date().toISOString().split("T")[0];
      const [metricsRes, paymentsRes, examsRes, noticesRes, summaryRes] =
        await Promise.all([
          madrasaService.getMadrasaAdminMetrics(),
          madrasaService.getRecentPayments(5),
          examService.getExams({ limit: 5 }),
          noticeService.getNotices({ limit: 5, published: true }),
          attendanceService.getSummary(today),
        ]);

      if (metricsRes.success) setMetrics(metricsRes.data);
      if (paymentsRes.success) {
        setPayments(
          paymentsRes.data.map((p) => ({
            ...p,
            studentName: studentMap.names.get(p.studentId) ?? "Unknown",
          }))
        );
      }
      if (examsRes.success) {
        setExams(
          examsRes.data.data.filter((e) => e.status === "upcoming" || e.status === "ongoing")
        );
      }
      if (noticesRes.success) setNotices(noticesRes.data.data.slice(0, 5));

      const records = attendanceService.getAll().filter(
        (r) => r.date === today && r.status === "absent"
      );
      setAbsentStudents(
        records.slice(0, 5).map((r) => {
          const student = studentMap.byId.get(r.studentId);
          return {
            id: r.id,
            name: student?.name ?? "Unknown",
            className: student?.className ?? "—",
            sectionName: student?.sectionName ?? "—",
          };
        })
      );

      if (summaryRes.success && metricsRes.success) {
        setMetrics({
          ...metricsRes.data,
          todayAttendance: summaryRes.data.total > 0 ? summaryRes.data : metricsRes.data.todayAttendance,
        });
      }

      setLoading(false);
    }
    load();
  }, [studentMap]);

  const paymentColumns: Column<PaymentRow>[] = [
    { key: "student", header: "Student", cell: (row) => row.studentName },
    {
      key: "amount",
      header: "Paid",
      cell: (row) => <Money amount={row.paid} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "date",
      header: "Date",
      cell: (row) => <DateDisplay date={row.date} />,
    },
  ];

  const absentColumns: Column<AbsentRow>[] = [
    { key: "name", header: "Student", cell: (row) => row.name },
    { key: "class", header: "Class", cell: (row) => row.className },
    { key: "section", header: "Section", cell: (row) => row.sectionName },
  ];

  if (loading || !metrics) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={6} />
        <TableSkeleton />
      </div>
    );
  }

  const attendance = metrics.todayAttendance;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Madrasa Dashboard"
        description="Overview of students, attendance, fees, and academic activities."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Students"
          value={metrics.totalStudents}
          icon={<GraduationCap className="size-5" />}
        />
        <StatCard
          title="Total Teachers"
          value={metrics.totalTeachers}
          icon={<UserSquare2 className="size-5" />}
        />
        <StatCard
          title="Present Today"
          value={attendance.present}
          description={`of ${attendance.total} students`}
          icon={<ClipboardCheck className="size-5" />}
        />
        <StatCard
          title="Today's Collection"
          value={metrics.todayCollection}
          isCurrency
          icon={<Wallet className="size-5" />}
        />
        <StatCard
          title="Total Due"
          value={metrics.totalDue}
          isCurrency
          icon={<Wallet className="size-5" />}
        />
        <StatCard
          title="Upcoming Exams"
          value={metrics.upcomingExams}
          icon={<Calendar className="size-5" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Student Growth" description="Enrollment trend">
          <AreaTrendChart data={metrics.studentGrowth} dataKey="count" />
        </ChartCard>
        <ChartCard title="Weekly Attendance" description="Present students by day">
          <BarSeriesChart
            data={metrics.attendanceOverview}
            dataKey="present"
            xKey="day"
          />
        </ChartCard>
        <ChartCard title="Fee Collection" description="Monthly collection trend">
          <AreaTrendChart data={metrics.feeCollection} dataKey="collected" />
        </ChartCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Today&apos;s Attendance</h3>
          <AttendanceStatGrid attendance={attendance} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Recent Payments</h3>
          <DataTable data={payments} columns={paymentColumns} />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Upcoming Exams</h3>
          <div className="space-y-2">
            {exams.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming exams</p>
            ) : (
              exams.map((exam) => (
                <div key={exam.id} className="rounded-lg border p-3">
                  <p className="font-medium">{exam.name}</p>
                  <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                    <DateDisplay date={exam.startDate} />
                    <StatusBadge status={exam.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-semibold">Recent Notices</h3>
          <div className="space-y-2">
            {notices.map((notice) => (
              <div key={notice.id} className="rounded-lg border p-3">
                <p className="font-medium">{notice.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {notice.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  <DateDisplay date={notice.publishDate} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 text-red-500" />
            <h3 className="font-semibold">Absent Students Today</h3>
          </div>
          <DataTable
            data={absentStudents}
            columns={absentColumns}
            emptyTitle="No absent students"
            emptyDescription="All students are present today."
          />
        </div>
      </div>
    </div>
  );
}
