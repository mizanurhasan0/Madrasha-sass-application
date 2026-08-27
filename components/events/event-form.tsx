"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/notice";

export type EventFormData = Omit<Event, "id" | "madrasaId">;

type EventFormProps = {
  initial?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  submitting?: boolean;
};

const defaultValues: EventFormData = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  time: "10:00 AM",
  location: "",
  status: "upcoming",
};

const statusOptions = [
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function EventForm({ initial, onSubmit, onCancel, submitting }: EventFormProps) {
  const values = { ...defaultValues, ...initial };
  const [status, setStatus] = useState(values.status);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSubmit({
      title: form.get("title") as string,
      description: form.get("description") as string,
      date: form.get("date") as string,
      time: form.get("time") as string,
      location: form.get("location") as string,
      image: (form.get("image") as string) || undefined,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input id="title" name="title" defaultValue={values.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={values.description}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" defaultValue={values.date} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input id="time" name="time" defaultValue={values.time} placeholder="10:00 AM" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" defaultValue={values.location} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL (optional)</Label>
        <Input
          id="image"
          name="image"
          type="url"
          defaultValue={values.image ?? ""}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={status} onValueChange={(v) => v && setStatus(v as EventFormData["status"])}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial?.title ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
