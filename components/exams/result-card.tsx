"use client";

import { forwardRef } from "react";
import { siteConfig } from "@/config/site";
import { StatusBadge } from "@/components/common/status-badge";
import {
  SimpleTable,
  type SimpleTableColumn,
} from "@/components/common/simple-table";
import { TableCell, TableRow } from "@/components/ui/table";
import type { StudentResult } from "@/types/exam";

type ResultCardProps = {
  result: StudentResult;
  studentName: string;
  studentId: string;
  className?: string;
};

const subjectColumns: SimpleTableColumn<StudentResult["subjects"][number]>[] = [
  { key: "subject", header: "Subject", cell: (subject) => subject.subjectName },
  {
    key: "obtained",
    header: "Obtained",
    align: "center",
    cell: (subject) => subject.obtainedMarks,
    cellClassName: "tabular-nums",
  },
  {
    key: "total",
    header: "Total",
    align: "center",
    cell: (subject) => subject.totalMarks,
    cellClassName: "tabular-nums",
  },
  {
    key: "grade",
    header: "Grade",
    align: "center",
    cell: (subject) => <span className="font-medium">{subject.grade}</span>,
  },
];

export const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  function ResultCard({ result, studentName, studentId, className }, ref) {
    return (
      <div
        ref={ref}
        className={`result-card mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-sm print:border-0 print:shadow-none ${className ?? ""}`}
      >
        <div className="border-b border-primary/20 pb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
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

        <div className="mt-6">
          <SimpleTable
            data={result.subjects}
            getRowKey={(subject) => subject.subjectName}
            className="rounded-lg"
            footer={
              <TableRow className="bg-status-success-bg font-semibold hover:bg-status-success-bg">
                <TableCell className="px-4 py-3">Total</TableCell>
                <TableCell className="px-4 py-3 text-center tabular-nums">
                  {result.obtainedMarks}
                </TableCell>
                <TableCell className="px-4 py-3 text-center tabular-nums">
                  {result.totalMarks}
                </TableCell>
                <TableCell className="px-4 py-3 text-center">{result.grade}</TableCell>
              </TableRow>
            }
            columns={subjectColumns}
          />
        </div>

        <div className="mt-6 flex items-center justify-between rounded-lg bg-muted/40 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-xl font-bold tabular-nums">{result.average.toFixed(1)}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Overall Grade</p>
            <p className="text-2xl font-bold text-status-success-fg">{result.grade}</p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground print:mt-12">
          This is a computer-generated result card. No signature required.
        </p>
      </div>
    );
  }
);
