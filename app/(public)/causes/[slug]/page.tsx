import Image from "next/image";
import { notFound } from "next/navigation";
import { causes } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { CountBar } from "@/components/islamus/animations/count-bar";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { DonationForm } from "@/components/islamus/ui/donation-form";

export function generateStaticParams() {
  return causes.map((c) => ({ slug: c.slug }));
}

export default async function CauseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cause = causes.find((c) => c.slug === slug);
  if (!cause) notFound();

  return (
    <>
      <PageTitle
        title={cause.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Causes", href: "/causes" },
          { label: cause.tag },
        ]}
      />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={cause.image} alt={cause.title} fill className="object-cover" />
            </div>
            <div>
              <span className="is-cause-tag">{cause.tag}</span>
              <h2 className="is-title mt-4">{cause.title}</h2>
              <p className="mt-4 text-[var(--text-color)]">{cause.text}</p>
              <CountBar percent={cause.progress} className="mt-6" />
              <div className="mt-4 flex justify-between font-semibold">
                <span>Raised: {cause.raised}</span>
                <span>Goal: {cause.goal}</span>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Make a Donation</h3>
                <DonationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
