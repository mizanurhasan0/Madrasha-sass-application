"use client";

import type { UseFormReturn } from "react-hook-form";
import { classes } from "@/data/academic";
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
import type { AdmissionFormValues } from "@/lib/admission/constants";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-destructive">{message}</p>;
}

type StepProps = {
  form: UseFormReturn<AdmissionFormValues>;
  values: AdmissionFormValues;
};

export function StudentInfoStep({ form, values }: StepProps) {
  const { register, formState } = form;
  return (
    <>
      <div>
        <Label htmlFor="studentName">Student Name *</Label>
        <Input id="studentName" className="mt-1.5" {...register("studentName")} />
        <FieldError message={formState.errors.studentName?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input id="dateOfBirth" type="date" className="mt-1.5" {...register("dateOfBirth")} />
        </div>
        <div>
          <Label>Gender *</Label>
          <Select
            value={values.gender}
            onValueChange={(v) => v && form.setValue("gender", v as "male" | "female")}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="address">Address *</Label>
        <Textarea id="address" rows={3} className="mt-1.5" {...register("address")} />
      </div>
    </>
  );
}

export function ProgramStep({ form, values }: StepProps) {
  return (
    <div>
      <Label>Select Program / Class *</Label>
      <Select value={values.classId} onValueChange={(v) => v && form.setValue("classId", v)}>
        <SelectTrigger className="mt-1.5">
          <SelectValue placeholder="Choose a program" />
        </SelectTrigger>
        <SelectContent>
          {classes.map((cls) => (
            <SelectItem key={cls.id} value={cls.id}>
              {cls.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function GuardianStep({ form }: Pick<StepProps, "form">) {
  const { register } = form;
  return (
    <>
      <div>
        <Label htmlFor="guardianName">Guardian Name *</Label>
        <Input id="guardianName" className="mt-1.5" {...register("guardianName")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="guardianPhone">Phone *</Label>
          <Input id="guardianPhone" className="mt-1.5" {...register("guardianPhone")} />
        </div>
        <div>
          <Label htmlFor="guardianRelation">Relation *</Label>
          <Input
            id="guardianRelation"
            placeholder="Father / Mother"
            className="mt-1.5"
            {...register("guardianRelation")}
          />
        </div>
      </div>
    </>
  );
}

export function ReviewStep({ values, programName }: { values: AdmissionFormValues; programName?: string }) {
  return (
    <div className="space-y-3 text-sm">
      <h3 className="font-semibold">Review your application</h3>
      <p><strong>Student:</strong> {values.studentName}</p>
      <p><strong>DOB:</strong> {values.dateOfBirth}</p>
      <p><strong>Gender:</strong> {values.gender}</p>
      <p><strong>Address:</strong> {values.address}</p>
      <p><strong>Program:</strong> {programName ?? "—"}</p>
      <p><strong>Guardian:</strong> {values.guardianName} ({values.guardianRelation})</p>
      <p><strong>Phone:</strong> {values.guardianPhone}</p>
    </div>
  );
}
