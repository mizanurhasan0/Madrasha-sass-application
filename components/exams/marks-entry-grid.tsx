"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { TableSkeleton } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { examService } from "@/services/exam.service";
import { studentService } from "@/services/student.service";
import { classes, subjects } from "@/data/academic";
import type { Exam } from "@/types/exam";

type MarkCell = {
  obtainedMarks: number;
  totalMarks: number;
};

type MarksEntryGridProps = {
  examId: string;
};

export function MarksEntryGrid({ examId }: MarksEntryGridProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exam, setExam] = useState<Exam | null>(null);
  const [marks, setMarks] = useState<Record<string, Record<string, MarkCell>>>({});

  const classStudents = useMemo(() => {
    if (!exam) return [];
    return studentService.getAll().filter((s) => s.classId === exam.classId);
  }, [exam]);

  const classSubjects = useMemo(() => {
    if (!exam) return [];
    return subjects.filter((s) => s.classId === exam.classId);
  }, [exam]);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [examRes, marksRes] = await Promise.all([
      examService.getExamById(examId),
      examService.getMarks(examId),
    ]);

    if (!examRes.success || !examRes.data) {
      setLoading(false);
      return;
    }

    setExam(examRes.data);
    const students = studentService.getAll().filter((s) => s.classId === examRes.data!.classId);
    const subs = subjects.filter((s) => s.classId === examRes.data!.classId);
    const grid: Record<string, Record<string, MarkCell>> = {};

    for (const student of students) {
      grid[student.id] = {};
      for (const subject of subs) {
        const existing = marksRes.success
          ? marksRes.data.find(
              (m) => m.studentId === student.id && m.subjectId === subject.id
            )
          : undefined;
        grid[student.id][subject.id] = {
          obtainedMarks: existing?.obtainedMarks ?? 0,
          totalMarks: existing?.totalMarks ?? 100,
        };
      }
    }

    setMarks(grid);
    setLoading(false);
  }, [examId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateMark = (studentId: string, subjectId: string, field: keyof MarkCell, value: number) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectId]: {
          ...prev[studentId][subjectId],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    if (!exam) return;
    setSaving(true);

    const entries = classStudents.flatMap((student) =>
      classSubjects.map((subject) => ({
        examId: exam.id,
        studentId: student.id,
        subjectId: subject.id,
        obtainedMarks: marks[student.id]?.[subject.id]?.obtainedMarks ?? 0,
        totalMarks: marks[student.id]?.[subject.id]?.totalMarks ?? 100,
      }))
    );

    const res = await examService.saveMarks(entries);
    setSaving(false);

    if (res.success) {
      toast.success("Marks saved successfully");
    } else {
      toast.error("Failed to save marks");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <TableSkeleton rows={10} />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="space-y-4 text-center py-12">
        <p className="text-muted-foreground">Exam not found.</p>
        <Button variant="outline" render={<Link href="/dashboard/exams" />}>
          Back to Exams
        </Button>
      </div>
    );
  }

  const className = classes.find((c) => c.id === exam.classId)?.name ?? "—";

  return (
    <div className="space-y-6">
      <PageHeader
        title={exam.name}
        description={`${className} · Marks entry`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/dashboard/exams" />}
            >
              <ArrowLeft className="mr-1.5 size-4" />
              Back
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Save className="mr-1.5 size-4" />
              {saving ? "Saving..." : "Save Marks"}
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <StatusBadge status={exam.status} />
        <span>
          <DateDisplay date={exam.startDate} /> – <DateDisplay date={exam.endDate} />
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 z-10 min-w-[160px] bg-muted/80 backdrop-blur">
                Student
              </TableHead>
              {classSubjects.map((subject) => (
                <TableHead key={subject.id} className="min-w-[120px] text-center">
                  {subject.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {classStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="sticky left-0 z-10 bg-card font-medium">
                  <div>
                    <p>{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.studentId}</p>
                  </div>
                </TableCell>
                {classSubjects.map((subject) => {
                  const cell = marks[student.id]?.[subject.id] ?? {
                    obtainedMarks: 0,
                    totalMarks: 100,
                  };
                  return (
                    <TableCell key={subject.id} className="p-2">
                      <div className="flex items-center justify-center gap-1">
                        <Input
                          type="number"
                          min={0}
                          max={cell.totalMarks}
                          value={cell.obtainedMarks || ""}
                          onChange={(e) =>
                            updateMark(
                              student.id,
                              subject.id,
                              "obtainedMarks",
                              Number(e.target.value) || 0
                            )
                          }
                          className="h-8 w-14 text-center tabular-nums"
                        />
                        <span className="text-xs text-muted-foreground">/</span>
                        <Input
                          type="number"
                          min={1}
                          value={cell.totalMarks || ""}
                          onChange={(e) =>
                            updateMark(
                              student.id,
                              subject.id,
                              "totalMarks",
                              Number(e.target.value) || 100
                            )
                          }
                          className="h-8 w-14 text-center tabular-nums"
                        />
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {classStudents.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No students enrolled in this class.
        </p>
      )}
    </div>
  );
}
