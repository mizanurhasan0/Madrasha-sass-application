import type { PaginatedQuery } from "@/types/common";
import {
  madrasas as initialMadrasas,
  subscriptions as initialSubscriptions,
  subscriptionPlans,
  dashboardMetrics,
} from "@/data/madrasas";
import { payments } from "@/data/payments";
import { paginate, simulateLatency, success } from "./base.service";

export const madrasaService = {
  async getMadrasas(query?: PaginatedQuery) {
    await simulateLatency();
    return success(
      paginate(initialMadrasas, query, {
        searchKeys: ["name", "slug", "address", "adminName", "adminEmail"],
      })
    );
  },

  async getSubscriptions() {
    await simulateLatency();
    return success(initialSubscriptions);
  },

  async getPlans() {
    await simulateLatency();
    return success(subscriptionPlans);
  },

  async getSuperAdminMetrics() {
    await simulateLatency();
    return success(dashboardMetrics.superAdmin);
  },

  async getMadrasaAdminMetrics() {
    await simulateLatency();
    return success(dashboardMetrics.madrasaAdmin);
  },

  async getRecentPayments(limit = 5) {
    await simulateLatency();
    return success(payments.slice(0, limit));
  },

  async getPayments(query?: PaginatedQuery) {
    await simulateLatency();
    return success(
      paginate(payments, query, { searchKeys: ["invoiceNo", "studentId"] })
    );
  },

  getAllMadrasas() {
    return initialMadrasas;
  },
};
