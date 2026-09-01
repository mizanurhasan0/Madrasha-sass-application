"use client";

import { useEffect } from "react";
import type { MadrasaTheme } from "@/types/madrasa";
import {
  applyMadrasaThemeToDocument,
  clearMadrasaThemeFromDocument,
} from "@/lib/theme/tenant-theme";

type TenantThemeProviderProps = {
  theme?: MadrasaTheme | null;
};

export function TenantThemeProvider({ theme }: TenantThemeProviderProps) {
  useEffect(() => {
    if (theme) {
      applyMadrasaThemeToDocument(theme);
      return () => clearMadrasaThemeFromDocument();
    }
  }, [theme]);

  return null;
}
