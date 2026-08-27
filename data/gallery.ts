import type { GalleryAlbum, GalleryImage } from "@/types/gallery";
import { MADRASA_ID } from "./users";

export const galleryAlbums: GalleryAlbum[] = [
  { id: "album_1", title: "Annual Milad 2024", category: "Events", coverImage: "https://images.unsplash.com/photo-1564769625905-50d9c1d2d8c8?w=600", imageCount: 12, createdAt: "2024-12-15", madrasaId: MADRASA_ID },
  { id: "album_2", title: "Sports Day 2024", category: "Sports", coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607cd7a40?w=600", imageCount: 24, createdAt: "2024-09-20", madrasaId: MADRASA_ID },
  { id: "album_3", title: "Hifz Completion Ceremony", category: "Academic", coverImage: "https://images.unsplash.com/photo-1609599006353-e6290ab375e9?w=600", imageCount: 18, createdAt: "2024-08-10", madrasaId: MADRASA_ID },
  { id: "album_4", title: "Campus Life", category: "Campus", coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600", imageCount: 30, createdAt: "2024-06-01", madrasaId: MADRASA_ID },
  { id: "album_5", title: "Quran Competition 2024", category: "Academic", coverImage: "https://images.unsplash.com/photo-1456513080920-66766ef2d880?w=600", imageCount: 15, createdAt: "2024-09-25", madrasaId: MADRASA_ID },
  { id: "album_6", title: "Ramadan Activities", category: "Events", coverImage: "https://images.unsplash.com/photo-1564769625905-50d9c1d2d8c8?w=600", imageCount: 20, createdAt: "2024-04-15", madrasaId: MADRASA_ID },
];

const imageUrls = [
  "https://images.unsplash.com/photo-1564769625905-50d9c1d2d8c8?w=800",
  "https://images.unsplash.com/photo-1609599006353-e6290ab375e9?w=800",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
  "https://images.unsplash.com/photo-1456513080920-66766ef2d880?w=800",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
];

export const galleryImages: GalleryImage[] = galleryAlbums.flatMap((album, ai) =>
  Array.from({ length: Math.min(album.imageCount, 6) }, (_, i) => ({
    id: `img_${ai}_${i}`,
    albumId: album.id,
    url: imageUrls[(ai + i) % imageUrls.length],
    caption: `${album.title} - Photo ${i + 1}`,
    madrasaId: MADRASA_ID,
  }))
);
