import type { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { attendanceRecords as initialRecords } from "@/data/attendance";
import { generateId, simulateLatency, success } from "./base.service";

const recordsStore = [...initialRecords];

export const attendanceService = {
  async getByDateClassSection(date: string, classId: string, sectionId: string) {
    await simulateLatency();
    const records = recordsStore.filter(
      (r) => r.date === date && r.classId === classId && r.sectionId === sectionId
    );
    return success(records);
  },

  async saveAttendance(records: Omit<AttendanceRecord, "id" | "madrasaId">[]) {
    await simulateLatency();
    for (const record of records) {
      const idx = recordsStore.findIndex(
        (r) =>
          r.studentId === record.studentId &&
          r.date === record.date &&
          r.classId === record.classId
      );
      if (idx >= 0) {
        recordsStore[idx] = { ...recordsStore[idx], status: record.status };
      } else {
        recordsStore.push({
          ...record,
          id: generateId("att"),
          madrasaId: "madrasa_alnoor",
        });
      }
    }
    return success(records);
  },

  async getStudentHistory(studentId: string) {
    await simulateLatency();
    return success(recordsStore.filter((r) => r.studentId === studentId));
  },

  async getSummary(date: string, classId?: string) {
    await simulateLatency();
    let filtered = recordsStore.filter((r) => r.date === date);
    if (classId) filtered = filtered.filter((r) => r.classId === classId);
    const summary = {
      present: filtered.filter((r) => r.status === "present").length,
      absent: filtered.filter((r) => r.status === "absent").length,
      late: filtered.filter((r) => r.status === "late").length,
      leave: filtered.filter((r) => r.status === "leave").length,
      total: filtered.length,
    };
    return success(summary);
  },

  getAll() {
    return recordsStore;
  },
};
