import Image from "next/image";
import { siteInfo } from "@/data/islamus/content";
import { SecTitle } from "@/components/islamus/ui/sec-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { WowReveal } from "@/components/islamus/animations/wow-reveal";

export function ContactSection() {
  return (
    <section className="is-pb-120 bg-[var(--theme-color-gray)] is-pt-120">
      <div className="is-container">
        <SecTitle
          subTitle="Contact Us"
          title="Get In Touch With Us"
          text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <WowReveal>
            <form className="space-y-4 rounded-2xl bg-white p-8 shadow-[var(--shadow-soft)]">
              <input type="text" placeholder="Your Name" className="is-form-input" />
              <input type="email" placeholder="Email Address" className="is-form-input" />
              <input type="text" placeholder="Subject" className="is-form-input" />
              <textarea placeholder="Write Message" rows={5} className="is-form-input resize-none" />
              <ThemeBtn type="submit" variant="one">
                Send Message
              </ThemeBtn>
            </form>
          </WowReveal>
          <WowReveal delay={300}>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Address</h4>
                <p className="text-[var(--text-color)]">{siteInfo.address}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Phone</h4>
                <p className="text-[var(--text-color)]">{siteInfo.phone}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Email</h4>
                <p className="text-[var(--text-color)]">{siteInfo.email}</p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image src="/theme/contact/contact-image.jpg" alt="Contact" fill className="object-cover" />
              </div>
            </div>
          </WowReveal>
        </div>
      </div>
    </section>
  );
}
