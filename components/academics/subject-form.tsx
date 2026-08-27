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
import { teacherService } from "@/services/teacher.service";

const subjectSchema = z.object({
  name: z.string().min(2, "Subject name is required"),
  code: z.string().min(2, "Subject code is required"),
  classId: z.string().min(1, "Class is required"),
  teacherId: z.string().min(1, "Teacher is required"),
  type: z.enum(["core", "elective"]),
  status: z.enum(["active", "inactive", "pending", "suspended"]),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

type SubjectFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function SubjectForm({ onSuccess, onCancel }: SubjectFormProps) {
  const classes = academicService.getAllClasses();
  const teachers = teacherService.getAll();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      code: "",
      classId: "",
      teacherId: "",
      type: "core",
      status: "active",
    },
  });

  const classId = watch("classId");
  const teacherId = watch("teacherId");
  const type = watch("type");
  const status = watch("status");

  const onSubmit = async (values: SubjectFormValues) => {
    const result = await academicService.createSubject({
      name: values.name,
      code: values.code,
      classId: values.classId,
      teacherId: values.teacherId,
      type: values.type,
      status: values.status,
    });

    if (result.success) {
      toast.success("Subject created successfully");
      onSuccess();
    } else {
      toast.error(result.message ?? "Failed to create subject");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Subject Name</Label>
          <Input id="name" {...register("name")} placeholder="Quran & Tajweed" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Input id="code" {...register("code")} placeholder="QRT" />
          {errors.code && <p className="text-xs text-destructive">{errors.code.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
        <div className="space-y-2">
          <Label>Teacher</Label>
          <Select value={teacherId} onValueChange={(v) => v && setValue("teacherId", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select teacher" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.teacherId && (
            <p className="text-xs text-destructive">{errors.teacherId.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Type</Label>
          <Select value={type} onValueChange={(v) => v && setValue("type", v as SubjectFormValues["type"])}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="core">Core</SelectItem>
              <SelectItem value="elective">Elective</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => v && setValue("status", v as SubjectFormValues["status"])}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Add Subject
        </Button>
      </div>
    </form>
  );
}
