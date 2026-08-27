import { cn } from "@/lib/utils";
import { marketingContainer, marketingSectionPadding } from "./layout";

type SectionTone = "default" | "sand" | "deep";

interface SectionProps {
  children: React.ReactNode;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  id?: string;
}

const toneClass: Record<SectionTone, string> = {
  default: marketingSectionPadding,
  sand: cn(marketingSectionPadding, "bg-sand"),
  deep: cn(marketingSectionPadding, "bg-deep text-white"),
};

export function Section({
  children,
  tone = "default",
  className,
  containerClassName,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(toneClass[tone], className)}>
      <div className={cn(marketingContainer, containerClassName)}>{children}</div>
    </section>
  );
}
