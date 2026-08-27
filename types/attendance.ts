export type AttendanceStatus = "present" | "absent" | "late" | "leave";

export type AttendanceRecord = {
  id: string;
  studentId: string;
  classId: string;
  sectionId: string;
  date: string;
  status: AttendanceStatus;
  note?: string;
  madrasaId: string;
};

export type AttendanceSummary = {
  date: string;
  classId: string;
  sectionId: string;
  present: number;
  absent: number;
  late: number;
  leave: number;
  total: number;
};
