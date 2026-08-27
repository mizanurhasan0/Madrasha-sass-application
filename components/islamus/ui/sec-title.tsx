import { cn } from "@/lib/utils";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { SplitTextReveal } from "@/components/islamus/animations/split-text-reveal";

interface SecTitleProps {
  subTitle?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  className?: string;
  /** Theme uses wow fadeInUp 1500ms on sec-title blocks */
  animate?: boolean;
}

export function SecTitle({
  subTitle,
  title,
  text,
  align = "center",
  className,
  animate = true,
}: SecTitleProps) {
  const inner = (
    <>
      {subTitle && (
        <SplitTextReveal variant="subtitle" className="is-sub-title block" text={subTitle} />
      )}
      <SplitTextReveal as="h2" variant="title" className="is-title" text={title} />
      {text && <p className="is-text">{text}</p>}
    </>
  );

  if (!animate) {
    return <div className={cn("is-sec-title", align === "left" && "is-left", className)}>{inner}</div>;
  }

  return (
    <WowReveal duration={1500} className={cn("is-sec-title", align === "left" && "is-left", className)}>
      {inner}
    </WowReveal>
  );
}
