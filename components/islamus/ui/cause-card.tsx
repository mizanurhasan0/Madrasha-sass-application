import Image from "next/image";
import Link from "next/link";
import { CountBar } from "@/components/islamus/animations/count-bar";
import { ThemeBtn } from "./theme-btn";

interface CauseCardProps {
  slug: string;
  tag: string;
  title: string;
  text: string;
  raised: string;
  goal: string;
  progress: number;
  image: string;
}

export function CauseCard({ slug, tag, title, text, raised, goal, progress, image }: CauseCardProps) {
  return (
    <div className="is-cause-card">
      <Link href={`/causes/${slug}`}>
        <Image src={image} alt={title} width={400} height={300} />
      </Link>
      <div className="is-cause-body">
        <span className="is-cause-tag">{tag}</span>
        <h3 className="is-cause-title">
          <Link href={`/causes/${slug}`}>{title}</Link>
        </h3>
        <p className="text-sm text-[var(--text-color)]">{text}</p>
        <CountBar percent={progress} />
        <div className="flex justify-between text-sm font-semibold">
          <span>Raised: {raised}</span>
          <span>Goal: {goal}</span>
        </div>
        <div className="mt-4">
          <ThemeBtn href={`/causes/${slug}`} variant="six">
            Donate Now
          </ThemeBtn>
        </div>
      </div>
    </div>
  );
}
