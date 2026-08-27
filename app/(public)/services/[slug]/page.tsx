import Image from "next/image";
import { notFound } from "next/navigation";
import { services } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <PageTitle
        title={service.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/" },
          { label: service.title },
        ]}
      />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
            </div>
            <div>
              <h2 className="is-title">{service.title}</h2>
              <p className="mt-4 text-[var(--text-color)] leading-relaxed">{service.text}</p>
              <p className="mt-4 text-[var(--text-color)] leading-relaxed">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <ThemeBtn href="/contact" variant="one" showArrow className="mt-6">
                Contact Us
              </ThemeBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
