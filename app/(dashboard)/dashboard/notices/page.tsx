"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { NoticesPageContent } from "@/components/notices/notices-page-content";
import { NoticesReadOnly } from "@/components/guardian/notices-read-only";

function NoticesContent() {
  const { role } = useAuth();

  if (role === "madrasa_admin") {
    return <NoticesPageContent />;
  }

  if (role === "teacher") {
    return <NoticesReadOnly audienceFilter={["everyone", "teachers"]} />;
  }

  return <NoticesReadOnly audienceFilter={["everyone", "guardians"]} />;
}

export default function NoticesPage() {
  return (
    <RoleGuard allowed={["madrasa_admin", "teacher", "guardian"]}>
      <NoticesContent />
    </RoleGuard>
  );
}
