"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchInput } from "./search-input";
import { FilterDropdown } from "./filter-dropdown";
import { Pagination } from "./pagination";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types/common";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  filters?: {
    key: string;
    label: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  mobileCard?: (row: T) => React.ReactNode;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = "Search...",
  filters,
  page = 1,
  totalPages = 1,
  onPageChange,
  searchValue = "",
  onSearchChange,
  emptyTitle,
  emptyDescription,
  className,
  mobileCard,
}: DataTableProps<T>) {
  return (
    <div className={cn("space-y-4", className)}>
      {(onSearchChange || filters) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          {onSearchChange && (
            <SearchInput
              value={searchValue}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
              className="flex-1"
            />
          )}
          {filters?.map((f) => (
            <FilterDropdown
              key={f.key}
              label={f.label}
              value={f.value}
              onChange={f.onChange}
              options={f.options}
            />
          ))}
        </div>
      )}

      {data.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-xl border md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col.key} className={col.className}>
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          {mobileCard && (
            <div className="space-y-3 md:hidden">
              {data.map((row) => (
                <div key={row.id} className="rounded-xl border bg-card p-4">
                  {mobileCard(row)}
                </div>
              ))}
            </div>
          )}

          {onPageChange && (
            <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
          )}
        </>
      )}
    </div>
  );
}

export function useTableState(initialLimit = 10) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return { search, setSearch, page, setPage, filters, setFilter };
}
