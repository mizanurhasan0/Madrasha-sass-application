import Image from "next/image";
import { notFound } from "next/navigation";
import { events } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <PageTitle
        title={event.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
          </div>
          <span className="is-event-date">{event.date}</span>
          <h2 className="is-title mt-4">{event.title}</h2>
          <p className="mt-2 font-medium text-[var(--theme-color3)]">{event.time}</p>
          <p className="mt-6 text-[var(--text-color)] leading-relaxed">{event.text}</p>
        </div>
      </section>
    </>
  );
}
