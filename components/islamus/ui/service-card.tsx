import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  slug: string;
  title: string;
  text: string;
  image: string;
}

export function ServiceCard({ slug, title, text, image }: ServiceCardProps) {
  return (
    <Link href={`/services/${slug}`} className="is-service-card block">
      <Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
      <div className="is-service-overlay">
        <h3>{title}</h3>
        <p className="text-sm opacity-90">{text}</p>
      </div>
    </Link>
  );
}
