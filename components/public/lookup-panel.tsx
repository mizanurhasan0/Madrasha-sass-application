"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LookupPanelProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  buttonLabel?: string;
};

export function LookupPanel({
  id,
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  loading,
  buttonLabel = "Check",
}: LookupPanelProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2 flex gap-2">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
        <Button onClick={onSubmit} disabled={loading}>
          <Search className="size-4" />
          <span className="sr-only">{buttonLabel}</span>
        </Button>
      </div>
    </div>
  );
}
