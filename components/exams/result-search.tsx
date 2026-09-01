"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Printer, Search } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { SearchInput } from "@/components/common/search-input";
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
import type { Exam } from "@/types/exam";
import type { StudentResult } from "@/types/exam";
import type { StudentWithRelations } from "@/types/student";

type ResultSearchProps = {
  students?: StudentWithRelations[];
  title?: string;
  description?: string;
};

export function ResultSearch({
  students: studentsProp,
  title = "Student Results",
  description = "Search for a student and view their examination results.",
}: ResultSearchProps) {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentWithRelations | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [result, setResult] = useState<StudentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const allStudents = useMemo(
    () => studentsProp ?? studentService.getAll(),
    [studentsProp]
  );

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allStudents
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [search, allStudents]);

  useEffect(() => {
    examService.getExams({ limit: 50 }).then((res) => {
      if (res.success) {
        const completed = res.data.data.filter((e) => e.status === "completed");
        setExams(completed.length > 0 ? completed : res.data.data);
      }
    });
  }, []);

  const fetchResult = useCallback(async () => {
    if (!selectedStudent || !selectedExamId) return;
    setLoading(true);
    setShowResults(true);
    const res = await examService.getStudentResult(selectedStudent.id, selectedExamId);
    if (res.success && res.data) {
      setResult({
        ...res.data,
        className: selectedStudent.className,
      });
    } else {
      setResult(null);
    }
    setLoading(false);
  }, [selectedStudent, selectedExamId]);

  useEffect(() => {
    if (selectedStudent && selectedExamId) {
      fetchResult();
    }
  }, [selectedStudent, selectedExamId, fetchResult]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />

      <div className="rounded-xl border bg-card p-6 print:hidden">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Label>Search Student</Label>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Name or student ID..."
            />
            {search && filteredStudents.length > 0 && !selectedStudent && (
              <ul className="max-h-48 overflow-y-auto rounded-lg border">
                {filteredStudents.map((student) => (
                  <li key={student.id}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted/60"
                      onClick={() => {
                        setSelectedStudent(student);
                        setSearch(student.name);
                        setResult(null);
                      }}
                    >
                      <Search className="size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {student.studentId} · {student.className}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {selectedStudent && (
              <div className="flex items-center justify-between rounded-lg bg-status-success-bg px-4 py-3">
                <div>
                  <p className="font-medium">{selectedStudent.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedStudent.studentId} · {selectedStudent.className}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedStudent(null);
                    setSearch("");
                    setResult(null);
                    setSelectedExamId("");
                  }}
                >
                  Change
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Select Exam</Label>
            <Select
              value={selectedExamId}
              onValueChange={(v) => v && setSelectedExamId(v)}
              disabled={!selectedStudent}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an examination" />
              </SelectTrigger>
              <SelectContent>
                {exams.map((exam) => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="space-y-4">
          {loading ? (
            <LoadingState rows={6} />
          ) : result && selectedStudent ? (
            <>
              <div className="flex justify-end print:hidden">
                <Button onClick={handlePrint}>
                  <Printer className="mr-1.5 size-4" />
                  Print Result
                </Button>
              </div>
              <ResultCard
                ref={printRef}
                result={result}
                studentName={selectedStudent.name}
                studentId={selectedStudent.studentId}
              />
            </>
          ) : (
            <EmptyState
              title="No result found"
              description="Marks may not have been entered for this student and exam yet."
            />
          )}
        </div>
      )}
    </div>
  );
}
