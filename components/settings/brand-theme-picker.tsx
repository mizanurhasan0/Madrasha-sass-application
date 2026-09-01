"use client";

import { useEffect, useState } from "react";
import { Palette, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import type { MadrasaTheme } from "@/types/madrasa";
import {
  applyMadrasaThemeToDocument,
  DEFAULT_MADRASA_THEME,
  mergeMadrasaTheme,
  serializeMadrasaThemeCookie,
} from "@/lib/theme/tenant-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BrandThemePickerProps = {
  initialTheme?: MadrasaTheme | null;
};

const colorFields: {
  key: keyof Pick<MadrasaTheme, "primary" | "accent" | "deep">;
  label: string;
  description: string;
}[] = [
  {
    key: "primary",
    label: "Primary Brand Color",
    description: "Main buttons, links, and accents",
  },
  {
    key: "accent",
    label: "Accent Color",
    description: "Highlights and secondary emphasis",
  },
  {
    key: "deep",
    label: "Deep Background",
    description: "Dark surfaces and footer backgrounds",
  },
];

function toHexFallback(value: string) {
  if (value.startsWith("#")) return value;
  return "#10551f";
}

export function BrandThemePicker({ initialTheme }: BrandThemePickerProps) {
  const [theme, setTheme] = useState<MadrasaTheme>(() => mergeMadrasaTheme(initialTheme));

  useEffect(() => {
    applyMadrasaThemeToDocument(theme);
  }, [theme]);

  const updateColor = (key: keyof Pick<MadrasaTheme, "primary" | "accent" | "deep">, value: string) => {
    setTheme((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    document.cookie = serializeMadrasaThemeCookie(theme);
    toast.success("Brand theme saved");
  };

  const handleReset = () => {
    const resetTheme = mergeMadrasaTheme(DEFAULT_MADRASA_THEME);
    setTheme(resetTheme);
    document.cookie = serializeMadrasaThemeCookie(resetTheme);
    toast.success("Brand theme reset to defaults");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="size-4 text-primary" />
        <p className="text-sm font-medium">Brand Colors</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {colorFields.map((field) => (
          <div key={field.key} className="space-y-2 rounded-lg border p-4">
            <Label htmlFor={`brand-${field.key}`}>{field.label}</Label>
            <p className="text-xs text-muted-foreground">{field.description}</p>
            <div className="flex items-center gap-2">
              <Input
                id={`brand-${field.key}`}
                type="color"
                value={toHexFallback(theme[field.key] ?? DEFAULT_MADRASA_THEME[field.key])}
                onChange={(e) => updateColor(field.key, e.target.value)}
                className="h-10 w-14 shrink-0 cursor-pointer p-1"
              />
              <Input
                value={theme[field.key] ?? ""}
                onChange={(e) => updateColor(field.key, e.target.value)}
                placeholder={DEFAULT_MADRASA_THEME[field.key]}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border p-4">
        <p className="mb-3 text-sm font-medium">Live Preview</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Primary Action</Button>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Brand Badge
          </span>
          <span className="rounded-full bg-status-success-bg px-3 py-1 text-xs font-medium text-status-success-fg">
            Success
          </span>
          <span className="rounded-full bg-status-warning-bg px-3 py-1 text-xs font-medium text-status-warning-fg">
            Warning
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={handleSave}>
          Save Brand Theme
        </Button>
        <Button size="sm" variant="outline" onClick={handleReset}>
          <RotateCcw data-icon="inline-start" />
          Reset Defaults
        </Button>
      </div>
    </div>
  );
}
