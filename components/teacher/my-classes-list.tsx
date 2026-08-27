"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { CardSkeleton } from "@/components/common/loading-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teacherService } from "@/services/teacher.service";
import { studentService } from "@/services/student.service";
import { academicService } from "@/services/academic.service";

type ClassSummary = {
  id: string;
  name: string;
  studentCount: number;
  subjects: string[];
};

export function MyClassesList() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<ClassSummary[]>([]);

  const teacher = useMemo(
    () => teacherService.getAll().find((t) => t.email === user?.email),
    [user?.email]
  );

  useEffect(() => {
    if (!teacher) {
      setLoading(false);
      return;
    }

    const classMap = new Map(academicService.getAllClasses().map((c) => [c.id, c.name]));
    const students = studentService
      .getAll()
      .filter((s) => teacher.classIds.includes(s.classId));

    setClasses(
      teacher.classIds.map((id) => ({
        id,
        name: classMap.get(id) ?? id,
        studentCount: students.filter((s) => s.classId === id).length,
        subjects: teacher.subjects,
      }))
    );
    setLoading(false);
  }, [teacher]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Classes" description="Classes assigned to you." />
        <CardSkeleton count={3} />
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Classes" description="Classes assigned to you." />
        <EmptyState
          title="Teacher profile not found"
          description="Your account is not linked to a teacher record."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Classes"
        description={`${classes.length} class${classes.length === 1 ? "" : "es"} assigned to ${teacher.name}.`}
      />

      {classes.length === 0 ? (
        <EmptyState
          title="No classes assigned"
          description="Contact the madrasa admin to get class assignments."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Card key={cls.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="size-5 text-primary" />
                  {cls.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  <span>{cls.studentCount} students</span>
                </div>
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <GraduationCap className="size-3.5" />
                    Subjects
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
