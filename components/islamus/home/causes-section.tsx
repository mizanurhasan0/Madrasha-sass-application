import { causes } from "@/data/islamus/content";
import { CauseCard } from "@/components/islamus/ui/cause-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

export function CausesSection() {
  return (
    <section className="is-pb-120 bg-[var(--theme-color-gray)] is-pt-120">
      <div className="is-container">
        <SecTitle
          subTitle="Our Causes"
          title="Support Our Community Initiatives"
          text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {causes.map((c, i) => (
            <WowReveal key={c.slug} delay={wowStaggerDelay(i)}>
              <CauseCard {...c} />
            </WowReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
