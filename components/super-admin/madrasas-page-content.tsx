"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { TableSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { MadrasasTable } from "@/components/super-admin/madrasas-table";
import { useResourceList } from "@/hooks/use-resource-list";
import { madrasaService } from "@/services/madrasa.service";
import type { Madrasa, SubscriptionPlan } from "@/types/madrasa";

export function MadrasasPageContent() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  const {
    data: madrasaRows,
    total,
    totalPages,
    error,
    search,
    setSearch,
    page,
    setPage,
    filters,
    setFilter,
    refetch,
    isInitialLoad,
  } = useResourceList<Madrasa, { status: string; planId: string }>({
    fetchFn: ({ page, limit, search }) =>
      madrasaService.getMadrasas({
        page,
        limit,
        search: search || undefined,
      }),
    initialFilters: { status: "all", planId: "all" },
    errorMessage: "Failed to load madrasas",
  });

  useEffect(() => {
    madrasaService.getPlans().then((res) => {
      if (res.success) setPlans(res.data);
    });
  }, []);

  const planMap = useMemo(() => {
    const map = new Map<string, string>();
    plans.forEach((p) => map.set(p.id, p.name));
    return map;
  }, [plans]);

  const planOptions = useMemo(
    () => plans.map((p) => ({ label: p.name, value: p.id })),
    [plans]
  );

  const statusFilter = filters.status ?? "all";
  const planFilter = filters.planId ?? "all";

  const rows = useMemo(() => {
    let data = madrasaRows.map((m) => ({
      ...m,
      planName: planMap.get(m.planId) ?? "Unknown",
    }));
    if (statusFilter !== "all") {
      data = data.filter((m) => m.status === statusFilter);
    }
    if (planFilter !== "all") {
      data = data.filter((m) => m.planId === planFilter);
    }
    return data;
  }, [madrasaRows, planMap, statusFilter, planFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Madrasas"
        description={
          total > 0
            ? `Manage all registered madrasas — ${total} total`
            : "Manage all registered madrasas on the platform."
        }
      />

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : isInitialLoad ? (
        <TableSkeleton rows={8} />
      ) : (
        <MadrasasTable
          madrasas={rows}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={(v) => setFilter("status", v)}
          planFilter={planFilter}
          onPlanFilterChange={(v) => setFilter("planId", v)}
          planOptions={planOptions}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
