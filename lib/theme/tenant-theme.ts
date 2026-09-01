import type { CSSProperties } from "react";
import type { MadrasaTheme } from "@/types/madrasa";

export const TENANT_THEME_COOKIE = "madrasa-theme";

export const DEFAULT_MADRASA_THEME: Required<
  Pick<MadrasaTheme, "primary" | "accent" | "deep">
> = {
  primary: "oklch(0.38 0.1 148)",
  accent: "oklch(0.87 0.16 118)",
  deep: "oklch(0.26 0.05 165)",
};

export function mergeMadrasaTheme(theme?: Partial<MadrasaTheme> | null): MadrasaTheme {
  return {
    ...DEFAULT_MADRASA_THEME,
    ...theme,
  };
}

export function madrasaThemeToCssVars(theme?: Partial<MadrasaTheme> | null): CSSProperties {
  const merged = mergeMadrasaTheme(theme);

  return {
    "--brand-green": merged.primary,
    "--brand-lime": merged.accent,
    "--brand-deep": merged.deep,
    ...(merged.radius ? { "--radius": merged.radius } : {}),
  } as CSSProperties;
}

export function parseMadrasaThemeCookie(cookieHeader?: string): MadrasaTheme | null {
  if (!cookieHeader) return null;

  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${TENANT_THEME_COOKIE}=([^;]*)`)
  );
  if (!match?.[1]) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as MadrasaTheme;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function serializeMadrasaThemeCookie(theme: MadrasaTheme): string {
  return `${TENANT_THEME_COOKIE}=${encodeURIComponent(JSON.stringify(theme))}; path=/; max-age=31536000; samesite=lax`;
}

export function applyMadrasaThemeToDocument(theme?: Partial<MadrasaTheme> | null) {
  if (typeof document === "undefined") return;

  const vars = madrasaThemeToCssVars(theme);
  for (const [key, value] of Object.entries(vars)) {
    if (typeof value === "string") {
      document.documentElement.style.setProperty(key, value);
    }
  }
}

export function clearMadrasaThemeFromDocument() {
  if (typeof document === "undefined") return;

  document.documentElement.style.removeProperty("--brand-green");
  document.documentElement.style.removeProperty("--brand-lime");
  document.documentElement.style.removeProperty("--brand-deep");
  document.documentElement.style.removeProperty("--radius");
}
