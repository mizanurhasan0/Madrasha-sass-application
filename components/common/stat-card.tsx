import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  isCurrency?: boolean;
  className?: string;
};

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  isCurrency,
  className,
}: StatCardProps) {
  const displayValue =
    typeof value === "number"
      ? isCurrency
        ? formatCurrency(value)
        : value.toLocaleString()
      : value;

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{displayValue}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.value >= 0 ? "text-emerald-600" : "text-red-600"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary">{icon}</div>
        )}
      </div>
    </div>
  );
}
