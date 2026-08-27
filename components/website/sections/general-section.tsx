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
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Site-wide branding and visibility for {madrasaName}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Public Website</p>
            <p className="text-xs text-muted-foreground">Show the marketing site to visitors</p>
          </div>
          <Switch
            checked={general.showPublicSite}
            onCheckedChange={(checked) => onChange({ ...general, showPublicSite: checked })}
          />
        </div>
        <SaveBar onSave={onSave} />
      </CardContent>
    </Card>
  );
}
