"use client";

import Image from "next/image";
import { Reveal, wowStaggerDelay } from "./reveal";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={wowStaggerDelay(i, 80)}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
            <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform hover:scale-105" />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
