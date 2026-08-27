import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/islamus/content";
import { PageTitle } from "@/components/islamus/layout/page-title";

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((b) => b.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageTitle
        title={post.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: post.title },
        ]}
      />
      <section className="is-pt-120 is-pb-120">
        <div className="is-container max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <span className="is-blog-date">{post.date}</span>
          <h2 className="is-title mt-4">{post.title}</h2>
          <div className="mt-6 space-y-4 text-[var(--text-color)] leading-relaxed">
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
          </div>
        </div>
      </section>
    </>
  );
}
