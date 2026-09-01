"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { UsersTable } from "@/components/super-admin/users-table";
import { mockUsers } from "@/data/users";
import { madrasaService } from "@/services/madrasa.service";

const PAGE_SIZE = 10;

export function UsersPageContent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const madrasaMap = useMemo(() => {
    const map = new Map<string, string>();
    madrasaService.getAllMadrasas().forEach((m) => map.set(m.id, m.name));
    return map;
  }, []);

  const rows = useMemo(() => {
    let data = mockUsers.map((user) => ({
      ...user,
      madrasaName: user.madrasaId ? madrasaMap.get(user.madrasaId) : undefined,
    }));

    if (roleFilter !== "all") {
      data = data.filter((user) => user.role === roleFilter);
    }

    if (statusFilter !== "all") {
      data = data.filter((user) => user.status === statusFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (user) =>
          user.name.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q) ||
          user.phone.includes(q)
      );
    }

    return data;
  }, [madrasaMap, roleFilter, statusFilter, search]);

  const totalPages = Math.ceil(rows.length / PAGE_SIZE) || 1;
  const paginatedRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description={`Manage platform users — ${mockUsers.length} total`}
      />

      <UsersTable
        users={paginatedRows}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        roleFilter={roleFilter}
        onRoleFilterChange={(value) => {
          setRoleFilter(value);
          setPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
