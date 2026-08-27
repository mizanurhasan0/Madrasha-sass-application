"use client";

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

const sectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  classId: z.string().min(1, "Class is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  status: z.enum(["active", "inactive", "pending", "suspended"]),
});

type SectionFormValues = z.infer<typeof sectionSchema>;

type SectionFormProps = {
  defaultClassId?: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export function SectionForm({ defaultClassId, onSuccess, onCancel }: SectionFormProps) {
  const classes = academicService.getAllClasses();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      name: "",
      classId: defaultClassId ?? "",
      capacity: 20,
      status: "active",
    },
  });

  const classId = watch("classId");
  const status = watch("status");

  const onSubmit = async (values: SectionFormValues) => {
    const result = await academicService.createSection({
      name: values.name,
      classId: values.classId,
      capacity: values.capacity,
      status: values.status,
    });

    if (result.success) {
      toast.success("Section created successfully");
      onSuccess();
    } else {
      toast.error(result.message ?? "Failed to create section");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Class</Label>
        <Select value={classId} onValueChange={(v) => v && setValue("classId", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.classId && (
          <p className="text-xs text-destructive">{errors.classId.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Section Name</Label>
          <Input id="name" {...register("name")} placeholder="A" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
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
        <Select value={status} onValueChange={(v) => v && setValue("status", v as SectionFormValues["status"])}>
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
          Add Section
        </Button>
      </div>
    </form>
  );
}
