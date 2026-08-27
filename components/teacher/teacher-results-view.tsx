"use client";

import { useMemo } from "react";
import { useAuth } from "@/lib/auth/auth-provider";
import { EmptyState } from "@/components/common/empty-state";
import { ResultSearch } from "@/components/exams/result-search";
import { teacherService } from "@/services/teacher.service";
import { studentService } from "@/services/student.service";

export function TeacherResultsView() {
  const { user } = useAuth();

  const teacher = useMemo(
    () => teacherService.getAll().find((t) => t.email === user?.email),
    [user?.email]
  );

  const students = useMemo(() => {
    if (!teacher) return [];
    return studentService.getAll().filter((s) => teacher.classIds.includes(s.classId));
  }, [teacher]);

  if (!teacher) {
    return (
      <EmptyState
        title="Teacher profile not found"
        description="Your account is not linked to a teacher record."
      />
    );
  }

  return (
    <ResultSearch
      students={students}
      title="Student Results"
      description="View examination results for students in your classes."
    />
  );
}
