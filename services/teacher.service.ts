import type { PaginatedQuery } from "@/types/common";
import type { Teacher, Staff } from "@/types/teacher";
import { teachers as initialTeachers, staffMembers as initialStaff } from "@/data/teachers";
import { generateId, paginate, simulateLatency, success } from "./base.service";

const teachersStore = [...initialTeachers];
const staffStore = [...initialStaff];

export const teacherService = {
  async getTeachers(query?: PaginatedQuery) {
    await simulateLatency();
    return success(
      paginate(teachersStore, query, {
        searchKeys: ["name", "email", "phone", "designation"],
      })
    );
  },

  async getTeacherById(id: string) {
    await simulateLatency();
    const teacher = teachersStore.find((t) => t.id === id);
    if (!teacher) return { success: false as const, data: null, message: "Teacher not found" };
    return success(teacher);
  },

  async createTeacher(input: Omit<Teacher, "id" | "madrasaId">) {
    await simulateLatency();
    const teacher: Teacher = { ...input, id: generateId("teacher"), madrasaId: "madrasa_alnoor" };
    teachersStore.push(teacher);
    return success(teacher);
  },

  async updateTeacher(id: string, input: Partial<Teacher>) {
    await simulateLatency();
    const idx = teachersStore.findIndex((t) => t.id === id);
    if (idx === -1) return { success: false as const, data: null, message: "Teacher not found" };
    teachersStore[idx] = { ...teachersStore[idx], ...input };
    return success(teachersStore[idx]);
  },

  async getStaff(query?: PaginatedQuery) {
    await simulateLatency();
    return success(
      paginate(staffStore, query, {
        searchKeys: ["name", "email", "phone", "designation", "department"],
      })
    );
  },

  getAll() {
    return teachersStore;
  },
};
