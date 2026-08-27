import { blogPosts } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { BlogCard } from "@/components/islamus/ui/blog-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

export function NewsContent() {
  return (
    <>
      <PageTitle title="News" breadcrumb={[{ label: "Home", href: "/" }, { label: "News" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <SecTitle subTitle="News" title="Community News & Updates" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((b, i) => (
              <WowReveal key={b.slug} delay={wowStaggerDelay(i)}>
                <BlogCard {...b} />
              </WowReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
