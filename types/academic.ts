import type { Status } from "./common";

export type AcademicSession = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: Status;
  madrasaId: string;
};

export type Class = {
  id: string;
  name: string;
  sessionId: string;
  capacity: number;
  studentCount: number;
  status: Status;
  madrasaId: string;
};

export type Section = {
  id: string;
  name: string;
  classId: string;
  capacity: number;
  studentCount: number;
  status: Status;
  madrasaId: string;
};

export type Subject = {
  id: string;
  name: string;
  code: string;
  classId: string;
  teacherId: string;
  type: "core" | "elective";
  status: Status;
  madrasaId: string;
};
