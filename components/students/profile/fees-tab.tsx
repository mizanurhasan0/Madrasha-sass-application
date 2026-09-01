"use client";

import { Wallet } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { useT } from "@/lib/i18n/locale-provider";
import { getPaymentColumns } from "@/components/students/profile/payment-columns";
import { ProfileTabCard } from "@/components/students/profile/profile-tab-card";
import type { Payment } from "@/types/fee";

type FeesTabProps = {
  payments: Payment[];
  totalPaid: number;
  totalDue: number;
};

export function FeesTab({ payments, totalPaid, totalDue }: FeesTabProps) {
  const t = useT();
  const paymentColumns = getPaymentColumns(t);

  return (
    <ProfileTabCard title={t("students.feesTab")} icon={Wallet}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-status-success-bg p-4">
          <p className="text-sm text-muted-foreground">{t("status.paid")}</p>
          <p className="text-xl font-bold text-status-success-fg">
            {totalPaid.toLocaleString()} BDT
          </p>
        </div>
        <div className="rounded-lg border bg-status-danger-bg p-4">
          <p className="text-sm text-muted-foreground">{t("status.due")}</p>
          <p className="text-xl font-bold text-status-danger-fg">
            {totalDue.toLocaleString()} BDT
          </p>
        </div>
      </div>
      <DataTable
        data={payments}
        columns={paymentColumns}
        emptyTitle="No payment records"
        emptyDescription="Fee payments will appear here once recorded."
      />
    </ProfileTabCard>
  );
}
