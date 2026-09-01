"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

export type GeneralState = {
  madrasaName: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  showPublicSite: boolean;
};

type GeneralSectionProps = {
  madrasaName: string;
  general: GeneralState;
  onChange: (general: GeneralState) => void;
  onSave: () => void;
};

export function GeneralSection({
  madrasaName,
  general,
  onChange,
  onSave,
}: GeneralSectionProps) {
  return (
    <CmsPageSection
      title="General Settings"
      description={`Site-wide branding and visibility for ${madrasaName}.`}
      onSave={onSave}
    >
      <CmsField label="Madrasa Name">
        <Input
          value={general.madrasaName}
          onChange={(e) => onChange({ ...general, madrasaName: e.target.value })}
        />
      </CmsField>
      <CmsField label="Tagline">
        <Input
          value={general.tagline}
          onChange={(e) => onChange({ ...general, tagline: e.target.value })}
        />
      </CmsField>
      <CmsField label="Site Description">
        <Textarea
          rows={3}
          value={general.description}
          onChange={(e) => onChange({ ...general, description: e.target.value })}
        />
      </CmsField>
      <CmsField label="Website URL">
        <Input
          value={general.websiteUrl}
          onChange={(e) => onChange({ ...general, websiteUrl: e.target.value })}
        />
      </CmsField>
      <CmsVisibilitySwitch
        label="Public Website"
        description="Show the marketing site to visitors"
        checked={general.showPublicSite}
        onCheckedChange={(checked) => onChange({ ...general, showPublicSite: checked })}
      />
    </CmsPageSection>
  );
}
