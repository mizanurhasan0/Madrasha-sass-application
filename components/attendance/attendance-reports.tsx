"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/common/stat-card";
import { ChartCard } from "@/components/common/chart-card";
import { CardSkeleton } from "@/components/common/loading-state";
import { BarSeriesChart } from "@/components/charts/chart-wrappers";
import { attendanceService } from "@/services/attendance.service";
import { academicService } from "@/services/academic.service";
import type { Class } from "@/types/academic";
import { Users, UserCheck, UserX, Clock, CalendarOff } from "lucide-react";

type DailySummary = {
  present: number;
  absent: number;
  late: number;
  leave: number;
  total: number;
};

export function AttendanceReports() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [classPercentages, setClassPercentages] = useState<
    { className: string; percentage: number; present: number; total: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      setLoading(true);

      const [summaryRes, classesRes] = await Promise.all([
        attendanceService.getSummary(date),
        academicService.getClasses(),
      ]);

      if (summaryRes.success) setSummary(summaryRes.data);

      if (classesRes.success) {
        const classes = classesRes.data.data;
        const percentages = await Promise.all(
          classes.map(async (cls: Class) => {
            const res = await attendanceService.getSummary(date, cls.id);
            const data = res.success ? res.data : { present: 0, total: 0 };
            const percentage =
              data.total > 0 ? Math.round((data.present / data.total) * 100) : 0;
            return {
              className: cls.name,
              percentage,
              present: data.present,
              total: data.total,
            };
          })
        );
        setClassPercentages(percentages);
      }

      setLoading(false);
    }
    loadReports();
  }, [date]);

  if (loading || !summary) {
    return (
      <div className="space-y-6">
        <CardSkeleton count={5} />
      </div>
    );
  }

  const chartData = classPercentages.map((c) => ({
    class: c.className,
    percentage: c.percentage,
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="report-date">Report Date</Label>
        <Input
          id="report-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-44"
        />
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Daily Summary</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Total Marked" value={summary.total} icon={<Users className="size-5" />} />
          <StatCard title="Present" value={summary.present} icon={<UserCheck className="size-5" />} />
          <StatCard title="Absent" value={summary.absent} icon={<UserX className="size-5" />} />
          <StatCard title="Late" value={summary.late} icon={<Clock className="size-5" />} />
          <StatCard title="Leave" value={summary.leave} icon={<CalendarOff className="size-5" />} />
        </div>
      </div>

      <ChartCard
        title="Class Attendance Percentage"
        description="Present rate by class for the selected date"
      >
        {chartData.length > 0 ? (
          <BarSeriesChart data={chartData} dataKey="percentage" xKey="class" />
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No attendance data for this date.
          </p>
        )}
      </ChartCard>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Class</th>
              <th className="px-4 py-3 text-right font-medium">Present</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-right font-medium">Percentage</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {classPercentages.map((row) => (
              <tr key={row.className}>
                <td className="px-4 py-3 font-medium">{row.className}</td>
                <td className="px-4 py-3 text-right tabular-nums">{row.present}</td>
                <td className="px-4 py-3 text-right tabular-nums">{row.total}</td>
                <td className="px-4 py-3 text-right tabular-nums">{row.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
