import { causes } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { CauseCard } from "@/components/islamus/ui/cause-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

export function CausesContent() {
  return (
    <>
      <PageTitle title="Our Causes" breadcrumb={[{ label: "Home", href: "/" }, { label: "Causes" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <SecTitle subTitle="Donation" title="Support Our Causes" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {causes.map((c, i) => (
              <WowReveal key={c.slug} delay={wowStaggerDelay(i)}>
                <CauseCard {...c} />
              </WowReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
