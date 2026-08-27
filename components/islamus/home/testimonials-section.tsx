"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { testimonials } from "@/data/islamus/content";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(1);
  const slides = [...testimonials, ...testimonials.slice(0, 2)];

  return (
    <section className="is-pb-120 bg-[var(--theme-color-gray)] is-pt-120">
      <div className="is-container">
        <SecTitle
          subTitle="Testimonial"
          title="Stories of Hope and Change"
          animate={false}
        />
        <Swiper
          modules={[Scrollbar]}
          className="is-testi-swiper !pb-14"
          speed={1200}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
            1400: { slidesPerView: 4 },
          }}
          scrollbar={{ draggable: true, el: ".is-testi-scrollbar" }}
          onSlideChange={(swiper: SwiperType) => setCurrent(swiper.realIndex + 1)}
        >
          {slides.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] h-full">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-[var(--text-color)]">{t.role}</p>
                  </div>
                </div>
                <div className="mb-3 flex gap-1 text-[var(--review-color)]">
                  {"★★★★★"}
                </div>
                <p className="text-[var(--text-color)] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="is-testi-scrollbar mt-4 h-1 rounded-full bg-[#e5e7e0]" />
        <p className="mt-4 text-center text-sm font-semibold text-[var(--theme-color3)]">
          {String(current).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
