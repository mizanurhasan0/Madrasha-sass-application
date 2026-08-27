"use client";

import Image from "next/image";
import { useState } from "react";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";
import { SplitTextReveal } from "@/components/islamus/animations/split-text-reveal";

export function AboutSection() {
  const [tab, setTab] = useState<"mission" | "vision">("mission");

  return (
    <section className="is-pt-120 is-pb-120">
      <div className="is-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative grid grid-cols-2 gap-4">
            <WowReveal delay={300} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <figure className="is-overlay-anim relative h-full w-full">
                <Image src="/theme/about/about-image1.jpg" alt="About" fill className="object-cover" />
              </figure>
            </WowReveal>
            <WowReveal delay={500} className="relative aspect-[3/4] overflow-hidden rounded-2xl mt-12">
              <figure className="is-overlay-anim relative h-full w-full">
                <Image src="/theme/about/about-image2.jpg" alt="About" fill className="object-cover" />
              </figure>
            </WowReveal>
            <Image
              src="/theme/shape/about-leaf.png"
              alt=""
              width={80}
              height={80}
              className="is-bounce-y absolute -right-4 bottom-8"
            />
          </div>
          <div>
            <WowReveal duration={1500}>
              <SplitTextReveal variant="subtitle" className="is-sub-title block" text="Welcome to the islamic center" />
              <SplitTextReveal
                as="h2"
                variant="title"
                className="is-title mt-2"
                text="Your Spiritual Home Guided by the Qur'an and Sunnah"
              />
              <p className="is-text mt-4">
                Established in 1996, Islamus is dedicated to nurturing faith, knowledge, and unity within our community.
              </p>
            </WowReveal>
            <div className="mb-6 flex gap-4 mt-6">
              <button
                type="button"
                className={`is-btn ${tab === "mission" ? "is-btn-one" : "is-btn-two !text-[var(--headings-color)] !border-[#e5e7e0]"}`}
                onClick={() => setTab("mission")}
              >
                Our Mission
              </button>
              <button
                type="button"
                className={`is-btn ${tab === "vision" ? "is-btn-one" : "is-btn-two !text-[var(--headings-color)] !border-[#e5e7e0]"}`}
                onClick={() => setTab("vision")}
              >
                Our Vision
              </button>
            </div>
            <WowReveal delay={wowStaggerDelay(1)}>
              <p className="text-[var(--text-color)] leading-relaxed">
                {tab === "mission"
                  ? "There are many variations of passages of Lorem Ipsum avalab but the majority have suffered alteration in some form."
                  : "There are many variations of passages of Lorem Ipsum avalab but the majority have suffered alteration in some form."}
              </p>
            </WowReveal>
            <WowReveal delay={wowStaggerDelay(2)} className="mt-6">
              <ThemeBtn href="/about" variant="one" showArrow>
                Read More
              </ThemeBtn>
            </WowReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
