import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface EventFoldCardProps {
  slug: string;
  title: string;
  topic: string;
  date: string;
  time: string;
  text: string;
  image: string;
}

function parseDate(date: string) {
  const [month, day] = date.split(" ");
  return { month: month ?? "", day: day ?? "" };
}

export function EventFoldCard({ slug, title, topic, date, time, text, image }: EventFoldCardProps) {
  const { month, day } = parseDate(date);

  return (
    <div className="is-event-fold-inner">
      <div className="is-event-fold-image">
        <figure className="is-event-fold-figure">
          <Image src={image} alt={title} fill className="is-event-fold-img is-event-fold-img-hover" sizes="(max-width:768px) 100vw, 40vw" />
          <Image src={image} alt="" fill className="is-event-fold-img is-event-fold-img-base" sizes="(max-width:768px) 100vw, 40vw" aria-hidden />
          <div className="is-event-fold-date">
            {month} <span>{day}</span>
          </div>
        </figure>
      </div>
      <div className="is-event-fold-content">
        <h3 className="is-event-fold-title">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h3>
        <p className="is-event-fold-text">{text}</p>
        <div className="is-event-fold-info">
          <div>
            <p className="is-event-fold-info-row">
              <span>Topic:</span> {topic}
            </p>
            <p className="is-event-fold-info-row">
              <span>Time:</span> {time}
            </p>
          </div>
          <Link href="/contact" className="is-btn is-btn-three">
            Join Now
            <span className="is-btn-three-arrow">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
