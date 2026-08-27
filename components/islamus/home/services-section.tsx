import { services } from "@/data/islamus/content";
import { ServiceCard } from "@/components/islamus/ui/service-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

export function ServicesSection() {
  return (
    <section className="is-pt-120 is-pb-120">
      <div className="is-container">
        <SecTitle
          subTitle="Our Services"
          title="Programs & Services"
          text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <WowReveal key={s.slug} delay={wowStaggerDelay(i)}>
              <ServiceCard {...s} />
            </WowReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
