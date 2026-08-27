"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teacherService } from "@/services/teacher.service";
import { academicService } from "@/services/academic.service";
import type { Teacher } from "@/types/teacher";

const teacherSchema = z.object({
  name: z.string().min(2, "Name is required"),
  nameBn: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  designation: z.string().min(2, "Designation is required"),
  subjects: z.string().min(1, "At least one subject is required"),
  classIds: z.string().min(1, "At least one class is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  address: z.string().min(2, "Address is required"),
  bio: z.string().optional(),
  status: z.enum(["active", "inactive", "pending", "suspended"]),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

type TeacherFormProps = {
  teacher?: Teacher;
  onSuccess: () => void;
  onCancel: () => void;
};

export function TeacherForm({ teacher, onSuccess, onCancel }: TeacherFormProps) {
  const classes = academicService.getAllClasses();
  const isEditing = Boolean(teacher);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: "",
      nameBn: "",
      email: "",
      phone: "",
      designation: "",
      subjects: "",
      classIds: "",
      joiningDate: new Date().toISOString().split("T")[0],
      address: "",
      bio: "",
      status: "active",
    },
  });

  const status = watch("status");
  const classIds = watch("classIds");

  useEffect(() => {
    if (teacher) {
      reset({
        name: teacher.name,
        nameBn: teacher.nameBn ?? "",
        email: teacher.email,
        phone: teacher.phone,
        designation: teacher.designation,
        subjects: teacher.subjects.join(", "),
        classIds: teacher.classIds[0] ?? "",
        joiningDate: teacher.joiningDate,
        address: teacher.address,
        bio: teacher.bio ?? "",
        status: teacher.status,
      });
    }
  }, [teacher, reset]);

  const onSubmit = async (values: TeacherFormValues) => {
    const payload = {
      name: values.name,
      nameBn: values.nameBn || undefined,
      email: values.email,
      phone: values.phone,
      designation: values.designation,
      subjects: values.subjects.split(",").map((s) => s.trim()).filter(Boolean),
      classIds: values.classIds.split(",").map((s) => s.trim()).filter(Boolean),
      joiningDate: values.joiningDate,
      address: values.address,
      bio: values.bio || undefined,
      status: values.status,
    };

    const result = isEditing && teacher
      ? await teacherService.updateTeacher(teacher.id, payload)
      : await teacherService.createTeacher(payload);

    if (result.success) {
      toast.success(isEditing ? "Teacher updated successfully" : "Teacher added successfully");
      onSuccess();
    } else {
      toast.error(result.message ?? "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} placeholder="Sheikh Nurul Islam" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameBn">Name (Bangla)</Label>
          <Input id="nameBn" {...register("nameBn")} placeholder="Optional" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="teacher@example.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} placeholder="017XXXXXXXX" />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input id="designation" {...register("designation")} placeholder="Senior Hifz Teacher" />
          {errors.designation && (
            <p className="text-xs text-destructive">{errors.designation.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="joiningDate">Joining Date</Label>
          <Input id="joiningDate" type="date" {...register("joiningDate")} />
          {errors.joiningDate && (
            <p className="text-xs text-destructive">{errors.joiningDate.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjects">Subjects</Label>
        <Input
          id="subjects"
          {...register("subjects")}
          placeholder="Quran & Tajweed, Hadith (comma separated)"
        />
        {errors.subjects && <p className="text-xs text-destructive">{errors.subjects.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Class</Label>
          <Select value={classIds} onValueChange={(v) => v && setValue("classIds", v)}>
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
          {errors.classIds && (
            <p className="text-xs text-destructive">{errors.classIds.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => v && setValue("status", v as TeacherFormValues["status"])}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} placeholder="Mirpur, Dhaka" />
        {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" {...register("bio")} placeholder="Brief biography (optional)" rows={3} />
      </div>

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isEditing ? "Update Teacher" : "Add Teacher"}
        </Button>
      </div>
    </form>
  );
}
