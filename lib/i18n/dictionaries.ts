import type { Locale } from "./locale";
import en from "@/messages/en";
import bn from "@/messages/bn";

const dictionaries = { en, bn } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

type NestedValue = string | { [key: string]: NestedValue };

function getNestedValue(obj: NestedValue, path: string): string | undefined {
  const keys = path.split(".");
  let current: NestedValue = obj;
  for (const key of keys) {
    if (typeof current !== "object" || current === null) return undefined;
    current = current[key];
  }
  return typeof current === "string" ? current : undefined;
}

export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, string | number>
): string {
  const dict = getDictionary(locale);
  let text = getNestedValue(dict as NestedValue, key) ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return text;
}
