"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function CmsField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SaveBar({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-dashed border-primary/30 bg-primary/5 px-4 py-3">
      <p className="text-sm text-muted-foreground">
        Changes are stored locally for preview only — connect a backend to publish.
      </p>
      <Button size="sm" onClick={onSave}>
        <Save data-icon="inline-start" />
        Save Draft
      </Button>
    </div>
  );
}
