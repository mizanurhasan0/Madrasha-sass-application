"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-provider";
import { LoadingState } from "@/components/common/loading-state";
import type { UserRole } from "@/types/user";

type RoleGuardProps = {
  allowed: UserRole[];
  children: React.ReactNode;
};

export function RoleGuard({ allowed, children }: RoleGuardProps) {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role && !allowed.includes(role)) {
      router.replace("/dashboard");
    }
  }, [role, isLoading, allowed, router]);

  if (isLoading) {
    return <LoadingState rows={4} />;
  }

  if (!role || !allowed.includes(role)) {
    return <LoadingState rows={4} />;
  }

  return <>{children}</>;
}
