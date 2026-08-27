"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { LoadingState } from "@/components/common/loading-state";
import { SuperAdminDashboard } from "@/components/dashboard/super-admin-dashboard";
import { MadrasaAdminDashboard } from "@/components/dashboard/madrasa-admin-dashboard";
import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard";
import { AccountantDashboard } from "@/components/dashboard/accountant-dashboard";
import { GuardianDashboard } from "@/components/dashboard/guardian-dashboard";

export default function DashboardPage() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState rows={6} />;
  }

  switch (role) {
    case "super_admin":
      return <SuperAdminDashboard />;
    case "madrasa_admin":
      return <MadrasaAdminDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "accountant":
      return <AccountantDashboard />;
    case "guardian":
      return <GuardianDashboard />;
    default:
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-medium">Welcome</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please sign in to view your dashboard.
          </p>
        </div>
      );
  }
}
