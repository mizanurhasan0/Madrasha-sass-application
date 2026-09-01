"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { NoticesPageContent } from "@/components/notices/notices-page-content";
import { NoticesReadOnly } from "@/components/guardian/notices-read-only";

export function NoticesRoleRouter() {
  const { role } = useAuth();

  if (role === "madrasa_admin") {
    return <NoticesPageContent />;
  }

  if (role === "teacher") {
    return <NoticesReadOnly audienceFilter={["everyone", "teachers"]} />;
  }

  return <NoticesReadOnly audienceFilter={["everyone", "guardians"]} />;
}
