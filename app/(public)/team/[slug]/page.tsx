import Image from "next/image";
import { notFound } from "next/navigation";
import { team } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <>
      <PageTitle
        title={member.name}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Team", href: "/team" },
          { label: member.name },
        ]}
      />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container max-w-3xl text-center">
          <Image
            src={member.image}
            alt={member.name}
            width={200}
            height={200}
            className="rounded-full mx-auto mb-6"
          />
          <h2 className="is-title">{member.name}</h2>
          <p className="mt-2 text-[var(--theme-color3)] font-medium">{member.role}</p>
          <p className="mt-6 text-[var(--text-color)] leading-relaxed">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
          </p>
        </div>
      </section>
    </>
  );
}
