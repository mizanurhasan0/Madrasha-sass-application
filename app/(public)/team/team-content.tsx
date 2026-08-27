import { team } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { TeamCard } from "@/components/islamus/ui/team-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

export function TeamContent() {
  return (
    <>
      <PageTitle title="Our Team" breadcrumb={[{ label: "Home", href: "/" }, { label: "Team" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <SecTitle subTitle="Team" title="Meet Our Scholars" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <WowReveal key={m.slug} delay={wowStaggerDelay(i)}>
                <TeamCard {...m} />
              </WowReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
