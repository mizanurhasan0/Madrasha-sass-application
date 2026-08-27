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

export type HomepageState = {
  heroTitle: string;
  heroSubtitle: string;
  badgeText: string;
  primaryCta: string;
  secondaryCta: string;
  showStats: boolean;
  showTestimonials: boolean;
};

type HomepageSectionProps = {
  homepage: HomepageState;
  onChange: (homepage: HomepageState) => void;
  onSave: () => void;
};

export function HomepageSection({ homepage, onChange, onSave }: HomepageSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Homepage</CardTitle>
        <CardDescription>Hero section and landing page content.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CmsField label="Hero Title">
          <Input
            value={homepage.heroTitle}
            onChange={(e) => onChange({ ...homepage, heroTitle: e.target.value })}
          />
        </CmsField>
        <CmsField label="Hero Subtitle">
          <Textarea
            rows={3}
            value={homepage.heroSubtitle}
            onChange={(e) => onChange({ ...homepage, heroSubtitle: e.target.value })}
          />
        </CmsField>
        <CmsField label="Badge Text">
          <Input
            value={homepage.badgeText}
            onChange={(e) => onChange({ ...homepage, badgeText: e.target.value })}
          />
        </CmsField>
        <div className="grid gap-4 sm:grid-cols-2">
          <CmsField label="Primary CTA">
            <Input
              value={homepage.primaryCta}
              onChange={(e) => onChange({ ...homepage, primaryCta: e.target.value })}
            />
          </CmsField>
          <CmsField label="Secondary CTA">
            <Input
              value={homepage.secondaryCta}
              onChange={(e) => onChange({ ...homepage, secondaryCta: e.target.value })}
            />
          </CmsField>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Show Stats Band</p>
            <p className="text-xs text-muted-foreground">Student and teacher counts</p>
          </div>
          <Switch
            checked={homepage.showStats}
            onCheckedChange={(checked) => onChange({ ...homepage, showStats: checked })}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Show Testimonials</p>
            <p className="text-xs text-muted-foreground">Guardian feedback section</p>
          </div>
          <Switch
            checked={homepage.showTestimonials}
            onCheckedChange={(checked) => onChange({ ...homepage, showTestimonials: checked })}
          />
        </div>
        <SaveBar onSave={onSave} />
      </CardContent>
    </Card>
  );
}
