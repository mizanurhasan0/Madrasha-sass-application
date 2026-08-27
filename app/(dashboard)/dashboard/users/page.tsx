"use client";

import { useMemo, useState } from "react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { UsersTable } from "@/components/super-admin/users-table";
import { mockUsers } from "@/data/users";
import { madrasaService } from "@/services/madrasa.service";

const PAGE_SIZE = 10;

export default function UsersPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <UsersPageContent />
    </RoleGuard>
  );
}

function UsersPageContent() {
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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description={`Manage platform users — ${mockUsers.length} total`}
      />

      <UsersTable
        users={paginatedRows}
        search={search}
        onSearchChange={handleSearchChange}
        roleFilter={roleFilter}
        onRoleFilterChange={handleRoleFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
