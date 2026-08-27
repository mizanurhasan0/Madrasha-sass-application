"use client";

import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/empty-state";
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
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Subject</th>
                    <th className="px-4 py-2 text-right font-medium">Marks</th>
                    <th className="px-4 py-2 text-right font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((sub) => (
                    <tr key={sub.subjectName} className="border-b last:border-0">
                      <td className="px-4 py-2">{sub.subjectName}</td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {sub.obtainedMarks} / {sub.totalMarks}
                      </td>
                      <td className="px-4 py-2 text-right font-medium">{sub.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
