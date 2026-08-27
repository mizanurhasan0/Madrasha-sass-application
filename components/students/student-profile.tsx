"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { TableSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentService } from "@/services/student.service";
import { attendanceService } from "@/services/attendance.service";
import { feeService } from "@/services/fee.service";
import { examService } from "@/services/exam.service";
import { noticeService } from "@/services/notice.service";
import { guardians } from "@/data/guardians";
import { displayName } from "@/lib/format";
import { useLocale, useT } from "@/lib/i18n/locale-provider";
import { OverviewTab } from "@/components/students/profile/overview-tab";
import { PersonalTab } from "@/components/students/profile/personal-tab";
import { GuardianTab } from "@/components/students/profile/guardian-tab";
import { AcademicTab } from "@/components/students/profile/academic-tab";
import { AttendanceTab } from "@/components/students/profile/attendance-tab";
import { FeesTab } from "@/components/students/profile/fees-tab";
import { ResultsTab } from "@/components/students/profile/results-tab";
import { NoticesTab } from "@/components/students/profile/notices-tab";
import type { StudentWithRelations } from "@/types/student";
import type { AttendanceRecord } from "@/types/attendance";
import type { Payment } from "@/types/fee";
import type { Notice } from "@/types/notice";
import type { StudentResult } from "@/types/exam";

type StudentProfileProps = {
  studentId: string;
};

export function StudentProfile({ studentId }: StudentProfileProps) {
  const router = useRouter();
  const t = useT();
  const { locale } = useLocale();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentWithRelations | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      const studentRes = await studentService.getStudentById(studentId);
      if (!studentRes.success || !studentRes.data) {
        setError(studentRes.message ?? "Student not found");
        setLoading(false);
        return;
      }

      const s = studentRes.data;
      setStudent(s);

      const [attRes, payRes, noticesRes] = await Promise.all([
        attendanceService.getStudentHistory(studentId),
        feeService.getPayments({ limit: 50 }),
        noticeService.getNotices({ limit: 20, published: true }),
      ]);

      if (attRes.success) setAttendance(attRes.data);
      if (payRes.success) {
        setPayments(payRes.data.data.filter((p) => p.studentId === studentId));
      }
      if (noticesRes.success) {
        setNotices(
          noticesRes.data.data.filter(
            (n) =>
              n.audience === "everyone" ||
              n.audience === "guardians" ||
              (n.audience === "class" && n.targetClassId === s.classId)
          )
        );
      }

      const exams = examService
        .getAll()
        .filter((e) => e.classId === s.classId && e.status === "completed");
      const resultPromises = exams.map((e) => examService.getStudentResult(studentId, e.id));
      const resultResponses = await Promise.all(resultPromises);
      setResults(resultResponses.filter((r) => r.success && r.data).map((r) => r.data!));

      setLoading(false);
    }
    load();
  }, [studentId]);

  const guardian = student ? guardians.find((g) => g.id === student.guardianId) : null;

  const attendanceStats = {
    total: attendance.length,
    present: attendance.filter((a) => a.status === "present").length,
    absent: attendance.filter((a) => a.status === "absent").length,
    late: attendance.filter((a) => a.status === "late").length,
    leave: attendance.filter((a) => a.status === "leave").length,
  };
  const attendanceRate =
    attendanceStats.total > 0
      ? Math.round((attendanceStats.present / attendanceStats.total) * 100)
      : 0;

  const totalPaid = payments.reduce((sum, p) => sum + p.paid, 0);
  const totalDue = payments.reduce((sum, p) => sum + p.due, 0);
  const latestResult = results[0];

  if (loading) {
    return <TableSkeleton rows={10} />;
  }

  if (error || !student) {
    return (
      <ErrorState
        title="Student not found"
        message={error ?? "The requested student could not be found."}
        onRetry={() => router.push("/dashboard/students")}
      />
    );
  }

  const studentName = displayName(student, locale);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="outline" size="icon-sm" render={<Link href="/dashboard/students" />}>
            <ArrowLeft className="size-4" />
            <span className="sr-only">Back to students</span>
          </Button>
          <UserAvatar name={studentName} src={student.avatar} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{studentName}</h1>
              <StatusBadge status={student.status} />
            </div>
            {student.nameBn && locale === "en" && (
              <p className="text-sm text-muted-foreground">{student.nameBn}</p>
            )}
            {student.name && locale === "bn" && (
              <p className="text-sm text-muted-foreground">{student.name}</p>
            )}
            <p className="mt-1 font-mono text-sm text-muted-foreground">{student.studentId}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {student.className} · {t("students.section")} {student.sectionName}
            </p>
          </div>
        </div>
        <Button variant="outline" render={<Link href="/dashboard/students" />}>
          Back to List
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList variant="line" className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">{t("students.overview")}</TabsTrigger>
          <TabsTrigger value="personal">{t("students.personal")}</TabsTrigger>
          <TabsTrigger value="guardian">{t("students.guardianInfo")}</TabsTrigger>
          <TabsTrigger value="academic">{t("students.academic")}</TabsTrigger>
          <TabsTrigger value="attendance">{t("students.attendanceTab")}</TabsTrigger>
          <TabsTrigger value="fees">{t("students.feesTab")}</TabsTrigger>
          <TabsTrigger value="results">{t("students.resultsTab")}</TabsTrigger>
          <TabsTrigger value="notices">{t("students.noticesTab")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab
            student={student}
            attendance={attendance}
            attendanceStats={attendanceStats}
            attendanceRate={attendanceRate}
            totalPaid={totalPaid}
            totalDue={totalDue}
            latestResult={latestResult}
            notices={notices}
          />
        </TabsContent>

        <TabsContent value="personal" className="mt-6">
          <PersonalTab student={student} />
        </TabsContent>

        <TabsContent value="guardian" className="mt-6">
          <GuardianTab guardian={guardian} />
        </TabsContent>

        <TabsContent value="academic" className="mt-6">
          <AcademicTab student={student} />
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <AttendanceTab attendance={attendance} attendanceStats={attendanceStats} />
        </TabsContent>

        <TabsContent value="fees" className="mt-6">
          <FeesTab payments={payments} totalPaid={totalPaid} totalDue={totalDue} />
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <ResultsTab results={results} />
        </TabsContent>

        <TabsContent value="notices" className="mt-6">
          <NoticesTab notices={notices} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
