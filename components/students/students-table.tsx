"use client";

import Link from "next/link";
import { Eye, MoreHorizontal, Pencil, UserX } from "lucide-react";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { DateDisplay } from "@/components/common/format-display";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPhone, displayName } from "@/lib/format";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { StudentWithRelations } from "@/types/student";
import type { SelectOption } from "@/types/common";

type StudentsTableProps = {
  students: StudentWithRelations[];
  search: string;
  onSearchChange: (value: string) => void;
  classFilter: string;
  onClassFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  classOptions: SelectOption[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (student: StudentWithRelations) => void;
  onDeactivate: (student: StudentWithRelations) => void;
};

export function StudentsTable({
  students,
  search,
  onSearchChange,
  classFilter,
  onClassFilterChange,
  statusFilter,
  onStatusFilterChange,
  classOptions,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDeactivate,
}: StudentsTableProps) {
  const { locale } = useLocale();

  const columns: Column<StudentWithRelations>[] = [
    {
      key: "student",
      header: "Student",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={displayName(row, locale)} src={row.avatar} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{displayName(row, locale)}</p>
            {locale === "en" && row.nameBn && (
              <p className="truncate text-xs text-muted-foreground">{row.nameBn}</p>
            )}
            {locale === "bn" && row.name !== row.nameBn && (
              <p className="truncate text-xs text-muted-foreground">{row.name}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "studentId",
      header: "ID",
      cell: (row) => (
        <span className="font-mono text-sm text-muted-foreground">{row.studentId}</span>
      ),
    },
    {
      key: "class",
      header: "Class / Section",
      cell: (row) => (
        <div>
          <p className="text-sm">{row.className}</p>
          <p className="text-xs text-muted-foreground">Section {row.sectionName}</p>
        </div>
      ),
    },
    {
      key: "guardian",
      header: "Guardian",
      cell: (row) => (
        <div>
          <p className="text-sm">{row.guardianName}</p>
          <p className="text-xs text-muted-foreground">{formatPhone(row.guardianPhone)}</p>
        </div>
      ),
    },
    {
      key: "admission",
      header: "Admitted",
      cell: (row) => <DateDisplay date={row.admissionDate} />,
      className: "hidden lg:table-cell",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "",
      className: "w-12",
      cell: (row) => (
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
            <DropdownMenuItem render={<Link href={`/dashboard/students/${row.id}`} />}>
              <Eye className="size-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row)}>
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            {row.status === "active" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDeactivate(row)}>
                  <UserX className="size-4" />
                  Deactivate
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      data={students}
      columns={columns}
      searchPlaceholder="Search by name, ID, or guardian…"
      searchValue={search}
      onSearchChange={onSearchChange}
      filters={[
        {
          key: "class",
          label: "Class",
          options: classOptions,
          value: classFilter,
          onChange: onClassFilterChange,
        },
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
          value: statusFilter,
          onChange: onStatusFilterChange,
        },
      ]}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      emptyTitle="No students found"
      emptyDescription="Try adjusting your search or filters, or add a new student."
      mobileCard={(row) => (
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <UserAvatar name={displayName(row, locale)} src={row.avatar} size="sm" />
              <div>
                <p className="font-medium">{displayName(row, locale)}</p>
                <p className="font-mono text-xs text-muted-foreground">{row.studentId}</p>
              </div>
            </div>
            <StatusBadge status={row.status} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Class</p>
              <p>{row.className}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Section</p>
              <p>{row.sectionName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Guardian</p>
              <p>{row.guardianName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Admitted</p>
              <DateDisplay date={row.admissionDate} />
            </div>
          </div>
          <div className="flex gap-2 border-t pt-3">
            <Button variant="outline" size="sm" className="flex-1" render={<Link href={`/dashboard/students/${row.id}`} />}>
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(row)}>
              Edit
            </Button>
          </div>
        </div>
      )}
    />
  );
}
