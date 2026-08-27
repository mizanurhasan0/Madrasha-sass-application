"use client";

import { Wallet } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n/locale-provider";
import { getPaymentColumns } from "@/components/students/profile/payment-columns";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="size-4" />
          {t("students.feesTab")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">{t("status.paid")}</p>
            <p className="text-xl font-bold">{totalPaid.toLocaleString()} BDT</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">{t("status.due")}</p>
            <p className="text-xl font-bold text-destructive">{totalDue.toLocaleString()} BDT</p>
          </div>
        </div>
        <DataTable
          data={payments}
          columns={paymentColumns}
          emptyTitle="No payment records"
          emptyDescription="Fee payments will appear here once recorded."
        />
      </CardContent>
    </Card>
  );
}
