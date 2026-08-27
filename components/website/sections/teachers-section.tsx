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
    <Card>
      <CardHeader>
        <CardTitle>Teachers Page</CardTitle>
        <CardDescription>
          Public directory — {teachersCount} teachers available from dashboard data.
        </CardDescription>
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
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Show on Website</p>
            <p className="text-xs text-muted-foreground">Display teachers directory page</p>
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
