import type { PaginatedQuery } from "@/types/common";
import { galleryAlbums as initialAlbums, galleryImages as initialImages } from "@/data/gallery";
import type { GalleryAlbum, GalleryImage } from "@/types/gallery";
import { generateId, paginate, simulateLatency, success } from "./base.service";

let albumsStore = [...initialAlbums];
let imagesStore = [...initialImages];

export const galleryService = {
  async getAlbums(query?: PaginatedQuery) {
    await simulateLatency();
    return success(paginate(albumsStore, query));
  },

  async getImages(albumId: string) {
    await simulateLatency();
    return success(imagesStore.filter((i) => i.albumId === albumId));
  },

  async createAlbum(input: Omit<GalleryAlbum, "id" | "madrasaId" | "imageCount">) {
    await simulateLatency();
    const album: GalleryAlbum = { ...input, id: generateId("album"), imageCount: 0, madrasaId: "madrasa_alnoor" };
    albumsStore.push(album);
    return success(album);
  },

  async deleteAlbum(id: string) {
    await simulateLatency();
    albumsStore = albumsStore.filter((a) => a.id !== id);
    imagesStore = imagesStore.filter((i) => i.albumId !== id);
    return success(null);
  },

  getAllAlbums() {
    return albumsStore;
  },
};
