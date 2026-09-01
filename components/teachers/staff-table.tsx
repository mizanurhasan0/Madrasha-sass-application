"use client";

import { DataTable, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { useResourceList } from "@/hooks/use-resource-list";
import { teacherService } from "@/services/teacher.service";
import { formatPhone } from "@/lib/format";
import type { Staff } from "@/types/teacher";

export function StaffTable() {
  const { data: staff, search, setSearch, page, setPage, totalPages, isInitialLoad } =
    useResourceList({
      fetchFn: (params) => teacherService.getStaff(params),
    });

  const columns: Column<Staff>[] = [
    {
      key: "name",
      header: "Staff Member",
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
      key: "department",
      header: "Department",
      cell: (row) => (
        <Badge variant="secondary" className="text-xs">
          {row.department}
        </Badge>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (row) => formatPhone(row.phone),
      className: "hidden md:table-cell",
    },
    {
      key: "joiningDate",
      header: "Joined",
      cell: (row) => <DateDisplay date={row.joiningDate} />,
      className: "hidden lg:table-cell",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (isInitialLoad) {
    return <TableSkeleton />;
  }

  return (
    <DataTable
      data={staff}
      columns={columns}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search staff..."
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      emptyTitle="No staff found"
      emptyDescription="No staff members match your search."
      mobileCard={(row) => (
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <UserAvatar name={row.name} src={row.avatar} size="sm" />
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.designation}</p>
              </div>
            </div>
            <StatusBadge status={row.status} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Badge variant="secondary">{row.department}</Badge>
            <span className="text-muted-foreground">{formatPhone(row.phone)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Joined <DateDisplay date={row.joiningDate} />
          </p>
        </div>
      )}
    />
  );
}
