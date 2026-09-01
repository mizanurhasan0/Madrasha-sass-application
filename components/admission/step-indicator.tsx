import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  steps: readonly string[];
  current: number;
};

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex gap-2">
      {steps.map((label, i) => (
        <div
          key={label}
          className={cn(
            "flex-1 rounded-lg border px-2 py-2 text-center text-xs font-medium sm:text-sm",
            i <= current
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-muted-foreground"
          )}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
