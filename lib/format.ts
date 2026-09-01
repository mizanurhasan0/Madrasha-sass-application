import { format, parseISO } from "date-fns";
import { bn, enGB } from "date-fns/locale";
import type { Locale } from "@/lib/i18n/locale";

type NamedItem = { name: string; nameBn?: string | null };
type TitledItem = { title: string; titleBn?: string | null; description?: string; descriptionBn?: string | null };

export function displayName(item: NamedItem, locale: Locale = "en"): string {
  if (locale === "bn" && item.nameBn) return item.nameBn;
  return item.name;
}

export function displayTitle(item: TitledItem, locale: Locale = "en"): string {
  if (locale === "bn" && item.titleBn) return item.titleBn;
  return item.title;
}

export function displayDescription(item: TitledItem, locale: Locale = "en"): string {
  if (locale === "bn" && item.descriptionBn) return item.descriptionBn;
  return item.description ?? "";
}

const dateLocales = { en: enGB, bn } as const;

export function formatDateLocalized(
  date: string,
  locale: Locale = "en",
  pattern = "dd MMM yyyy"
): string {
  try {
    return format(parseISO(date), pattern, { locale: dateLocales[locale] });
  } catch {
    return date;
  }
}

export function formatCurrency(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

export function formatDate(date: string, pattern = "dd MMM yyyy"): string {
  try {
    return format(parseISO(date), pattern);
  } catch {
    return date;
  }
}

export function formatDateTime(date: string): string {
  return formatDate(date, "dd MMM yyyy, hh:mm a");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function calculateGrade(percentage: number): string {
  if (percentage >= 80) return "A+";
  if (percentage >= 70) return "A";
  if (percentage >= 60) return "A-";
  if (percentage >= 50) return "B";
  if (percentage >= 40) return "C";
  if (percentage >= 33) return "D";
  return "F";
}

export { getStatusVariant } from "@/lib/theme/status";
