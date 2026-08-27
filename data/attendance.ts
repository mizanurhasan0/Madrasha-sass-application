import type { AttendanceRecord } from "@/types/attendance";
import { MADRASA_ID } from "./users";
import { students } from "./students";

const statuses: AttendanceRecord["status"][] = ["present", "present", "present", "absent", "late", "leave"];
const dates = ["2025-08-20", "2025-08-21", "2025-08-22", "2025-08-23", "2025-08-24", "2025-08-25"];

export const attendanceRecords: AttendanceRecord[] = [];

let id = 1;
for (const date of dates) {
  for (const student of students.slice(0, 20)) {
    attendanceRecords.push({
      id: `att_${id++}`,
      studentId: student.id,
      classId: student.classId,
      sectionId: student.sectionId,
      date,
      status: statuses[id % statuses.length],
      madrasaId: MADRASA_ID,
    });
  }
}
