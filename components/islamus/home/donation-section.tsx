import Image from "next/image";
import { DonationForm } from "@/components/islamus/ui/donation-form";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";

export function DonationSection() {
  return (
    <section className="is-donation-section">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image src="/theme/shape/donation-bg.png" alt="" fill className="object-cover" />
      </div>
      <div className="is-container relative z-[2]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <WowReveal>
            <span className="text-[var(--theme-color1)] font-semibold uppercase tracking-wider text-sm">
              Make a Donation
            </span>
            <h2 className="is-title mt-4 text-white text-4xl lg:text-5xl">
              Your Donation Can Change Lives
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>
            <DonationForm />
          </WowReveal>
          <WowReveal delay={300} className="relative hidden lg:block">
            <Image
              src="/theme/donation/donation-image.jpg"
              alt="Donation"
              width={500}
              height={400}
              className="rounded-2xl"
            />
            <Image
              src="/theme/shape/donation-shape.png"
              alt=""
              width={100}
              height={100}
              className="is-bounce-y absolute -bottom-4 -left-4"
            />
          </WowReveal>
        </div>
      </div>
    </section>
  );
}
