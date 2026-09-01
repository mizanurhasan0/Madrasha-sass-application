import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DetailItem = {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
};

type DetailListProps = {
  items: DetailItem[];
  className?: string;
};

export function DetailList({ items, className }: DetailListProps) {
  return (
    <dl className={cn("space-y-2 text-sm", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{item.label}</dt>
          <dd className={cn("text-right", item.emphasis && "font-semibold")}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
