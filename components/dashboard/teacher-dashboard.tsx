"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, ClipboardCheck, GraduationCap, Calendar, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { AttendanceStatGrid } from "@/components/common/attendance-stat-grid";
import { EmptyState } from "@/components/common/empty-state";
import { DateDisplay } from "@/components/common/format-display";
import { CardSkeleton } from "@/components/common/loading-state";
import { teacherService } from "@/services/teacher.service";
import { studentService } from "@/services/student.service";
import { examService } from "@/services/exam.service";
import { noticeService } from "@/services/notice.service";
import { attendanceService } from "@/services/attendance.service";
import { classes } from "@/data/academic";
import { displayDescription, displayTitle } from "@/lib/format";
import { useLocale, useT } from "@/lib/i18n/locale-provider";
import type { Exam } from "@/types/exam";
import type { Notice } from "@/types/notice";

export function TeacherDashboard() {
  const { user } = useAuth();
  const { locale } = useLocale();
  const t = useT();
  const [loading, setLoading] = useState(true);
  const [myClasses, setMyClasses] = useState<{ id: string; name: string; studentCount: number }[]>([]);
  const [studentCount, setStudentCount] = useState(0);
  const [attendance, setAttendance] = useState({ present: 0, absent: 0, late: 0, leave: 0, total: 0 });
  const [exams, setExams] = useState<Exam[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  const teacher = useMemo(
    () => teacherService.getAll().find((t) => t.email === user?.email),
    [user?.email]
  );

  useEffect(() => {
    async function load() {
      if (!teacher) {
        setLoading(false);
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      const classIds = teacher.classIds;
      const students = studentService.getAll().filter((s) => classIds.includes(s.classId));

      setMyClasses(
        classIds.map((id) => {
          const cls = classes.find((c) => c.id === id);
          return {
            id,
            name: cls?.name ?? id,
            studentCount: students.filter((s) => s.classId === id).length,
          };
        })
      );
      setStudentCount(students.length);

      const summaries = await Promise.all(
        classIds.map((classId) => attendanceService.getSummary(today, classId))
      );
      const combined = summaries.reduce(
        (acc, res) => {
          if (res.success) {
            acc.present += res.data.present;
            acc.absent += res.data.absent;
            acc.late += res.data.late;
            acc.leave += res.data.leave;
            acc.total += res.data.total;
          }
          return acc;
        },
        { present: 0, absent: 0, late: 0, leave: 0, total: 0 }
      );
      setAttendance(combined);

      const [examsRes, noticesRes] = await Promise.all([
        examService.getExams({ limit: 10 }),
        noticeService.getNotices({ limit: 5, published: true }),
      ]);

      if (examsRes.success) {
        setExams(
          examsRes.data.data
            .filter((e) => classIds.includes(e.classId))
            .filter((e) => e.status === "upcoming" || e.status === "ongoing")
            .slice(0, 5)
        );
      }
      if (noticesRes.success) {
        setNotices(
          noticesRes.data.data.filter(
            (n) => n.audience === "everyone" || n.audience === "teachers"
          )
        );
      }

      setLoading(false);
    }
    load();
  }, [teacher]);

  if (loading) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("dashboard.teacher")}
        description={t("dashboard.teacherWelcome", {
          name: user?.name ?? t("roles.teacher"),
        })}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("dashboard.myClasses")}
          value={myClasses.length}
          icon={<BookOpen className="size-5" />}
        />
        <StatCard
          title={t("dashboard.myStudents")}
          value={studentCount}
          icon={<GraduationCap className="size-5" />}
        />
        <StatCard
          title={t("dashboard.presentToday")}
          value={attendance.present}
          description={t("dashboard.ofMarked", { total: attendance.total })}
          icon={<ClipboardCheck className="size-5" />}
        />
        <StatCard
          title={t("dashboard.upcomingExams")}
          value={exams.length}
          icon={<Calendar className="size-5" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">{t("dashboard.todaysClasses")}</h3>
          <div className="space-y-3">
            {myClasses.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("dashboard.noClassesAssigned")}</p>
            ) : (
              myClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{cls.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("dashboard.studentsCount", { count: cls.studentCount })}
                    </p>
                  </div>
                  <BookOpen className="size-4 text-muted-foreground" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">{t("dashboard.attendanceSummary")}</h3>
          <AttendanceStatGrid attendance={attendance} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-semibold">
            <Calendar className="size-4" />
            {t("dashboard.upcomingExams")}
          </h3>
          <div className="space-y-2">
            {exams.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("dashboard.noUpcomingExams")}</p>
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

        <div className="space-y-3">
          <h3 className="flex items-center gap-2 font-semibold">
            <Bell className="size-4" />
            {t("dashboard.recentNotices")}
          </h3>
          {notices.length === 0 ? (
            <EmptyState title={t("common.noNotices")} className="py-8" />
          ) : (
            <div className="space-y-2">
              {notices.map((notice) => (
                <div key={notice.id} className="rounded-lg border p-3">
                  <p className="font-medium">{displayTitle(notice, locale)}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {displayDescription(notice, locale)}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <DateDisplay date={notice.publishDate} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
