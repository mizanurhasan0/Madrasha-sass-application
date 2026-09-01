"use client";

import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
import { SimpleTable } from "@/components/common/simple-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n/locale-provider";
import type { StudentResult } from "@/types/exam";

type ResultsTabProps = {
  results: StudentResult[];
};

export function ResultsTab({ results }: ResultsTabProps) {
  const t = useT();

  if (results.length === 0) {
    return (
      <Card>
        <CardContent>
          <EmptyState
            title={t("common.noResults")}
            description="Results will appear here after examinations are completed and marks are entered."
            className="py-12"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.examId}>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>{result.examName}</CardTitle>
              <div className="flex items-center gap-2">
                <StatusBadge status={result.status} />
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  Grade: {result.grade}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-6 text-sm">
              <span>
                Total: <strong>{result.obtainedMarks}</strong> / {result.totalMarks}
              </span>
              <span>
                Average: <strong>{result.average.toFixed(1)}%</strong>
              </span>
            </div>
            <SimpleTable
              data={result.subjects}
              getRowKey={(sub) => sub.subjectName}
              className="rounded-lg"
              columns={[
                { key: "subject", header: "Subject", cell: (sub) => sub.subjectName },
                {
                  key: "marks",
                  header: "Marks",
                  align: "right",
                  cell: (sub) => `${sub.obtainedMarks} / ${sub.totalMarks}`,
                  cellClassName: "tabular-nums",
                },
                {
                  key: "grade",
                  header: "Grade",
                  align: "right",
                  cell: (sub) => <span className="font-medium">{sub.grade}</span>,
                },
              ]}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
