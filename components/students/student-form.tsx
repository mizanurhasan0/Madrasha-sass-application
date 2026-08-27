"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
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
import { academicService } from "@/services/academic.service";
import { guardians } from "@/data/guardians";
import type { Class, Section } from "@/types/academic";
import type { Student } from "@/types/student";

const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  nameBn: z.string().optional(),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  bloodGroup: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().min(3, "Address is required"),
  classId: z.string().min(1, "Class is required"),
  sectionId: z.string().min(1, "Section is required"),
  guardianId: z.string().min(1, "Guardian is required"),
  admissionDate: z.string().min(1, "Admission date is required"),
});

export type StudentFormValues = z.infer<typeof studentSchema>;

type StudentFormProps = {
  defaultValues?: Partial<Student>;
  onSubmit: (values: StudentFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
};

export function StudentForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save Student",
}: StudentFormProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      nameBn: defaultValues?.nameBn ?? "",
      gender: defaultValues?.gender ?? "male",
      dateOfBirth: defaultValues?.dateOfBirth ?? "",
      bloodGroup: defaultValues?.bloodGroup ?? "",
      phone: defaultValues?.phone ?? "",
      address: defaultValues?.address ?? "",
      classId: defaultValues?.classId ?? "",
      sectionId: defaultValues?.sectionId ?? "",
      guardianId: defaultValues?.guardianId ?? "",
      admissionDate: defaultValues?.admissionDate ?? new Date().toISOString().split("T")[0],
    },
  });

  const selectedClassId = watch("classId");

  useEffect(() => {
    async function loadOptions() {
      const [classesRes, sectionsRes] = await Promise.all([
        academicService.getClasses({ limit: 100 }),
        academicService.getSections(),
      ]);
      if (classesRes.success) setClasses(classesRes.data.data);
      if (sectionsRes.success) setSections(sectionsRes.data);
      setLoadingOptions(false);
    }
    loadOptions();
  }, []);

  useEffect(() => {
    if (selectedClassId && defaultValues?.classId !== selectedClassId) {
      setValue("sectionId", "");
    }
  }, [selectedClassId, setValue, defaultValues?.classId]);

  const filteredSections = sections.filter((s) => s.classId === selectedClassId);

  const handleFormSubmit = async (values: StudentFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingOptions) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Student full name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nameBn">Name (Bangla)</Label>
          <Input id="nameBn" placeholder="বাংলা নাম" {...register("nameBn")} />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
          {errors.dateOfBirth && (
            <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Input id="bloodGroup" placeholder="e.g. A+" {...register("bloodGroup")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="01XXXXXXXXX" {...register("phone")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admissionDate">Admission Date</Label>
          <Input id="admissionDate" type="date" {...register("admissionDate")} />
          {errors.admissionDate && (
            <p className="text-xs text-destructive">{errors.admissionDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Class</Label>
          <Controller
            name="classId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                <SelectTrigger>
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
            )}
          />
          {errors.classId && <p className="text-xs text-destructive">{errors.classId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Section</Label>
          <Controller
            name="sectionId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => v && field.onChange(v)}
                disabled={!selectedClassId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedClassId ? "Select section" : "Select class first"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredSections.map((sec) => (
                    <SelectItem key={sec.id} value={sec.id}>
                      Section {sec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.sectionId && (
            <p className="text-xs text-destructive">{errors.sectionId.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>Guardian</Label>
          <Controller
            name="guardianId"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guardian" />
                </SelectTrigger>
                <SelectContent>
                  {guardians.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name} ({g.relation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.guardianId && (
            <p className="text-xs text-destructive">{errors.guardianId.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" placeholder="Full address" rows={2} {...register("address")} />
          {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Saving…
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
