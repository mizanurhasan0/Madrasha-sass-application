"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

export type EventsMetaState = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  maxVisible: number;
};

type EventsSectionProps = {
  upcomingCount: number;
  totalCount: number;
  meta: EventsMetaState;
  onChange: (meta: EventsMetaState) => void;
  onSave: () => void;
};

export function EventsSection({
  upcomingCount,
  totalCount,
  meta,
  onChange,
  onSave,
}: EventsSectionProps) {
  return (
    <CmsPageSection
      title="Events Page"
      description={`${upcomingCount} upcoming events from dashboard data.`}
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
      <CmsField label="Max Events to Display">
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
        description="Display public events page"
        checked={meta.showOnWebsite}
        onCheckedChange={(checked) => onChange({ ...meta, showOnWebsite: checked })}
      />
    </CmsPageSection>
  );
}
