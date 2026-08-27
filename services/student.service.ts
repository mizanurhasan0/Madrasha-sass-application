import type { PaginatedQuery } from "@/types/common";
import type { CreateStudentInput, Student, StudentWithRelations } from "@/types/student";
import { students as initialStudents } from "@/data/students";
import { classes } from "@/data/academic";
import { sections } from "@/data/academic";
import { guardians } from "@/data/guardians";
import { generateId, paginate, simulateLatency, success } from "./base.service";

const studentsStore = [...initialStudents];

function enrichStudent(student: Student): StudentWithRelations {
  const cls = classes.find((c) => c.id === student.classId);
  const sec = sections.find((s) => s.id === student.sectionId);
  const guardian = guardians.find((g) => g.id === student.guardianId);
  return {
    ...student,
    className: cls?.name ?? "—",
    sectionName: sec?.name ?? "—",
    guardianName: guardian?.name ?? "—",
    guardianPhone: guardian?.phone ?? "—",
  };
}

export const studentService = {
  async getStudents(query?: PaginatedQuery & { classId?: string; status?: string }) {
    await simulateLatency();
    let filtered = [...studentsStore];
    if (query?.classId) filtered = filtered.filter((s) => s.classId === query.classId);
    if (query?.status) filtered = filtered.filter((s) => s.status === query.status);
    const result = paginate(filtered, query);
    return success({
      ...result,
      data: result.data.map(enrichStudent),
    });
  },

  async getStudentById(id: string) {
    await simulateLatency();
    const student = studentsStore.find((s) => s.id === id);
    if (!student) return { success: false as const, data: null, message: "Student not found" };
    return success(enrichStudent(student));
  },

  async createStudent(input: CreateStudentInput) {
    await simulateLatency();
    const student: Student = {
      ...input,
      id: generateId("student"),
      studentId: `AN-${String(studentsStore.length + 1).padStart(4, "0")}`,
      status: input.status ?? "active",
      madrasaId: "madrasa_alnoor",
    };
    studentsStore.push(student);
    return success(enrichStudent(student));
  },

  async updateStudent(id: string, input: Partial<Student>) {
    await simulateLatency();
    const idx = studentsStore.findIndex((s) => s.id === id);
    if (idx === -1) return { success: false as const, data: null, message: "Student not found" };
    studentsStore[idx] = { ...studentsStore[idx], ...input };
    return success(enrichStudent(studentsStore[idx]));
  },

  async deactivateStudent(id: string) {
    return this.updateStudent(id, { status: "inactive" });
  },

  getAll() {
    return studentsStore.map(enrichStudent);
  },
};
