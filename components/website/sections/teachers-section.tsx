"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

export type TeachersMetaState = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  featuredCount: number;
};

type TeachersSectionProps = {
  teachersCount: number;
  meta: TeachersMetaState;
  onChange: (meta: TeachersMetaState) => void;
  onSave: () => void;
};

export function TeachersSection({
  teachersCount,
  meta,
  onChange,
  onSave,
}: TeachersSectionProps) {
  return (
    <CmsPageSection
      title="Teachers Page"
      description={`Public directory — ${teachersCount} teachers available from dashboard data.`}
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
      <CmsField label="Featured Teachers Count" hint={`Max ${teachersCount} available`}>
        <Input
          type="number"
          min={1}
          max={teachersCount}
          value={meta.featuredCount}
          onChange={(e) =>
            onChange({
              ...meta,
              featuredCount: Number(e.target.value),
            })
          }
        />
      </CmsField>
      <CmsVisibilitySwitch
        label="Show on Website"
        description="Display teachers directory page"
        checked={meta.showOnWebsite}
        onCheckedChange={(checked) => onChange({ ...meta, showOnWebsite: checked })}
      />
    </CmsPageSection>
  );
}
