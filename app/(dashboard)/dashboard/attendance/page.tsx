"use client";

import { Suspense } from "react";
import { PageHeader } from "@/components/common/page-header";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { AttendanceMarking } from "@/components/attendance/attendance-marking";
import { AttendanceReports } from "@/components/attendance/attendance-reports";
import { GuardianAttendanceView } from "@/components/guardian/guardian-attendance-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth/auth-provider";

function AttendanceContent() {
  const { role } = useAuth();

  if (role === "guardian") {
    return (
      <Suspense fallback={null}>
        <GuardianAttendanceView />
      </Suspense>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Mark daily attendance and view reports."
      />

      <Tabs defaultValue="marking">
        <TabsList>
          <TabsTrigger value="marking">Mark Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="marking" className="mt-4">
          <AttendanceMarking />
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <AttendanceReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AttendancePage() {
  return (
    <RoleGuard allowed={["madrasa_admin", "teacher", "guardian"]}>
      <AttendanceContent />
    </RoleGuard>
  );
}
