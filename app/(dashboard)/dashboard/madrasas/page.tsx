"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { TableSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { MadrasasTable } from "@/components/super-admin/madrasas-table";
import { madrasaService } from "@/services/madrasa.service";
import type { SubscriptionPlan } from "@/types/madrasa";

export default function MadrasasPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <MadrasasPageContent />
    </RoleGuard>
  );
}

function MadrasasPageContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [madrasas, setMadrasas] = useState<
    Awaited<ReturnType<typeof madrasaService.getMadrasas>>["data"] | null
  >(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const fetchMadrasas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [madrasasRes, plansRes] = await Promise.all([
        madrasaService.getMadrasas({
          page,
          limit: 10,
          search: search || undefined,
        }),
        madrasaService.getPlans(),
      ]);

      if (madrasasRes.success && plansRes.success) {
        setMadrasas(madrasasRes.data);
        setPlans(plansRes.data);
      } else {
        setError("Failed to load madrasas");
      }
    } catch {
      setError("Failed to load madrasas");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(fetchMadrasas, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchMadrasas, search]);

  const planMap = useMemo(() => {
    const map = new Map<string, string>();
    plans.forEach((p) => map.set(p.id, p.name));
    return map;
  }, [plans]);

  const planOptions = useMemo(
    () => plans.map((p) => ({ label: p.name, value: p.id })),
    [plans]
  );

  const rows = useMemo(() => {
    if (!madrasas) return [];
    let data = madrasas.data.map((m) => ({
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
  }, [madrasas, planMap, statusFilter, planFilter]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePlanFilterChange = (value: string) => {
    setPlanFilter(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Madrasas"
        description={
          madrasas
            ? `Manage all registered madrasas — ${madrasas.total} total`
            : "Manage all registered madrasas on the platform."
        }
      />

      {error ? (
        <ErrorState message={error} onRetry={fetchMadrasas} />
      ) : loading && !madrasas ? (
        <TableSkeleton rows={8} />
      ) : (
        <MadrasasTable
          madrasas={rows}
          search={search}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          planFilter={planFilter}
          onPlanFilterChange={handlePlanFilterChange}
          planOptions={planOptions}
          page={page}
          totalPages={madrasas?.totalPages ?? 1}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
