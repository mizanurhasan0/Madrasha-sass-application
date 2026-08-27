import Image from "next/image";
import { prayerTimes } from "@/data/islamus/content";
import { PrayerTimeRow } from "@/components/islamus/ui/prayer-time-row";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

const icons = [
  "/theme/icon/obj-img-1.png",
  "/theme/icon/obj-img-2.png",
  "/theme/icon/obj-img-3.png",
  "/theme/icon/obj-img-4.png",
  "/theme/icon/obj-img-5.png",
  "/theme/icon/obj-img-6.png",
];

export function PrayerTimesSection() {
  return (
    <section id="prayer-times" className="is-time-section">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image src="/theme/shape/time-bg.png" alt="" fill className="object-cover" />
      </div>
      <div className="is-container relative">
        <SecTitle
          subTitle="Prayer Times"
          title="Daily Prayer Schedule"
          text="Join us for congregational prayers throughout the day."
        />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {prayerTimes.map((p, i) => (
            <WowReveal key={p.name} delay={wowStaggerDelay(i)}>
              <PrayerTimeRow {...p} icon={icons[i] ?? icons[0]} />
            </WowReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
