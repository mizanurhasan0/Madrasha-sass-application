"use client";

import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { AcademicNav } from "@/components/academics/academic-nav";
import { SessionsTable } from "@/components/academics/sessions-table";

export default function SessionsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <div className="space-y-6">
        <PageHeader
          title="Academic Management"
          description="Manage classes, sections, subjects, and academic sessions."
        />

        <AcademicNav />

        <SessionsTable />
      </div>
    </RoleGuard>
  );
}
