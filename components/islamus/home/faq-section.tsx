import { faqs } from "@/data/islamus/content";
import { FaqAccordion } from "@/components/islamus/ui/faq-accordion";
import { SecTitle } from "@/components/islamus/ui/sec-title";

export function FaqSection() {
  return (
    <section className="is-pt-120 is-pb-120">
      <div className="is-container max-w-3xl">
        <SecTitle
          subTitle="FAQ"
          title="Frequently Asked Questions"
          text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />
        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
