import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "one" | "two" | "five" | "six";

const variantClass: Record<Variant, string> = {
  one: "is-btn is-btn-one",
  two: "is-btn is-btn-two",
  five: "is-btn is-btn-five",
  six: "is-btn is-btn-six",
};

interface ThemeBtnProps {
  href?: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function ThemeBtn({
  href,
  variant = "one",
  children,
  className,
  showArrow,
  onClick,
  type = "button",
}: ThemeBtnProps) {
  const cls = cn(variantClass[variant], className);
  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="size-4" />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  );
}
