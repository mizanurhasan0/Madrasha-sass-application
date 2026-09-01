"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/website/config";
import { cn } from "@/lib/utils";

type WhatsAppFabProps = {
  phone: string;
  className?: string;
};

export function WhatsAppFab({ phone, className }: WhatsAppFabProps) {
  if (!phone || phone === "#") return null;

  const href = whatsappUrl(
    phone,
    "Assalamu Alaikum, I would like to inquire about Al-Noor Islamic Academy."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105",
        className
      )}
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
