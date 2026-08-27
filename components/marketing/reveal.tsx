"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export function wowStaggerDelay(index: number, base = 100) {
  return index * base;
}

export function Reveal({ children, className, delay = 0, duration = 1000 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(!visible && "wow-hidden", visible && "wow-animate", className)}
      style={
        visible
          ? ({
              "--wow-delay": `${delay}ms`,
              "--wow-duration": `${duration}ms`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
