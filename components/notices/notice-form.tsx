"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { classes } from "@/data/academic";
import type { Notice, NoticeAudience, NoticeCategory } from "@/types/notice";

const categories: { value: NoticeCategory; label: string }[] = [
  { value: "general", label: "General" },
  { value: "academic", label: "Academic" },
  { value: "exam", label: "Exam" },
  { value: "holiday", label: "Holiday" },
  { value: "fee", label: "Fee" },
  { value: "admission", label: "Admission" },
];

const audiences: { value: NoticeAudience; label: string }[] = [
  { value: "everyone", label: "Everyone" },
  { value: "teachers", label: "Teachers" },
  { value: "guardians", label: "Guardians" },
  { value: "class", label: "Specific Class" },
];

export type NoticeFormData = Omit<Notice, "id" | "madrasaId">;

type NoticeFormProps = {
  initial?: Partial<NoticeFormData>;
  onSubmit: (data: NoticeFormData) => void;
  onCancel: () => void;
  submitting?: boolean;
};

const defaultValues: NoticeFormData = {
  title: "",
  category: "general",
  description: "",
  publishDate: new Date().toISOString().split("T")[0],
  audience: "everyone",
  published: false,
};

export function NoticeForm({ initial, onSubmit, onCancel, submitting }: NoticeFormProps) {
  const values = { ...defaultValues, ...initial };
  const [category, setCategory] = useState<NoticeCategory>(values.category);
  const [audience, setAudience] = useState<NoticeAudience>(values.audience);
  const [targetClassId, setTargetClassId] = useState(values.targetClassId ?? "");
  const [published, setPublished] = useState(values.published);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSubmit({
      title: form.get("title") as string,
      category,
      description: form.get("description") as string,
      publishDate: form.get("publishDate") as string,
      audience,
      targetClassId: audience === "class" ? targetClassId : undefined,
      published,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={values.title} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => v && setCategory(v as NoticeCategory)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Audience</Label>
          <Select value={audience} onValueChange={(v) => v && setAudience(v as NoticeAudience)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {audiences.map((a) => (
                <SelectItem key={a.value} value={a.value}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {audience === "class" && (
        <div className="space-y-2">
          <Label>Target Class</Label>
          <Select value={targetClassId} onValueChange={(v) => v && setTargetClassId(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="publishDate">Publish Date</Label>
        <Input
          id="publishDate"
          name="publishDate"
          type="date"
          defaultValue={values.publishDate}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={values.description}
          required
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-3">
        <div>
          <Label htmlFor="published">Publish immediately</Label>
          <p className="text-xs text-muted-foreground">Visible to the selected audience</p>
        </div>
        <Switch id="published" checked={published} onCheckedChange={setPublished} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial?.title ? "Update Notice" : "Create Notice"}
        </Button>
      </div>
    </form>
  );
}
