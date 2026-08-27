"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Notice } from "@/types/notice";

export function NoticesList({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) {
    return <p className="text-muted-foreground text-sm">No notices available.</p>;
  }

  return (
    <div className="space-y-4">
      {notices.map((notice) => (
        <Card key={notice.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-base">{notice.title}</CardTitle>
              <Badge variant="secondary">{notice.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{notice.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(notice.publishDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
