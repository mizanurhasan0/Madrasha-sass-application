"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { ResultSearch } from "@/components/exams/result-search";
import { TeacherResultsView } from "@/components/teacher/teacher-results-view";

function ResultsContent() {
  const { role } = useAuth();

  if (role === "teacher") {
    return <TeacherResultsView />;
  }

  return <ResultSearch />;
}

export default function ResultsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin", "teacher"]}>
      <ResultsContent />
    </RoleGuard>
  );
}
