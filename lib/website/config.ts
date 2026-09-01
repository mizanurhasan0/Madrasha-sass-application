import { getWebsiteConfig } from "@/services/website.service";

export function readWebsiteConfig() {
  return getWebsiteConfig();
}

export function whatsappUrl(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
