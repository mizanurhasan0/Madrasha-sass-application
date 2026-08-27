import Image from "next/image";
import { team } from "@/data/islamus/content";
import { TeamCard } from "@/components/islamus/ui/team-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";

export function TeamSection() {
  return (
    <section className="is-pt-120 is-pb-120 relative">
      <Image
        src="/theme/icon/obj-img-5.png"
        alt=""
        width={60}
        height={60}
        className="is-bounce-y absolute left-[5%] top-[20%] hidden lg:block"
      />
      <div className="is-container">
        <SecTitle subTitle="Our Teachers" title="Teachers & Scholars" />
        <div className="is-advance-wrap">
          {team.map((m) => (
            <div key={m.slug} className="is-advance-item">
              <TeamCard {...m} />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ThemeBtn href="/team" variant="one" showArrow>
            View All Team
          </ThemeBtn>
        </div>
      </div>
    </section>
  );
}
