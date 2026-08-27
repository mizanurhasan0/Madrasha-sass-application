import type { AcademicSession, Class, Section, Subject } from "@/types/academic";
import { MADRASA_ID } from "./users";

export const academicSessions: AcademicSession[] = [
  {
    id: "session_1",
    name: "2025-2026",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isCurrent: true,
    status: "active",
    madrasaId: MADRASA_ID,
  },
  {
    id: "session_2",
    name: "2024-2025",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    isCurrent: false,
    status: "active",
    madrasaId: MADRASA_ID,
  },
];

export const classes: Class[] = [
  { id: "class_1", name: "Hifz (1st Year)", sessionId: "session_1", capacity: 30, studentCount: 8, status: "active", madrasaId: MADRASA_ID },
  { id: "class_2", name: "Hifz (2nd Year)", sessionId: "session_1", capacity: 30, studentCount: 6, status: "active", madrasaId: MADRASA_ID },
  { id: "class_3", name: "Nazera Quran", sessionId: "session_1", capacity: 40, studentCount: 5, status: "active", madrasaId: MADRASA_ID },
  { id: "class_4", name: "Ibtidaiyyah (Class 3)", sessionId: "session_1", capacity: 35, studentCount: 3, status: "active", madrasaId: MADRASA_ID },
  { id: "class_5", name: "Mutawassit (Class 6)", sessionId: "session_1", capacity: 35, studentCount: 2, status: "active", madrasaId: MADRASA_ID },
  { id: "class_6", name: "Arabic Language", sessionId: "session_1", capacity: 25, studentCount: 0, status: "active", madrasaId: MADRASA_ID },
];

export const sections: Section[] = [
  { id: "sec_1", name: "A", classId: "class_1", capacity: 15, studentCount: 4, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_2", name: "B", classId: "class_1", capacity: 15, studentCount: 4, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_3", name: "A", classId: "class_2", capacity: 15, studentCount: 3, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_4", name: "B", classId: "class_2", capacity: 15, studentCount: 3, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_5", name: "A", classId: "class_3", capacity: 20, studentCount: 3, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_6", name: "B", classId: "class_3", capacity: 20, studentCount: 2, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_7", name: "A", classId: "class_4", capacity: 18, studentCount: 2, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_8", name: "A", classId: "class_5", capacity: 18, studentCount: 2, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_9", name: "A", classId: "class_6", capacity: 25, studentCount: 0, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_10", name: "B", classId: "class_4", capacity: 18, studentCount: 1, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_11", name: "B", classId: "class_5", capacity: 18, studentCount: 0, status: "active", madrasaId: MADRASA_ID },
  { id: "sec_12", name: "C", classId: "class_1", capacity: 15, studentCount: 0, status: "inactive", madrasaId: MADRASA_ID },
];

export const subjects: Subject[] = [
  { id: "sub_1", name: "Quran & Tajweed", code: "QRT", classId: "class_1", teacherId: "teacher_1", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_2", name: "Hadith", code: "HDT", classId: "class_2", teacherId: "teacher_2", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_3", name: "Fiqh", code: "FIQ", classId: "class_3", teacherId: "teacher_3", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_4", name: "Arabic Grammar", code: "ARB", classId: "class_6", teacherId: "teacher_4", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_5", name: "Bangla", code: "BNG", classId: "class_4", teacherId: "teacher_5", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_6", name: "English", code: "ENG", classId: "class_4", teacherId: "teacher_6", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_7", name: "Mathematics", code: "MTH", classId: "class_5", teacherId: "teacher_7", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_8", name: "Islamic Studies", code: "ISL", classId: "class_5", teacherId: "teacher_8", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_9", name: "Nazera Practice", code: "NZR", classId: "class_3", teacherId: "teacher_1", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_10", name: "Tafsir", code: "TFS", classId: "class_2", teacherId: "teacher_9", type: "elective", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_11", name: "Aqeedah", code: "AQD", classId: "class_1", teacherId: "teacher_10", type: "core", status: "active", madrasaId: MADRASA_ID },
  { id: "sub_12", name: "Seerah", code: "SRH", classId: "class_3", teacherId: "teacher_11", type: "elective", status: "active", madrasaId: MADRASA_ID },
];
