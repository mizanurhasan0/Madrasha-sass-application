export type Locale = "en" | "bn";

export const LOCALE_COOKIE = "madrasa_locale";
export const LOCALE_STORAGE = "madrasa_locale";
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "bn";
}

export function getLocaleFromCookie(cookieHeader?: string): Locale {
  if (!cookieHeader) return DEFAULT_LOCALE;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${LOCALE_COOKIE}=`));
  const value = match?.split("=")[1];
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}
