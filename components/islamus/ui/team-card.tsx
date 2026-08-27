import Image from "next/image";
import Link from "next/link";

interface TeamCardProps {
  slug: string;
  name: string;
  role: string;
  image: string;
}

export function TeamCard({ slug, name, role, image }: TeamCardProps) {
  return (
    <Link href={`/team/${slug}`} className="is-team-card block">
      <Image src={image} alt={name} width={180} height={180} />
      <h4>{name}</h4>
      <p>{role}</p>
    </Link>
  );
}
