"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADMISSION_STATUS_OPTIONS } from "@/lib/admission/constants";
import type { AdmissionStatus } from "@/types/admission";
import { cn } from "@/lib/utils";

type AdmissionStatusSelectProps = {
  value: AdmissionStatus | "all";
  onChange: (value: AdmissionStatus | "all") => void;
  includeAll?: boolean;
  className?: string;
  placeholder?: string;
};

export function AdmissionStatusSelect({
  value,
  onChange,
  includeAll = false,
  className,
  placeholder = "Status",
}: AdmissionStatusSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v as AdmissionStatus | "all")}>
      <SelectTrigger className={cn("w-32", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAll && <SelectItem value="all">All statuses</SelectItem>}
        {ADMISSION_STATUS_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
