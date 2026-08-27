"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { CardSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { PlanCards } from "@/components/super-admin/plan-cards";
import { madrasaService } from "@/services/madrasa.service";
import type { Subscription, SubscriptionPlan } from "@/types/madrasa";

export default function PlansPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <PlansPageContent />
    </RoleGuard>
  );
}

function PlansPageContent() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [plansRes, subsRes] = await Promise.all([
        madrasaService.getPlans(),
        madrasaService.getSubscriptions(),
      ]);

      if (plansRes.success && subsRes.success) {
        setPlans(plansRes.data);
        setSubscriptions(subsRes.data);
      } else {
        setError("Failed to load subscription plans");
      }
    } catch {
      setError("Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const activeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    subscriptions
      .filter((sub) => sub.status === "active")
      .forEach((sub) => {
        counts[sub.planId] = (counts[sub.planId] ?? 0) + 1;
      });
    return counts;
  }, [subscriptions]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription Plans"
        description="Available plans for madrasas on the platform."
      />

      {error ? (
        <ErrorState message={error} onRetry={fetchPlans} />
      ) : loading ? (
        <CardSkeleton count={3} />
      ) : (
        <PlanCards plans={plans} activeCounts={activeCounts} />
      )}
    </div>
  );
}
