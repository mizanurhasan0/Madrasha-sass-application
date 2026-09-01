"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

export type GalleryMetaState = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  albumCount: number;
};

type GallerySectionProps = {
  albumTotal: number;
  meta: GalleryMetaState;
  onChange: (meta: GalleryMetaState) => void;
  onSave: () => void;
};

export function GallerySection({ albumTotal, meta, onChange, onSave }: GallerySectionProps) {
  return (
    <CmsPageSection
      title="Gallery Page"
      description={`${albumTotal} albums available from dashboard gallery.`}
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
      <CmsField label="Albums to Display">
        <Input
          type="number"
          min={1}
          max={albumTotal}
          value={meta.albumCount}
          onChange={(e) => onChange({ ...meta, albumCount: Number(e.target.value) })}
        />
      </CmsField>
      <CmsVisibilitySwitch
        label="Show on Website"
        description="Display public gallery page"
        checked={meta.showOnWebsite}
        onCheckedChange={(checked) => onChange({ ...meta, showOnWebsite: checked })}
      />
    </CmsPageSection>
  );
}
