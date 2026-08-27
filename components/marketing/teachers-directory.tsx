"use client";

import { useMemo, useState } from "react";
import type { Teacher } from "@/types/teacher";
import { EmptyState } from "@/components/common/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useT } from "@/lib/i18n/locale-provider";
import { Reveal, wowStaggerDelay } from "./reveal";

type TeachersDirectoryProps = {
  teachers: Teacher[];
};

export function TeachersDirectory({ teachers }: TeachersDirectoryProps) {
  const t = useT();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return teachers;
    return teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(q) ||
        teacher.designation.toLowerCase().includes(q) ||
        teacher.subjects.some((s) => s.toLowerCase().includes(q))
    );
  }, [teachers, search]);

  return (
    <div>
      <Input
        placeholder={t("teachersPage.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 max-w-md"
      />
      {filtered.length === 0 ? (
        <EmptyState title={t("common.noTeachers")} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((teacher, i) => (
            <Reveal key={teacher.id} delay={wowStaggerDelay(i)}>
              <Card className="h-full border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle>{teacher.name}</CardTitle>
                  <CardDescription>{teacher.designation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  {teacher.bio && (
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{teacher.bio}</p>
                  )}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
