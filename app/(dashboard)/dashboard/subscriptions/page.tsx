"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { TableSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { SubscriptionsTable } from "@/components/super-admin/subscriptions-table";
import { madrasaService } from "@/services/madrasa.service";
import type { Subscription, SubscriptionPlan } from "@/types/madrasa";

const PAGE_SIZE = 10;

export default function SubscriptionsPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <SubscriptionsPageContent />
    </RoleGuard>
  );
}

function SubscriptionsPageContent() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const madrasaMap = useMemo(() => {
    const map = new Map<string, string>();
    madrasaService.getAllMadrasas().forEach((m) => map.set(m.id, m.name));
    return map;
  }, []);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [subsRes, plansRes] = await Promise.all([
        madrasaService.getSubscriptions(),
        madrasaService.getPlans(),
      ]);

      if (subsRes.success && plansRes.success) {
        setSubscriptions(subsRes.data);
        setPlans(plansRes.data);
      } else {
        setError("Failed to load subscriptions");
      }
    } catch {
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const planMap = useMemo(() => {
    const map = new Map<string, string>();
    plans.forEach((p) => map.set(p.id, p.name));
    return map;
  }, [plans]);

  const rows = useMemo(() => {
    let data = subscriptions.map((sub) => ({
      ...sub,
      madrasaName: madrasaMap.get(sub.madrasaId) ?? "Unknown",
      planName: planMap.get(sub.planId) ?? "Unknown",
    }));

    if (statusFilter !== "all") {
      data = data.filter((sub) => sub.status === statusFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (sub) =>
          sub.madrasaName.toLowerCase().includes(q) ||
          sub.planName.toLowerCase().includes(q)
      );
    }

    return data;
  }, [subscriptions, madrasaMap, planMap, statusFilter, search]);

  const totalPages = Math.ceil(rows.length / PAGE_SIZE) || 1;
  const paginatedRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscriptions"
        description={`Manage madrasa subscription plans — ${subscriptions.length} total`}
      />

      {error ? (
        <ErrorState message={error} onRetry={fetchSubscriptions} />
      ) : loading ? (
        <TableSkeleton rows={8} />
      ) : (
        <SubscriptionsTable
          subscriptions={paginatedRows}
          search={search}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
