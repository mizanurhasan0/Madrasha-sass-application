"use client";

import { useEffect } from "react";
import { getAdvanceSpread } from "@/lib/advance-spread";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cleanups: (() => void)[] = [];

    // GSAP image reveal (.reveal) — used on inner pages
    gsap.utils.toArray<HTMLElement>(".reveal, .is-image-reveal").forEach((container) => {
      const image = container.querySelector("img");
      if (!image) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: container, toggleActions: "play none none none", once: true },
      });
      tl.set(container, { autoAlpha: 1 });
      tl.from(container, { xPercent: -100, duration: 1.5, ease: "power2.out" });
      tl.from(image, { xPercent: 100, scale: 1.3, duration: 1.5, ease: "power2.out" }, "-=1.5");
      cleanups.push(() => tl.scrollTrigger?.kill());
    });

    // Background parallax (.bg-parallax / .is-parallax-bg)
    gsap.utils.toArray<HTMLElement>(".bg-parallax, .is-parallax-bg").forEach((el) => {
      const tween = gsap.to(el, {
        backgroundPosition: "70% 75%",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      cleanups.push(() => tween.scrollTrigger?.kill());
    });

    // Team / advance-wrap — cards fan out on scroll (any item count)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1200px)", () => {
      document.querySelectorAll(".is-advance-wrap").forEach((wrap) => {
        const items = gsap.utils.toArray<HTMLElement>(".is-advance-item", wrap);
        if (items.length < 2) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
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

        cleanups.push(() => tl.scrollTrigger?.kill());
      });
    });
    cleanups.push(() => mm.revert());

    // Event cards fold/stack on scroll (theme .oit-panel-pin)
    const panelMm = gsap.matchMedia();
    panelMm.add("(min-width: 1199px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".is-panel-pin");
      const triggers = panels.map((panel) => {
        const startVal = panel.dataset.start || "top 30%";
        const endVal = panel.dataset.end || "bottom 50%";
        return gsap.fromTo(
          panel,
          {
            transformOrigin: "100% 0% 0px",
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          },
          {
            yPercent: 5,
            rotate: 20,
            scale: 0.75,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              pin: true,
              scrub: 1,
              start: startVal,
              end: endVal,
              endTrigger: ".is-panel-pin-area",
              pinSpacing: false,
              anticipatePin: 1,
            },
          }
        ).scrollTrigger;
      });
      ScrollTrigger.refresh();
      return () => {
        triggers.forEach((t) => t?.kill());
      };
    });
    cleanups.push(() => panelMm.revert());

    // Banner image parallax
    gsap.utils.toArray<HTMLElement>(".is-banner-parallax img").forEach((image) => {
      const tween = gsap.fromTo(
        image,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".is-banner-parallax"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
      cleanups.push(() => tween.scrollTrigger?.kill());
    });

    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
