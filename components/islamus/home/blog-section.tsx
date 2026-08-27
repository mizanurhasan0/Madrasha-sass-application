import { blogPosts } from "@/data/islamus/content";
import { BlogCard } from "@/components/islamus/ui/blog-card";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";
import { wowStaggerDelay } from "@/lib/wow-stagger";

export function BlogSection() {
  return (
    <section className="is-pt-120 is-pb-120">
      <div className="is-container">
        <SecTitle
          subTitle="Latest News"
          title="Community News & Updates"
          text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((b, i) => (
            <WowReveal key={b.slug} delay={wowStaggerDelay(i)}>
              <BlogCard {...b} />
            </WowReveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ThemeBtn href="/news" variant="one" showArrow>
            View All News
          </ThemeBtn>
        </div>
      </div>
    </section>
  );
}
