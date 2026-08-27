"use client";

import { User, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale, useT } from "@/lib/i18n/locale-provider";
import { displayName, formatDate, formatPhone } from "@/lib/format";
import { InfoRow } from "@/components/students/profile/info-row";
import type { StudentWithRelations } from "@/types/student";

type PersonalTabProps = {
  student: StudentWithRelations;
};

export function PersonalTab({ student }: PersonalTabProps) {
  const t = useT();
  const { locale } = useLocale();
  const name = displayName(student, locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="size-4" />
          {t("students.personal")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow label={t("common.name")} value={name} />
        <InfoRow label={t("students.nameBn")} value={student.nameBn} />
        <InfoRow
          label="Gender"
          value={<span className="capitalize">{student.gender}</span>}
        />
        <InfoRow label="Date of Birth" value={formatDate(student.dateOfBirth)} />
        <InfoRow label="Blood Group" value={student.bloodGroup} />
        <InfoRow
          label={t("common.phone")}
          value={student.phone ? formatPhone(student.phone) : undefined}
        />
        <InfoRow
          label={t("common.address")}
          value={
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
              {student.address}
            </span>
          }
        />
      </CardContent>
    </Card>
  );
}
