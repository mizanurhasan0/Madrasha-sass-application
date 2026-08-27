import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "default" | "deep";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "default",
  className,
}: SectionTitleProps) {
  const isDeep = tone === "deep";

  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <span
        className={cn(
          "mb-3 block text-sm font-semibold uppercase tracking-widest",
          isDeep ? "text-lime" : "text-primary"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-heading text-[clamp(1.75rem,3vw+0.5rem,2.75rem)] leading-tight",
          isDeep ? "text-white" : "text-deep"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 leading-relaxed",
            isDeep ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
