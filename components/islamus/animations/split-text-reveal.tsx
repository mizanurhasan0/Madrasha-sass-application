"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type SplitVariant = "banner" | "subtitle" | "title";

interface SplitTextRevealProps {
  text: string;
  variant?: SplitVariant;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
}

export function SplitTextReveal({
  text,
  variant = "title",
  className,
  as: Tag = "span",
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const chars = Array.from(el.querySelectorAll<HTMLElement>(".is-split-char"));
    if (!chars.length) return;

    const triggers: ScrollTrigger[] = [];

    if (variant === "banner") {
      const duration = window.innerWidth <= 768 ? 0.3 : 1;
      gsap.set(el, { perspective: 1000 });
      gsap.set(chars, {
        opacity: 0,
        rotateX: -80,
        transformOrigin: "center center -10px",
      });
      const tween = gsap.to(chars, {
        opacity: 1,
        rotateX: 0,
        duration,
        ease: "power3.out",
        stagger: { each: 0.05, from: "center" },
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    } else if (window.innerWidth >= 1200) {
      if (variant === "subtitle") {
        gsap.set(chars, { opacity: 0, x: 7 });
        const tween = gsap.to(chars, {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 60%", scrub: 1 },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      } else {
        gsap.set(chars, { opacity: 0.3, x: -7 });
        const tween = gsap.to(chars, {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 60%", scrub: 1 },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
    }

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [variant, text]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="is-split-char"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
