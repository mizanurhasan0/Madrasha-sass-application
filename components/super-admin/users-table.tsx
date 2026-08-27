"use client";

import { MoreHorizontal, Pencil } from "lucide-react";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { DateDisplay } from "@/components/common/format-display";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { roleLabels } from "@/config/roles";
import { formatPhone } from "@/lib/format";
import type { User } from "@/types/user";
import type { SelectOption } from "@/types/common";

export type UserRow = User & { madrasaName?: string };

type UsersTableProps = {
  users: UserRow[];
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function UsersTable({
  users,
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  page,
  totalPages,
  onPageChange,
}: UsersTableProps) {
  const roleOptions: SelectOption[] = Object.entries(roleLabels).map(
    ([value, label]) => ({ value, label })
  );

  const columns: Column<UserRow>[] = [
    {
      key: "user",
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.name} src={row.avatar} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (row) => formatPhone(row.phone),
      className: "hidden md:table-cell",
    },
    {
      key: "role",
      header: "Role",
      cell: (row) => roleLabels[row.role],
    },
    {
      key: "madrasa",
      header: "Madrasa",
      cell: (row) => row.madrasaName ?? "—",
      className: "hidden lg:table-cell",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "joined",
      header: "Joined",
      cell: (row) => <DateDisplay date={row.createdAt} />,
      className: "hidden xl:table-cell",
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
              <Pencil className="size-4" />
              Edit User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      searchPlaceholder="Search by name, email, or phone…"
      searchValue={search}
      onSearchChange={onSearchChange}
      filters={[
        {
          key: "role",
          label: "Role",
          value: roleFilter,
          onChange: onRoleFilterChange,
          options: roleOptions,
        },
        {
          key: "status",
          label: "Status",
          value: statusFilter,
          onChange: onStatusFilterChange,
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
        },
      ]}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      emptyTitle="No users found"
      emptyDescription="Try adjusting your search or filters."
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <UserAvatar name={row.name} src={row.avatar} size="sm" />
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{roleLabels[row.role]}</p>
              </div>
            </div>
            <StatusBadge status={row.status} />
          </div>
          <p className="text-sm text-muted-foreground">{row.email}</p>
        </div>
      )}
    />
  );
}
