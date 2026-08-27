"use client";

import { useEffect, useRef } from "react";
import { getAdvanceSpread } from "@/lib/advance-spread";
import { advanceSpreadItemClass } from "./layout";

/**
 * Scroll-scrubbed fan-out for stacked cards (desktop ≥1200px).
 * GSAP is loaded dynamically to avoid Turbopack HMR churn.
 */
export function useAdvanceSpread(itemSelector = `.${advanceSpreadItemClass}`) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let mm: { revert: () => void } | undefined;
    let cancelled = false;

    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !wrap) return;

      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();
      mm = media;

      media.add("(min-width: 1200px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(itemSelector, wrap);
        if (items.length < 2) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none", duration: 1 },
        });

        items.forEach((item, index) => {
          const spread = getAdvanceSpread(index, items.length);
          tl.fromTo(
            item,
            { xPercent: spread.xPercent, rotate: spread.rotate },
            { xPercent: 0, rotate: 0 },
            0
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }

    void init();

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [itemSelector]);

  return wrapRef;
}
