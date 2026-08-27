"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CmsField, SaveBar } from "@/components/website/cms-field";

export type AboutState = {
  pageTitle: string;
  intro: string;
  mission: string;
  vision: string;
  values: string;
};

type AboutSectionProps = {
  about: AboutState;
  onChange: (about: AboutState) => void;
  onSave: () => void;
};

export function AboutSection({ about, onChange, onSave }: AboutSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Page</CardTitle>
        <CardDescription>Mission, vision, and institutional story.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CmsField label="Page Title">
          <Input
            value={about.pageTitle}
            onChange={(e) => onChange({ ...about, pageTitle: e.target.value })}
          />
        </CmsField>
        <CmsField label="Introduction">
          <Textarea
            rows={4}
            value={about.intro}
            onChange={(e) => onChange({ ...about, intro: e.target.value })}
          />
        </CmsField>
        <CmsField label="Mission">
          <Textarea
            rows={3}
            value={about.mission}
            onChange={(e) => onChange({ ...about, mission: e.target.value })}
          />
        </CmsField>
        <CmsField label="Vision">
          <Textarea
            rows={3}
            value={about.vision}
            onChange={(e) => onChange({ ...about, vision: e.target.value })}
          />
        </CmsField>
        <CmsField label="Values">
          <Textarea
            rows={3}
            value={about.values}
            onChange={(e) => onChange({ ...about, values: e.target.value })}
          />
        </CmsField>
        <SaveBar onSave={onSave} />
      </CardContent>
    </Card>
  );
}
