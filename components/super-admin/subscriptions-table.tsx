"use client";

import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { Money, DateDisplay } from "@/components/common/format-display";
import type { Subscription } from "@/types/madrasa";

export type SubscriptionRow = Subscription & {
  madrasaName: string;
  planName: string;
};

type SubscriptionsTableProps = {
  subscriptions: SubscriptionRow[];
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function SubscriptionsTable({
  subscriptions,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  page,
  totalPages,
  onPageChange,
}: SubscriptionsTableProps) {
  const columns: Column<SubscriptionRow>[] = [
    {
      key: "madrasa",
      header: "Madrasa",
      cell: (row) => <span className="font-medium">{row.madrasaName}</span>,
    },
    {
      key: "plan",
      header: "Plan",
      cell: (row) => row.planName,
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row) => <Money amount={row.amount} />,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "startDate",
      header: "Start Date",
      cell: (row) => <DateDisplay date={row.startDate} />,
      className: "hidden md:table-cell",
    },
    {
      key: "endDate",
      header: "End Date",
      cell: (row) => <DateDisplay date={row.endDate} />,
      className: "hidden lg:table-cell",
    },
  ];

  return (
    <DataTable
      data={subscriptions}
      columns={columns}
      searchPlaceholder="Search by madrasa or plan…"
      searchValue={search}
      onSearchChange={onSearchChange}
      filters={[
        {
          key: "status",
          label: "Status",
          value: statusFilter,
          onChange: onStatusFilterChange,
          options: [
            { label: "Active", value: "active" },
            { label: "Expired", value: "expired" },
            { label: "Cancelled", value: "cancelled" },
          ],
        },
      ]}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      emptyTitle="No subscriptions found"
      emptyDescription="Try adjusting your search or filters."
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{row.madrasaName}</span>
            <StatusBadge status={row.status} />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{row.planName}</span>
            <Money amount={row.amount} />
          </div>
        </div>
      )}
    />
  );
}
