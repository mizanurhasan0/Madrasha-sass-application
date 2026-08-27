"use client";

import { cn } from "@/lib/utils";
import { getStatusColor } from "@/lib/format";
import { useT } from "@/lib/i18n/locale-provider";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const t = useT();
  const key = `status.${status}`;
  const translated = t(key);
  const label = translated === key ? status.replace(/_/g, " ") : translated;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        getStatusColor(status),
        className
      )}
    >
      {label}
    </span>
  );
}
