"use client";

import { Bell, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { EmptyState } from "@/components/common/empty-state";
import { useT } from "@/lib/i18n/locale-provider";
import { ProfileTabCard } from "@/components/students/profile/profile-tab-card";
import type { Notice } from "@/types/notice";

type NoticesTabProps = {
  notices: Notice[];
};

export function NoticesTab({ notices }: NoticesTabProps) {
  const t = useT();

  return (
    <ProfileTabCard title={t("students.noticesTab")} icon={Bell}>
      {notices.length === 0 ? (
        <EmptyState
          title={t("common.noNotices")}
          description="Published notices relevant to this student will appear here."
          className="py-8"
        />
      ) : (
        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="rounded-lg border p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{notice.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {notice.description}
                  </p>
                </div>
                <StatusBadge status={notice.category} />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="size-3.5" />
                <DateDisplay date={notice.publishDate} />
              </div>
            </div>
          ))}
        </div>
      )}
    </ProfileTabCard>
  );
}
