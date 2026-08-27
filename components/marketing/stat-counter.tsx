"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ParsedStat = {
  end: number;
  suffix: string;
  decimals: number;
};

function parseStatValue(value: string): ParsedStat {
  const suffix = value.endsWith("%") ? "%" : value.endsWith("+") ? "+" : "";
  const numStr = value.replace(/[,+%]/g, "");
  const end = Number.parseFloat(numStr) || 0;
  const dot = numStr.indexOf(".");
  const decimals = dot >= 0 ? numStr.length - dot - 1 : 0;
  return { end, suffix, decimals };
}

function formatStatValue(n: number, decimals: number, suffix: string): string {
  return (
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix
  );
}

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - 2 ** (-10 * t);
}

type StatCounterProps = {
  value: string;
  label: string;
  delay?: number;
  className?: string;
};

export function StatCounter({ value, label, delay = 0, className }: StatCounterProps) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [display, setDisplay] = useState(() => formatStatValue(0, parsed.decimals, parsed.suffix));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const showFinal = () => {
      setDisplay(formatStatValue(parsed.end, parsed.decimals, parsed.suffix));
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      showFinal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const duration = 2000;
        const startAt = performance.now() + delay;

        const tick = (now: number) => {
          if (now < startAt) {
            requestAnimationFrame(tick);
            return;
          }

          const progress = Math.min((now - startAt) / duration, 1);
          const current = easeOutExpo(progress) * parsed.end;
          setDisplay(formatStatValue(current, parsed.decimals, parsed.suffix));

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [parsed.decimals, parsed.end, parsed.suffix, delay]);

  return (
    <div
      ref={rootRef}
      className={cn("flex flex-col items-center justify-center px-2 text-center sm:px-3", className)}
    >
      <span
        className="font-heading text-[clamp(1.75rem,4vw+0.5rem,2.5rem)] font-semibold leading-none tabular-nums"
        aria-label={value}
      >
        {display}
      </span>
      <span className="mt-2 max-w-56 text-pretty text-xs leading-snug opacity-90 sm:mt-2.5 sm:text-sm">
        {label}
      </span>
    </div>
  );
}
