import { faqs } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { FaqAccordion } from "@/components/islamus/ui/faq-accordion";
import { SecTitle } from "@/components/islamus/ui/sec-title";

export function FaqContent() {
  return (
    <>
      <PageTitle title="FAQ" breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container max-w-3xl">
          <SecTitle subTitle="FAQ" title="Frequently Asked Questions" />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
