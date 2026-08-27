"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonials } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import "swiper/css";
import "swiper/css/pagination";

export function TestimonialsContent() {
  return (
    <>
      <PageTitle title="Testimonials" breadcrumb={[{ label: "Home", href: "/" }, { label: "Testimonials" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <SecTitle subTitle="Testimonials" title="What Our Community Says" />
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="!pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)]">
                  <div className="flex items-center gap-4 mb-4">
                    <Image src={t.image} alt={t.name} width={60} height={60} className="rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-sm text-[var(--text-color)]">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-[var(--text-color)]">&ldquo;{t.quote}&rdquo;</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
