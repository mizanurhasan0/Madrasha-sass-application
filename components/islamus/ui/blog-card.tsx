import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  image: string;
}

export function BlogCard({ slug, title, date, image }: BlogCardProps) {
  return (
    <div className="is-blog-card">
      <Link href={`/news/${slug}`}>
        <Image src={image} alt={title} width={400} height={250} />
      </Link>
      <div className="is-blog-body">
        <span className="is-blog-date">{date}</span>
        <h3 className="is-blog-title">
          <Link href={`/news/${slug}`}>{title}</Link>
        </h3>
      </div>
    </div>
  );
}
