"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Printer } from "lucide-react";
import Link from "next/link";
import { PublicServiceLayout } from "@/components/public/public-service-layout";
import { LookupPanel } from "@/components/public/lookup-panel";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResultCard } from "@/components/exams/result-card";
import { examService } from "@/services/exam.service";
import { studentService } from "@/services/student.service";
import { exams } from "@/data/exams";
import type { StudentResult } from "@/types/exam";
import type { StudentWithRelations } from "@/types/student";

export function PublicResultCheck() {
  const [query, setQuery] = useState("");
  const [student, setStudent] = useState<StudentWithRelations | null>(null);
  const [examId, setExamId] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const completedExams = useMemo(() => exams.filter((e) => e.status === "completed"), []);

  const lookupStudent = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = studentService.getAll().find(
      (s) =>
        s.studentId.toLowerCase() === q ||
        s.id.toLowerCase() === q ||
        s.name.toLowerCase().includes(q)
    );
    if (match) {
      setStudent(match);
      setError(null);
    } else {
      setStudent(null);
      setExamId("");
      setResult(null);
      setError("No student found with this ID or roll number.");
    }
  };

  const fetchResult = useCallback(async () => {
    if (!student || !examId) return;
    setLoading(true);
    setError(null);
    const res = await examService.getStudentResultPublic(student.id, examId);
    if (res.success && res.data) {
      setResult({ ...res.data, className: student.className });
    } else {
      setResult(null);
      setError(res.message ?? "Result not found for this student and exam.");
    }
    setLoading(false);
  }, [student, examId]);

  useEffect(() => {
    if (student && examId) void fetchResult();
  }, [student, examId, fetchResult]);

  return (
    <PublicServiceLayout
      eyebrow="Quick Services"
      title="Check Result"
      description="Enter student ID or roll number and select an exam to view published results."
      maxWidth="xl"
    >
      <div className="grid gap-6 md:grid-cols-2 print:hidden">
        <div className="space-y-3">
          <LookupPanel
            id="studentId"
            label="Student ID / Roll"
            placeholder="e.g. AN-0001"
            value={query}
            onChange={setQuery}
            onSubmit={lookupStudent}
          />
          {student && (
            <div className="rounded-lg bg-status-success-bg px-4 py-3 text-sm">
              <p className="font-medium">{student.name}</p>
              <p className="text-muted-foreground">
                {student.studentId} · {student.className}
              </p>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Label>Select Exam</Label>
          <Select value={examId} onValueChange={(v) => v && setExamId(v)} disabled={!student}>
            <SelectTrigger>
              <SelectValue placeholder="Choose examination" />
            </SelectTrigger>
            <SelectContent>
              {completedExams.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>
                  {exam.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && <LoadingState rows={6} />}
      {error && !loading && <EmptyState title="No result found" description={error} />}

      {result && student && !loading && (
        <>
          <div className="flex justify-end print:hidden">
            <Button onClick={() => window.print()}>
              <Printer className="mr-1.5 size-4" />
              Print Result
            </Button>
          </div>
          <ResultCard
            ref={printRef}
            result={result}
            studentName={student.name}
            studentId={student.studentId}
          />
        </>
      )}

      <p className="text-center text-sm text-muted-foreground print:hidden">
        Questions?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Contact us
        </Link>
      </p>
    </PublicServiceLayout>
  );
}
