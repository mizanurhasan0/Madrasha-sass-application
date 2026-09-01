"use client";

import { cn } from "@/lib/utils";
import { getStatusVariant, statusBadgeVariants } from "@/lib/theme/status";
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
  const variant = getStatusVariant(status);

  return (
    <span className={cn(statusBadgeVariants({ variant }), className)}>{label}</span>
  );
}
