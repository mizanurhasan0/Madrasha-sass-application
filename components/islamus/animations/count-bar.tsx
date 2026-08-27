"use client";

import { cn } from "@/lib/utils";

interface CountBarProps {
  percent: number;
  className?: string;
}

/** Matches theme loadProgress CSS animation on .progress-fill */
export function CountBar({ percent, className }: CountBarProps) {
  return (
    <div className={cn("is-count-track", className)}>
      <div
        className="is-count-fill is-count-animate"
        style={{ "--progress-target": `${percent}%` } as React.CSSProperties}
      >
        <span className="is-count-thumb" />
      </div>
    </div>
  );
}
