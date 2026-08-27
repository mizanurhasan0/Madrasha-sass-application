"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
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
import { academicService } from "@/services/academic.service";
import type { AcademicSession } from "@/types/academic";

const classSchema = z.object({
  name: z.string().min(2, "Class name is required"),
  sessionId: z.string().min(1, "Session is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  status: z.enum(["active", "inactive", "pending", "suspended"]),
});

type ClassFormValues = z.infer<typeof classSchema>;

type ClassFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function ClassForm({ onSuccess, onCancel }: ClassFormProps) {
  const [sessions, setSessions] = useState<AcademicSession[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      sessionId: "",
      capacity: 30,
      status: "active",
    },
  });

  const sessionId = watch("sessionId");
  const status = watch("status");

  useEffect(() => {
    academicService.getSessions().then((res) => {
      if (res.success) {
        setSessions(res.data);
        const current = res.data.find((s) => s.isCurrent);
        if (current) setValue("sessionId", current.id);
      }
    });
  }, [setValue]);

  const onSubmit = async (values: ClassFormValues) => {
    const result = await academicService.createClass({
      name: values.name,
      sessionId: values.sessionId,
      capacity: values.capacity,
      status: values.status,
    });

    if (result.success) {
      toast.success("Class created successfully");
      onSuccess();
    } else {
      toast.error(result.message ?? "Failed to create class");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Class Name</Label>
        <Input id="name" {...register("name")} placeholder="Hifz (1st Year)" />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Academic Session</Label>
          <Select value={sessionId} onValueChange={(v) => v && setValue("sessionId", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.sessionId && (
            <p className="text-xs text-destructive">{errors.sessionId.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input id="capacity" type="number" {...register("capacity", { valueAsNumber: true })} />
          {errors.capacity && (
            <p className="text-xs text-destructive">{errors.capacity.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={status} onValueChange={(v) => v && setValue("status", v as ClassFormValues["status"])}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Add Class
        </Button>
      </div>
    </form>
  );
}
