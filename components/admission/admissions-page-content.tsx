"use client";

import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { DataTable, type Column } from "@/components/common/data-table";
import { TableSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { useResourceList } from "@/hooks/use-resource-list";
import { admissionService } from "@/services/admission.service";
import { ADMISSION_STATUS_OPTIONS } from "@/lib/admission/constants";
import { AdmissionStatusSelect } from "@/components/admission/admission-status-select";
import type { AdmissionApplication, AdmissionStatus } from "@/types/admission";

export function AdmissionsPageContent() {
  const list = useResourceList<AdmissionApplication, { status: AdmissionStatus | "all" }>({
    fetchFn: ({ page, limit, search, status }) =>
      admissionService.getApplications({ page, limit, search: search || undefined, status }),
    initialFilters: { status: "all" },
    errorMessage: "Failed to load applications",
  });

  const updateStatus = useCallback(
    async (id: string, status: AdmissionStatus) => {
      const res = await admissionService.updateStatus(id, status);
      if (res.success) {
        toast.success(`Application marked as ${status}`);
        list.refetch();
      } else {
        toast.error("Failed to update status");
      }
    },
    [list]
  );

  const columns = useMemo<Column<AdmissionApplication>[]>(
    () => [
      {
        key: "applicationNo",
        header: "Application ID",
        cell: (row) => <span className="font-mono text-sm">{row.applicationNo}</span>,
      },
      { key: "student", header: "Student", cell: (row) => row.studentName },
      { key: "program", header: "Program", cell: (row) => row.className },
      {
        key: "guardian",
        header: "Guardian",
        cell: (row) => (
          <div>
            <p>{row.guardianName}</p>
            <p className="text-xs text-muted-foreground">{row.guardianPhone}</p>
          </div>
        ),
      },
      {
        key: "submitted",
        header: "Submitted",
        cell: (row) => <DateDisplay date={row.submittedAt.split("T")[0]} />,
      },
      {
        key: "status",
        header: "Status",
        cell: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: "actions",
        header: "Actions",
        className: "text-right",
        cell: (row) => (
          <AdmissionStatusSelect
            value={row.status}
            onChange={(status) => status !== "all" && updateStatus(row.id, status)}
            className="ml-auto"
          />
        ),
      },
    ],
    [updateStatus]
  );

  if (list.error) {
    return <ErrorState message={list.error} onRetry={list.refetch} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admission Applications"
        description="Review and manage online admission submissions."
      />

      {list.isInitialLoad ? (
        <TableSkeleton rows={8} />
      ) : (
        <DataTable
          data={list.data}
          columns={columns}
          searchValue={list.search}
          onSearchChange={list.setSearch}
          searchPlaceholder="Search by name, ID, phone..."
          filters={[
            {
              key: "status",
              label: "Status",
              value: list.filters.status,
              onChange: (value) => list.setFilter("status", value),
              options: ADMISSION_STATUS_OPTIONS.map((o) => ({
                label: o.label,
                value: o.value,
              })),
            },
          ]}
          page={list.page}
          totalPages={list.totalPages}
          onPageChange={list.setPage}
          emptyTitle="No applications yet"
          emptyDescription="Online submissions will appear here after parents apply at /admission."
          mobileCard={(row) => (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-medium">{row.applicationNo}</p>
                  <p className="font-medium">{row.studentName}</p>
                  <p className="text-sm text-muted-foreground">{row.className}</p>
                </div>
                <StatusBadge status={row.status} />
              </div>
              <AdmissionStatusSelect
                value={row.status}
                onChange={(status) => status !== "all" && updateStatus(row.id, status)}
                className="w-full"
              />
            </div>
          )}
        />
      )}
    </div>
  );
}
