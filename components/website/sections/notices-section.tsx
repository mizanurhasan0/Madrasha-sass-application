"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

export type NoticesMetaState = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  maxVisible: number;
};

type NoticesSectionProps = {
  publishedCount: number;
  totalCount: number;
  meta: NoticesMetaState;
  onChange: (meta: NoticesMetaState) => void;
  onSave: () => void;
};

export function NoticesSection({
  publishedCount,
  totalCount,
  meta,
  onChange,
  onSave,
}: NoticesSectionProps) {
  return (
    <CmsPageSection
      title="Notices Page"
      description={`${publishedCount} published notices synced from dashboard.`}
      onSave={onSave}
    >
      <CmsField label="Page Title">
        <Input
          value={meta.pageTitle}
          onChange={(e) => onChange({ ...meta, pageTitle: e.target.value })}
        />
      </CmsField>
      <CmsField label="Page Subtitle">
        <Textarea
          rows={2}
          value={meta.pageSubtitle}
          onChange={(e) => onChange({ ...meta, pageSubtitle: e.target.value })}
        />
      </CmsField>
      <CmsField label="Max Notices to Display">
        <Input
          type="number"
          min={1}
          max={totalCount}
          value={meta.maxVisible}
          onChange={(e) => onChange({ ...meta, maxVisible: Number(e.target.value) })}
        />
      </CmsField>
      <CmsVisibilitySwitch
        label="Show on Website"
        description="Display public notices page"
        checked={meta.showOnWebsite}
        onCheckedChange={(checked) => onChange({ ...meta, showOnWebsite: checked })}
      />
    </CmsPageSection>
  );
}
