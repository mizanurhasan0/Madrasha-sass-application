"use client";

import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { Section } from "@/components/marketing/section";
import { useT } from "@/lib/i18n/locale-provider";

const galleryItems = [
  { id: "1", src: "https://images.unsplash.com/photo-1609599006353-e6290ab375e9?w=800", alt: "Prayer hall" },
  { id: "2", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", alt: "Graduation ceremony" },
  { id: "3", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800", alt: "Classroom" },
  { id: "4", src: "https://images.unsplash.com/photo-1564769625905-50d9c1d2d8c8?w=800", alt: "Community event" },
  { id: "5", src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800", alt: "Science fair" },
  { id: "6", src: "https://images.unsplash.com/photo-1456513080920-66766ef2d880?w=800", alt: "Library" },
];

export function GalleryContent() {
  const t = useT();

  return (
    <>
      <MarketingPageHeader
        eyebrow={t("galleryPage.eyebrow")}
        title={t("galleryPage.title")}
        description={t("galleryPage.subtitle")}
      />
      <Section>
        <p className="mb-8 text-muted-foreground">
          {t("galleryPage.photosCount", { count: galleryItems.length })}
        </p>
        <GalleryGrid items={galleryItems} />
      </Section>
    </>
  );
}
