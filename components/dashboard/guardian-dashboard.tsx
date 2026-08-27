"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, ClipboardCheck, FileText, GraduationCap, Wallet } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { DateDisplay } from "@/components/common/format-display";
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
import { feeService } from "@/services/fee.service";
import { examService } from "@/services/exam.service";
import { noticeService } from "@/services/notice.service";
import { displayName, displayTitle } from "@/lib/format";
import { useLocale, useT } from "@/lib/i18n/locale-provider";
import type { Notice } from "@/types/notice";
import type { StudentWithRelations } from "@/types/student";

export function GuardianDashboard() {
  const { user } = useAuth();
  const { locale } = useLocale();
  const t = useT();
  const [loading, setLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [children, setChildren] = useState<StudentWithRelations[]>([]);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [feeDue, setFeeDue] = useState(0);
  const [latestGrade, setLatestGrade] = useState<string>("—");
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);

  const guardian = useMemo(
    () =>
      guardians.find(
        (g) => g.email === user?.email || g.phone === user?.email
      ),
    [user?.email]
  );

  useEffect(() => {
    async function load() {
      if (!guardian) {
        setLoading(false);
        return;
      }

      const childStudents = studentService
        .getAll()
        .filter((s) => guardian.studentIds.includes(s.id));

      setChildren(childStudents);
      const firstChild = childStudents[0];
      if (firstChild) {
        setSelectedChildId(firstChild.id);
      }

      const noticesRes = await noticeService.getNotices({
        limit: 5,
        published: true,
      });
      if (noticesRes.success) {
        setRecentNotices(
          noticesRes.data.data.filter(
            (n) => n.audience === "everyone" || n.audience === "guardians"
          )
        );
      }

      setLoading(false);
    }
    load();
  }, [guardian]);

  useEffect(() => {
    async function loadChildData() {
      if (!selectedChildId) return;

      const historyRes = await attendanceService.getStudentHistory(selectedChildId);
      if (historyRes.success && historyRes.data.length > 0) {
        const present = historyRes.data.filter((r) => r.status === "present").length;
        setAttendanceRate(Math.round((present / historyRes.data.length) * 100));
      } else {
        setAttendanceRate(0);
      }

      const paymentsRes = await feeService.getPayments({ limit: 50 });
      if (paymentsRes.success) {
        const due = paymentsRes.data.data
          .filter((p) => p.studentId === selectedChildId)
          .reduce((sum, p) => sum + p.due, 0);
        setFeeDue(due);
      }

      const exams = examService.getAll();
      const child = children.find((c) => c.id === selectedChildId);
      if (child) {
        const completedExam = exams.find(
          (e) => e.classId === child.classId && e.status === "completed"
        );
        if (completedExam) {
          const resultRes = await examService.getStudentResult(
            selectedChildId,
            completedExam.id
          );
          if (resultRes.success) {
            setLatestGrade(resultRes.data.grade);
          }
        }
      }
    }
    loadChildData();
  }, [selectedChildId, children]);

  const selectedChild = children.find((c) => c.id === selectedChildId);

  if (loading) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("dashboard.guardian")}
        description={t("dashboard.guardianDesc")}
        actions={
          children.length > 1 ? (
            <Select
              value={selectedChildId}
              onValueChange={(value) => value && setSelectedChildId(value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t("common.selectChild")} />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {displayName(child, locale)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : null
        }
      />

      {selectedChild && (
        <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
          {t("common.viewing")}:{" "}
          <span className="font-medium">{displayName(selectedChild, locale)}</span>
          <span className="text-muted-foreground">
            {" "}
            · {selectedChild.className} ({selectedChild.sectionName})
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("dashboard.myChildren")}
          value={children.length}
          icon={<GraduationCap className="size-5" />}
        />
        <StatCard
          title={t("dashboard.attendanceRate")}
          value={`${attendanceRate}%`}
          description={t("common.basedOnRecords")}
          icon={<ClipboardCheck className="size-5" />}
        />
        <StatCard
          title={t("dashboard.feeDue")}
          value={feeDue}
          isCurrency
          icon={<Wallet className="size-5" />}
        />
        <StatCard
          title={t("dashboard.latestGrade")}
          value={latestGrade}
          icon={<FileText className="size-5" />}
        />
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <Bell className="size-4" />
          {t("dashboard.recentNotices")}
        </h3>
        {recentNotices.length === 0 ? (
          <EmptyState title={t("common.noNotices")} className="py-8" />
        ) : (
          <div className="space-y-2">
            {recentNotices.slice(0, 5).map((notice) => (
              <div key={notice.id} className="rounded-lg border p-2">
                <p className="text-sm font-medium">{displayTitle(notice, locale)}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <DateDisplay date={notice.publishDate} />
                  <StatusBadge status={notice.category} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
