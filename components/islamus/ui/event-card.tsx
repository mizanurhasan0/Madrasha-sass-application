import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  slug: string;
  title: string;
  date: string;
  time: string;
  text: string;
  image: string;
}

export function EventCard({ slug, title, date, time, text, image }: EventCardProps) {
  return (
    <div className="is-event-card">
      <Link href={`/events/${slug}`}>
        <Image src={image} alt={title} width={400} height={250} />
      </Link>
      <div className="is-event-body">
        <span className="is-event-date">{date}</span>
        <h3 className="is-cause-title text-lg">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h3>
        <p className="text-sm text-[var(--theme-color3)] font-medium">{time}</p>
        <p className="mt-2 text-sm text-[var(--text-color)]">{text}</p>
      </div>
    </div>
  );
}
