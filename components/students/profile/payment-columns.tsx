import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay, Money } from "@/components/common/format-display";
import type { Column } from "@/components/common/data-table";
import type { Payment } from "@/types/fee";

export function getPaymentColumns(t: (key: string) => string): Column<Payment>[] {
  return [
    {
      key: "invoice",
      header: "Invoice",
      cell: (row) => <span className="font-mono text-sm">{row.invoiceNo}</span>,
    },
    {
      key: "type",
      header: "Type",
      cell: (row) => <span className="capitalize">{row.feeType}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row) => <Money amount={row.amount} />,
    },
    {
      key: "paid",
      header: t("status.paid"),
      cell: (row) => <Money amount={row.paid} />,
    },
    {
      key: "due",
      header: t("status.due"),
      cell: (row) => <Money amount={row.due} />,
    },
    {
      key: "status",
      header: t("common.status"),
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "date",
      header: t("common.date"),
      cell: (row) => <DateDisplay date={row.date} />,
      className: "hidden md:table-cell",
    },
  ];
}
