"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SaveBar } from "@/components/website/cms-field";

type CmsPageSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave: () => void;
};

export function CmsPageSection({ title, description, children, onSave }: CmsPageSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <SaveBar onSave={onSave} />
      </CardContent>
    </Card>
  );
}

type CmsVisibilitySwitchProps = {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function CmsVisibilitySwitch({
  label,
  description,
  checked,
  onCheckedChange,
}: CmsVisibilitySwitchProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
