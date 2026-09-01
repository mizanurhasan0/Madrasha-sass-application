"use client";

import type { WebsiteGalleryMeta } from "@/types/website";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { Section } from "@/components/marketing/section";

const galleryItems = [
  { id: "1", src: "/theme/event/event-image1.jpg", alt: "Prayer hall" },
  { id: "2", src: "/theme/resource/project-details-1.jpg", alt: "Graduation ceremony" },
  { id: "3", src: "/theme/about/about-image1.jpg", alt: "Classroom" },
  { id: "4", src: "/theme/event/event-image2.jpg", alt: "Community event" },
  { id: "5", src: "/theme/service/service-image1.jpg", alt: "Science fair" },
  { id: "6", src: "/theme/service/service-image2.jpg", alt: "Library" },
];

export function GalleryContent({ meta }: { meta: WebsiteGalleryMeta }) {
  return (
    <>
      <MarketingPageHeader
        eyebrow="Gallery"
        title={meta.pageTitle}
        description={meta.pageSubtitle}
      />
      <Section>
        <p className="mb-8 text-muted-foreground">
          {meta.albumCount} albums · campus life and events
        </p>
        <GalleryGrid items={galleryItems} />
      </Section>
    </>
  );
}
