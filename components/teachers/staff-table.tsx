"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable, useTableState, type Column } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { teacherService } from "@/services/teacher.service";
import { formatPhone } from "@/lib/format";
import type { Staff } from "@/types/teacher";

export function StaffTable() {
  const { search, setSearch, page, setPage } = useTableState();
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const loadStaff = useCallback(async () => {
    setLoading(true);
    const result = await teacherService.getStaff({ page, limit: 10, search });
    if (result.success) {
      setStaff(result.data.data);
      setTotalPages(result.data.totalPages);
    }
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

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

  if (loading && staff.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <DataTable
      data={staff}
      columns={columns}
      searchValue={search}
      onSearchChange={(v) => {
        setSearch(v);
        setPage(1);
      }}
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
