"use client";

import { Users, Phone } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n/locale-provider";
import { formatPhone } from "@/lib/format";
import { InfoRow } from "@/components/students/profile/info-row";
import type { Guardian } from "@/types/guardian";

type GuardianTabProps = {
  guardian: Guardian | null | undefined;
};

export function GuardianTab({ guardian }: GuardianTabProps) {
  const t = useT();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="size-4" />
          {t("students.guardianInfo")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {guardian ? (
          <>
            <InfoRow label={t("common.name")} value={guardian.name} />
            <InfoRow label="Relation" value={guardian.relation} />
            <InfoRow
              label={t("common.phone")}
              value={
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5 shrink-0 text-muted-foreground" />
                  {formatPhone(guardian.phone)}
                </span>
              }
            />
            <InfoRow label={t("common.email")} value={guardian.email} />
            <InfoRow label="Occupation" value={guardian.occupation} />
            <InfoRow label={t("common.address")} value={guardian.address} />
            <InfoRow label={t("common.status")} value={<StatusBadge status={guardian.status} />} />
          </>
        ) : (
          <EmptyState
            title="No guardian linked"
            description="Guardian information is not available for this student."
            className="py-8"
          />
        )}
      </CardContent>
    </Card>
  );
}
