export type Status = "active" | "inactive" | "pending" | "suspended";

export type PaginatedQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiResult<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type SelectOption = {
  label: string;
  value: string;
};
