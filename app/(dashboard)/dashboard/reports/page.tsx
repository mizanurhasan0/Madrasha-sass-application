"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { RoleGuard } from "@/components/dashboard/role-guard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dashboardMetrics } from "@/data/madrasas";
import { students } from "@/data/students";
import { exams } from "@/data/exams";

const reportCards = [
  {
    title: "Attendance Reports",
    description: "Daily summaries, class-wise percentages, and attendance trends.",
    href: "/dashboard/attendance",
    icon: ClipboardCheck,
    stat: `${dashboardMetrics.madrasaAdmin.todayAttendance.present}/${dashboardMetrics.madrasaAdmin.todayAttendance.total} present today`,
  },
  {
    title: "Fee Reports",
    description: "Collection summaries, due lists, and payment analytics.",
    href: "/dashboard/fees",
    icon: Wallet,
    stat: `৳${dashboardMetrics.madrasaAdmin.todayCollection.toLocaleString()} collected today`,
  },
  {
    title: "Student Reports",
    description: "Enrollment stats, class distribution, and student growth.",
    href: "/dashboard/students",
    icon: GraduationCap,
    stat: `${students.length} students enrolled`,
  },
  {
    title: "Exam Reports",
    description: "Exam schedules, results overview, and performance summaries.",
    href: "/dashboard/exams",
    icon: FileText,
    stat: `${exams.length} exams on record`,
  },
];

export default function ReportsPage() {
  return (
    <RoleGuard allowed={["super_admin", "madrasa_admin"]}>
      <div className="space-y-6">
        <PageHeader
          title="Reports"
          description="Access operational reports across attendance, fees, students, and exams."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {reportCards.map((report) => (
            <Card key={report.title} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <report.icon className="size-5" />
                </div>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{report.stat}</p>
                <Button
                  variant="outline"
                  size="sm"
                  render={<Link href={report.href} />}
                >
                  View
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
