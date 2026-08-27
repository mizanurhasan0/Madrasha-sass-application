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
    <Card>
      <CardHeader>
        <CardTitle>Events Page</CardTitle>
        <CardDescription>{upcomingCount} upcoming events from dashboard data.</CardDescription>
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
        <CmsField label="Max Events to Display">
          <Input
            type="number"
            min={1}
            max={totalCount}
            value={meta.maxVisible}
            onChange={(e) => onChange({ ...meta, maxVisible: Number(e.target.value) })}
          />
        </CmsField>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Show on Website</p>
            <p className="text-xs text-muted-foreground">Display public events page</p>
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
