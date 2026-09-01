"use client";

import { useCallback, useEffect, useState } from "react";
import type { PaginatedResult } from "@/types/common";

type FetchResult<T> = {
  success: boolean;
  data?: PaginatedResult<T>;
  message?: string;
};

type UseResourceListOptions<T, F extends Record<string, string> = Record<string, string>> = {
  fetchFn: (params: { page: number; limit: number; search?: string } & F) => Promise<FetchResult<T>>;
  limit?: number;
  debounceMs?: number;
  initialFilters?: F;
  refreshKey?: number;
  enabled?: boolean;
  errorMessage?: string;
};

export function useResourceList<T, F extends Record<string, string> = Record<string, string>>({
  fetchFn,
  limit = 10,
  debounceMs = 300,
  initialFilters,
  refreshKey = 0,
  enabled = true,
  errorMessage = "Failed to load data",
}: UseResourceListOptions<T, F>) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearchState] = useState("");
  const [page, setPageState] = useState(1);
  const [filters, setFiltersState] = useState<F>((initialFilters ?? {}) as F);

  const refetch = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn({
        page,
        limit,
        search: search || undefined,
        ...filters,
      } as { page: number; limit: number; search?: string } & F);

      if (result.success && result.data) {
        setData(result.data.data);
        setTotal(result.data.total);
        setTotalPages(result.data.totalPages);
      } else {
        setError(result.message ?? errorMessage);
      }
    } catch {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [enabled, fetchFn, page, limit, search, filters, errorMessage, refreshKey]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const delay = search ? debounceMs : 0;
    const timer = setTimeout(refetch, delay);
    return () => clearTimeout(timer);
  }, [refetch, search, debounceMs, enabled]);

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    setPageState(1);
  }, []);

  const setPage = useCallback((value: number) => {
    setPageState(value);
  }, []);

  const setFilter = useCallback((key: keyof F & string, value: string) => {
    setFiltersState((prev) => ({ ...prev, [key]: value }));
    setPageState(1);
  }, []);

  const setFilters = useCallback((next: Partial<F>) => {
    setFiltersState((prev) => ({ ...prev, ...next }));
    setPageState(1);
  }, []);

  return {
    data,
    total,
    totalPages,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    filters,
    setFilter,
    setFilters,
    refetch,
    isEmpty: !loading && data.length === 0,
    isInitialLoad: loading && data.length === 0,
    refreshKey,
  };
}
