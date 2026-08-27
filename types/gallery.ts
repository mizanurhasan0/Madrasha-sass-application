export type GalleryAlbum = {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  imageCount: number;
  createdAt: string;
  madrasaId: string;
};

export type GalleryImage = {
  id: string;
  albumId: string;
  url: string;
  caption?: string;
  madrasaId: string;
};
