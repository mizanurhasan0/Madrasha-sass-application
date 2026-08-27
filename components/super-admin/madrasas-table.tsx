"use client";

import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Madrasa } from "@/types/madrasa";
import type { SelectOption } from "@/types/common";

export type MadrasaRow = Madrasa & { planName: string };

type MadrasasTableProps = {
  madrasas: MadrasaRow[];
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  planFilter: string;
  onPlanFilterChange: (value: string) => void;
  planOptions: SelectOption[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function MadrasasTable({
  madrasas,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  planFilter,
  onPlanFilterChange,
  planOptions,
  page,
  totalPages,
  onPageChange,
}: MadrasasTableProps) {
  const columns: Column<MadrasaRow>[] = [
    {
      key: "madrasa",
      header: "Madrasa",
      cell: (row) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{row.name}</p>
          <p className="truncate text-xs text-muted-foreground">{row.address}</p>
        </div>
      ),
    },
    {
      key: "admin",
      header: "Admin",
      cell: (row) => (
        <div>
          <p className="text-sm">{row.adminName}</p>
          <p className="text-xs text-muted-foreground">{row.adminEmail}</p>
        </div>
      ),
    },
    {
      key: "students",
      header: "Students",
      cell: (row) => row.studentCount.toLocaleString(),
    },
    {
      key: "plan",
      header: "Plan",
      cell: (row) => row.planName,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "joined",
      header: "Joined",
      cell: (row) => <DateDisplay date={row.joinedAt} />,
      className: "hidden lg:table-cell",
    },
    {
      key: "actions",
      header: "",
      className: "w-12",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" className="size-8">
                <MoreHorizontal className="size-4" />
                <span className="sr-only">Actions</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="size-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={madrasas}
      columns={columns}
      searchPlaceholder="Search by madrasa or admin…"
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
            { label: "Pending", value: "pending" },
            { label: "Inactive", value: "inactive" },
          ],
        },
        {
          key: "plan",
          label: "Plan",
          value: planFilter,
          onChange: onPlanFilterChange,
          options: planOptions,
        },
      ]}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      emptyTitle="No madrasas found"
      emptyDescription="Try adjusting your search or filters."
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium">{row.name}</p>
              <p className="text-sm text-muted-foreground">{row.adminName}</p>
            </div>
            <StatusBadge status={row.status} />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{row.planName}</span>
            <span>{row.studentCount.toLocaleString()} students</span>
          </div>
        </div>
      )}
    />
  );
}
