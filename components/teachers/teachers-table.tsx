"use client";

import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useResourceList } from "@/hooks/use-resource-list";
import { teacherService } from "@/services/teacher.service";
import { academicService } from "@/services/academic.service";
import { formatPhone } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Teacher } from "@/types/teacher";

type TeachersTableProps = {
  onEdit?: (teacher: Teacher) => void;
  refreshKey?: number;
};

export function TeachersTable({ onEdit, refreshKey = 0 }: TeachersTableProps) {
  const { data: teachers, search, setSearch, page, setPage, totalPages, isInitialLoad } =
    useResourceList({
      fetchFn: (params) => teacherService.getTeachers(params),
      refreshKey,
    });

  const classMap = new Map(academicService.getAllClasses().map((c) => [c.id, c.name]));

  const columns: Column<Teacher>[] = [
    {
      key: "name",
      header: "Teacher",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.name} src={row.avatar} size="sm" />
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      cell: (row) => row.designation,
    },
    {
      key: "subjects",
      header: "Subjects",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.subjects.slice(0, 2).map((s) => (
            <Badge key={s} variant="secondary" className="text-xs">
              {s}
            </Badge>
          ))}
          {row.subjects.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{row.subjects.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (row) => formatPhone(row.phone),
      className: "hidden lg:table-cell",
    },
    {
      key: "joiningDate",
      header: "Joined",
      cell: (row) => <DateDisplay date={row.joiningDate} />,
      className: "hidden md:table-cell",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "actions",
      header: "",
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/dashboard/teachers/${row.id}`}
            className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          >
            <Eye className="size-4" />
            <span className="sr-only">View profile</span>
          </Link>
          {onEdit && (
            <Button variant="ghost" size="icon-sm" onClick={() => onEdit(row)}>
              <Pencil className="size-4" />
              <span className="sr-only">Edit teacher</span>
            </Button>
          )}
        </div>
      ),
      className: "w-[80px]",
    },
  ];

  if (isInitialLoad) {
    return <TableSkeleton />;
  }

  return (
    <DataTable
      data={teachers}
      columns={columns}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search teachers..."
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      emptyTitle="No teachers found"
      emptyDescription="Add a new teacher to get started."
      mobileCard={(row) => (
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <UserAvatar name={row.name} src={row.avatar} size="sm" />
              <div>
                <Link
                  href={`/dashboard/teachers/${row.id}`}
                  className="font-medium hover:underline"
                >
                  {row.name}
                </Link>
                <p className="text-xs text-muted-foreground">{row.designation}</p>
              </div>
            </div>
            <StatusBadge status={row.status} />
          </div>
          <div className="flex flex-wrap gap-1">
            {row.subjects.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPhone(row.phone)}</span>
            <DateDisplay date={row.joiningDate} />
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/teachers/${row.id}`}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}
            >
              View Profile
            </Link>
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(row)}>
                Edit
              </Button>
            )}
          </div>
        </div>
      )}
    />
  );
}
