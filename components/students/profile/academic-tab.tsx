"use client";

import { BookOpen } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n/locale-provider";
import { formatDate } from "@/lib/format";
import { InfoRow } from "@/components/students/profile/info-row";
import type { StudentWithRelations } from "@/types/student";

type AcademicTabProps = {
  student: StudentWithRelations;
};

export function AcademicTab({ student }: AcademicTabProps) {
  const t = useT();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="size-4" />
          {t("students.academic")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow label={t("students.studentId")} value={student.studentId} />
        <InfoRow label={t("students.class")} value={student.className} />
        <InfoRow label={t("students.section")} value={student.sectionName} />
        <InfoRow label="Admission Date" value={formatDate(student.admissionDate)} />
        <InfoRow
          label="Enrollment Status"
          value={<StatusBadge status={student.status} />}
        />
      </CardContent>
    </Card>
  );
}
