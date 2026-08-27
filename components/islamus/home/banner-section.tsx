import Image from "next/image";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { SplitTextReveal } from "@/components/islamus/animations/split-text-reveal";

export function BannerSection() {
  return (
    <section className="is-banner">
      <div className="is-banner-bg is-parallax-bg">
        <Image src="/theme/banner/banner-bg.jpg" alt="" fill priority className="object-cover" />
      </div>
      <div className="is-banner-overlay" />
      <Image
        src="/theme/shape/banner-leaf.png"
        alt=""
        width={120}
        height={120}
        className="is-arry-updown absolute right-[10%] top-[20%] z-[2] hidden md:block"
      />
      <div className="is-container is-banner-content w-full">
        <div className="grid items-end gap-12 lg:grid-cols-2">
          <div>
            <WowReveal delay={300}>
              <span className="is-sub-title">Bismillahir Rahmanir Rahim</span>
            </WowReveal>
            <SplitTextReveal
              as="h1"
              variant="banner"
              className="is-h1 mt-4"
              text="A Peaceful Place to Pray, Learn, and Belong."
            />
            <WowReveal delay={500} className="mt-8 flex flex-wrap gap-4">
              <ThemeBtn href="/about" variant="one" showArrow>
                Discover More
              </ThemeBtn>
              <ThemeBtn href="/contact" variant="two" showArrow>
                Listen the Quran
              </ThemeBtn>
            </WowReveal>
          </div>
          <div className="relative hidden lg:block">
            <div className="is-bounce-y is-banner-parallax relative aspect-[4/5] max-w-md ml-auto">
              <figure className="is-overlay-anim relative h-full w-full overflow-hidden rounded-3xl">
                <Image src="/theme/banner/banner-image.jpg" alt="Islamic Center" fill className="object-cover" />
              </figure>
              <Image
                src="/theme/shape/banner-image-bg.png"
                alt=""
                width={200}
                height={200}
                className="absolute -bottom-8 -right-8 -z-[1] opacity-80"
              />
            </div>
            <Image
              src="/theme/shape/banner-shape1.png"
              alt=""
              width={80}
              height={80}
              className="is-arry-updown absolute -left-8 top-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
