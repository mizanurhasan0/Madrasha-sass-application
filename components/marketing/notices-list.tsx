"use client";

import { useMemo, useState } from "react";
import type { Notice } from "@/types/notice";
import { EmptyState } from "@/components/common/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { useT } from "@/lib/i18n/locale-provider";
import { Reveal, wowStaggerDelay } from "./reveal";

type NoticesListProps = {
  notices: Notice[];
};

const categories = ["all", "general", "academic", "exam", "holiday", "fee", "admission"] as const;

export function NoticesList({ notices }: NoticesListProps) {
  const t = useT();
  const [category, setCategory] = useState<(typeof categories)[number]>("all");

  const filtered = useMemo(() => {
    if (category === "all") return notices.filter((n) => n.published);
    return notices.filter((n) => n.published && n.category === category);
  }, [notices, category]);

  const categoryLabel: Record<string, string> = {
    all: t("common.all"),
    general: t("noticesPage.categoryGeneral"),
    academic: t("noticesPage.categoryAcademic"),
    exam: t("noticesPage.categoryExam"),
    holiday: t("noticesPage.categoryHoliday"),
    fee: t("noticesPage.categoryFee"),
    admission: t("noticesPage.categoryAdmission"),
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat)}
          >
            {categoryLabel[cat]}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState title={t("common.noNoticesCategory")} />
      ) : (
        <div className="grid gap-4">
          {filtered.map((notice, i) => (
            <Reveal key={notice.id} delay={wowStaggerDelay(i, 80)}>
              <Card className="border-border/60 shadow-soft">
                <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                  <div>
                    <Badge variant="secondary" className="mb-2 capitalize">
                      {notice.category}
                    </Badge>
                    <CardTitle className="text-lg">{notice.title}</CardTitle>
                    <CardDescription>{formatDate(notice.publishDate)}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{notice.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
