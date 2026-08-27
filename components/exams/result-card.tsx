"use client";

import { forwardRef } from "react";
import { siteConfig } from "@/config/site";
import { StatusBadge } from "@/components/common/status-badge";
import type { StudentResult } from "@/types/exam";

type ResultCardProps = {
  result: StudentResult;
  studentName: string;
  studentId: string;
  className?: string;
};

export const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  function ResultCard({ result, studentName, studentId, className }, ref) {
    return (
      <div
        ref={ref}
        className={`result-card mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-sm print:border-0 print:shadow-none ${className ?? ""}`}
      >
        <div className="border-b border-emerald-200 pb-6 text-center dark:border-emerald-800">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-600">
            {siteConfig.madrasaName}
          </p>
          <h2 className="mt-2 text-2xl font-bold">Examination Result</h2>
          <p className="mt-1 text-sm text-muted-foreground">{result.examName}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Student Name</p>
            <p className="font-semibold">{studentName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Student ID</p>
            <p className="font-semibold tabular-nums">{studentId}</p>
          </div>
          {result.className && (
            <div>
              <p className="text-xs text-muted-foreground">Class</p>
              <p className="font-semibold">{result.className}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground">Result Status</p>
            <StatusBadge status={result.status} />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2.5 text-left font-medium">Subject</th>
                <th className="px-4 py-2.5 text-center font-medium">Obtained</th>
                <th className="px-4 py-2.5 text-center font-medium">Total</th>
                <th className="px-4 py-2.5 text-center font-medium">Grade</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject) => (
                <tr key={subject.subjectName} className="border-b last:border-0">
                  <td className="px-4 py-2.5">{subject.subjectName}</td>
                  <td className="px-4 py-2.5 text-center tabular-nums">
                    {subject.obtainedMarks}
                  </td>
                  <td className="px-4 py-2.5 text-center tabular-nums">
                    {subject.totalMarks}
                  </td>
                  <td className="px-4 py-2.5 text-center font-medium">{subject.grade}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50/50 font-semibold dark:bg-emerald-950/20">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-center tabular-nums">{result.obtainedMarks}</td>
                <td className="px-4 py-3 text-center tabular-nums">{result.totalMarks}</td>
                <td className="px-4 py-3 text-center">{result.grade}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-lg bg-muted/40 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-xl font-bold tabular-nums">{result.average.toFixed(1)}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Overall Grade</p>
            <p className="text-2xl font-bold text-emerald-600">{result.grade}</p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground print:mt-12">
          This is a computer-generated result card. No signature required.
        </p>
      </div>
    );
  }
);
