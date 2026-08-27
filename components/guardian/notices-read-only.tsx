"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { CardSkeleton } from "@/components/common/loading-state";
import { NoticesList } from "@/components/common/notices-list";
import { noticeService } from "@/services/notice.service";
import type { Notice, NoticeAudience } from "@/types/notice";

type NoticesReadOnlyProps = {
  audienceFilter?: NoticeAudience[];
};

export function NoticesReadOnly({
  audienceFilter = ["everyone", "guardians", "teachers"],
}: NoticesReadOnlyProps) {
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    async function load() {
      const res = await noticeService.getNotices({ limit: 50, published: true });
      if (res.success) {
        setNotices(
          res.data.data.filter((n) => audienceFilter.includes(n.audience))
        );
      }
      setLoading(false);
    }
    load();
  }, [audienceFilter]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Notices"
          description="Published notices from the madrasa."
        />
        <CardSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices"
        description="Published notices from the madrasa."
      />
      <NoticesList notices={notices} />
    </div>
  );
}
