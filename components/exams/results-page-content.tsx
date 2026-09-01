"use client";

import { useAuth } from "@/lib/auth/auth-provider";
import { ResultSearch } from "@/components/exams/result-search";
import { TeacherResultsView } from "@/components/teacher/teacher-results-view";

export function ResultsPageContent() {
  const { role } = useAuth();

  if (role === "teacher") {
    return <TeacherResultsView />;
  }

  return <ResultSearch />;
}
