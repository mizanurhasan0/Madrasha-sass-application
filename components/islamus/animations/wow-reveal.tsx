"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WowRevealProps {
  children: React.ReactNode;
  className?: string;
  /** delay in ms — theme uses .3s / .5s / .7s */
  delay?: number;
  /** duration in ms — sec-title uses 1500 */
  duration?: number;
}

function isMobileAgent() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function WowReveal({
  children,
  className,
  delay = 0,
  duration = 1000,
}: WowRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => setDisabled(reduced.matches || isMobileAgent());
    check();
    reduced.addEventListener("change", check);
    return () => reduced.removeEventListener("change", check);
  }, []);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // WOW.js: hidden until in view (offset 0)
    const checkVisible = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const offset = 0;
      const visibleY = rect.top <= viewH - offset && rect.bottom >= offset;
      if (visibleY) {
        setVisible(true);
        return true;
      }
      return false;
    };

    if (checkVisible()) return;

    const onScroll = () => {
      if (checkVisible()) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [disabled]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "wow fadeInUp",
        !visible && "wow-hidden",
        visible && "wow-animate animated fadeInUp",
        className
      )}
      style={
        visible
          ? ({
              "--wow-delay": `${delay}ms`,
              "--wow-duration": `${duration}ms`,
              animationDuration: `${duration}ms`,
              animationDelay: `${delay}ms`,
            } as React.CSSProperties)
          : { visibility: "hidden" }
      }
    >
      {children}
    </div>
  );
}
