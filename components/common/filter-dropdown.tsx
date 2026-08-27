"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types/common";

type FilterDropdownProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
};

export function FilterDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = "All",
  className,
}: FilterDropdownProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {label && <p className="text-xs font-medium text-muted-foreground">{label}</p>}
      <Select value={value} onValueChange={(v) => v && onChange(v)}>
        <SelectTrigger className="w-full min-w-[140px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{placeholder}</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
