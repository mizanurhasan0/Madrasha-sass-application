import type { PaginatedQuery, PaginatedResult } from "@/types/common";

export async function simulateLatency(ms = 300): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function paginate<T>(
  items: T[],
  query: PaginatedQuery = {}
): PaginatedResult<T> {
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;
  let filtered = [...items];

  if (query.search) {
    const search = query.search.toLowerCase();
    filtered = filtered.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search)
    );
  }

  if (query.sortBy) {
    const key = query.sortBy as keyof T;
    const order = query.sortOrder === "desc" ? -1 : 1;
    filtered.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal == null || bVal == null) return 0;
      if (aVal < bVal) return -1 * order;
      if (aVal > bVal) return 1 * order;
      return 0;
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, total, page, limit, totalPages };
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function success<T>(data: T, message?: string) {
  return { success: true as const, data, message };
}

export function failure(message: string) {
  return { success: false as const, data: null, message };
}
