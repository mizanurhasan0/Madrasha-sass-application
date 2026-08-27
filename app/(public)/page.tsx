import { BenefitsSection } from "@/components/marketing/benefits-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { HomeMarquee } from "@/components/marketing/home-marquee";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { MadrasaFeatures } from "@/components/marketing/madrasa-features";
import { StatsBand } from "@/components/marketing/stats-band";
import { Testimonials } from "@/components/marketing/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <FeatureGrid />
      <HowItWorks />
      <MadrasaFeatures />
      <BenefitsSection />
      <HomeMarquee />
      <Testimonials />
      <FaqSection />
      <CtaBand />
    </>
  );
}
