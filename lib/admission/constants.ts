import { z } from "zod";

export const ADMISSION_STEPS = ["Student Info", "Program", "Guardian", "Review"] as const;

export const ADMISSION_STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
] as const;

export const admissionSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  address: z.string().min(5, "Address is required"),
  classId: z.string().min(1, "Program/class is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().min(10, "Valid phone number is required"),
  guardianRelation: z.string().min(2, "Relation is required"),
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;

export const ADMISSION_FIELDS_BY_STEP: (keyof AdmissionFormValues)[][] = [
  ["studentName", "dateOfBirth", "gender", "address"],
  ["classId"],
  ["guardianName", "guardianPhone", "guardianRelation"],
  [],
];
