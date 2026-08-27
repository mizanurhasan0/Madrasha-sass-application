"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CmsField, SaveBar } from "@/components/website/cms-field";

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
    <Card>
      <CardHeader>
        <CardTitle>Gallery Page</CardTitle>
        <CardDescription>{albumTotal} albums available from dashboard gallery.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Show on Website</p>
            <p className="text-xs text-muted-foreground">Display public gallery page</p>
          </div>
          <Switch
            checked={meta.showOnWebsite}
            onCheckedChange={(checked) => onChange({ ...meta, showOnWebsite: checked })}
          />
        </div>
        <SaveBar onSave={onSave} />
      </CardContent>
    </Card>
  );
}
