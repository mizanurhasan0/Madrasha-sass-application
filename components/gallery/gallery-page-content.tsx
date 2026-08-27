"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { CardSkeleton } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { DateDisplay } from "@/components/common/format-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { galleryService } from "@/services/gallery.service";
import type { GalleryAlbum, GalleryImage } from "@/types/gallery";

const categories = ["Events", "Sports", "Academic", "Campus", "Ceremony"];

type PendingUpload = {
  id: string;
  name: string;
  preview: string;
};

export function GalleryPageContent() {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryAlbum | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [category, setCategory] = useState(categories[0]);

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    const res = await galleryService.getAlbums({ limit: 50 });
    if (res.success) {
      setAlbums(res.data.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAlbums();
  }, [loadAlbums]);

  const loadImages = useCallback(async (albumId: string) => {
    const res = await galleryService.getImages(albumId);
    if (res.success) {
      setImages(res.data);
    }
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      loadImages(selectedAlbum.id);
      setPendingUploads([]);
    }
  }, [selectedAlbum, loadImages]);

  const handleCreateAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const res = await galleryService.createAlbum({
      title: form.get("title") as string,
      category,
      coverImage:
        (form.get("coverImage") as string) ||
        "https://images.unsplash.com/photo-1564769625905-50d9c1d2d8c8?w=600",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setSubmitting(false);
    if (res.success) {
      toast.success("Album created");
      setModalOpen(false);
      loadAlbums();
    } else {
      toast.error("Failed to create album");
    }
  };

  const handleDeleteAlbum = async () => {
    if (!deleteTarget) return;
    const res = await galleryService.deleteAlbum(deleteTarget.id);
    if (res.success) {
      toast.success("Album deleted");
      if (selectedAlbum?.id === deleteTarget.id) {
        setSelectedAlbum(null);
        setImages([]);
      }
      setDeleteTarget(null);
      loadAlbums();
    } else {
      toast.error("Failed to delete album");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const uploads = files.map((file) => ({
      id: `pending_${Date.now()}_${file.name}`,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));
    setPendingUploads((prev) => [...prev, ...uploads]);
    e.target.value = "";
  };

  const handleMockUpload = () => {
    if (!selectedAlbum || pendingUploads.length === 0) return;
    const newImages: GalleryImage[] = pendingUploads.map((u, i) => ({
      id: u.id,
      albumId: selectedAlbum.id,
      url: u.preview,
      caption: u.name,
      madrasaId: selectedAlbum.madrasaId,
    }));
    setImages((prev) => [...prev, ...newImages]);
    setAlbums((prev) =>
      prev.map((a) =>
        a.id === selectedAlbum.id
          ? { ...a, imageCount: a.imageCount + pendingUploads.length }
          : a
      )
    );
    setSelectedAlbum((prev) =>
      prev ? { ...prev, imageCount: prev.imageCount + pendingUploads.length } : null
    );
    toast.success(`${pendingUploads.length} photo(s) uploaded`);
    setPendingUploads([]);
  };

  const removePending = (id: string) => {
    setPendingUploads((prev) => prev.filter((u) => u.id !== id));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Gallery" description="Manage photo albums for the madrasa website." />
        <CardSkeleton count={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery"
        description="Organize photo albums and upload images for the public gallery."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-1.5 size-4" />
            New Album
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-1">
          <h3 className="font-semibold">Albums</h3>
          {albums.length === 0 ? (
            <EmptyState
              title="No albums"
              description="Create an album to start uploading photos."
              action={{ label: "Create Album", onClick: () => setModalOpen(true) }}
            />
          ) : (
            <div className="space-y-2">
              {albums.map((album) => (
                <button
                  key={album.id}
                  type="button"
                  onClick={() => setSelectedAlbum(album)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-muted/50 ${
                    selectedAlbum?.id === album.id ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20" : ""
                  }`}
                >
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{album.title}</p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-[10px]">
                        {album.category}
                      </Badge>
                      <span>{album.imageCount} photos</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(album);
                    }}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedAlbum ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{selectedAlbum.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAlbum.category} · Created{" "}
                    <DateDisplay date={selectedAlbum.createdAt} />
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-dashed p-6">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Upload className="size-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Upload Photos</p>
                    <p className="text-sm text-muted-foreground">
                      Select images to add to this album (mock upload)
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="max-w-xs"
                    onChange={handleFileSelect}
                  />
                </div>

                {pendingUploads.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {pendingUploads.map((upload) => (
                        <div key={upload.id} className="group relative">
                          <div className="relative size-20 overflow-hidden rounded-lg border">
                            <Image
                              src={upload.preview}
                              alt={upload.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePending(upload.id)}
                            className="absolute -right-1 -top-1 rounded-full bg-destructive p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleMockUpload}>
                      <Upload className="mr-1.5 size-4" />
                      Upload {pendingUploads.length} Photo(s)
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {images.map((img) => (
                  <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border">
                    <Image
                      src={img.url}
                      alt={img.caption ?? "Gallery photo"}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized
                    />
                    {img.caption && (
                      <p className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-2 py-1 text-xs text-white">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {images.length === 0 && pendingUploads.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  No photos in this album yet. Upload some above.
                </p>
              )}
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed">
              <p className="text-sm text-muted-foreground">Select an album to manage photos</p>
            </div>
          )}
        </div>
      </div>

      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Create Album"
        description="Add a new photo album to the gallery."
      >
        <form onSubmit={handleCreateAlbum} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Album Title</Label>
            <Input id="title" name="title" required placeholder="e.g. Annual Milad 2025" />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => v && setCategory(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              name="coverImage"
              type="url"
              placeholder="https://..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Album"}
            </Button>
          </div>
        </form>
      </FormModal>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Album"
        description={`Delete "${deleteTarget?.title}" and all its photos?`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDeleteAlbum}
      />
    </div>
  );
}
