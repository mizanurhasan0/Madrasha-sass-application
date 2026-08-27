import type { Status } from "./common";

export type Student = {
  id: string;
  studentId: string;
  name: string;
  nameBn?: string;
  avatar?: string;
  gender: "male" | "female";
  dateOfBirth: string;
  bloodGroup?: string;
  phone?: string;
  address: string;
  classId: string;
  sectionId: string;
  guardianId: string;
  admissionDate: string;
  status: Status;
  madrasaId: string;
};

export type StudentWithRelations = Student & {
  className: string;
  sectionName: string;
  guardianName: string;
  guardianPhone: string;
};

export type CreateStudentInput = Omit<
  Student,
  "id" | "studentId" | "status" | "madrasaId"
> & {
  status?: Status;
};
