import type { PaginatedQuery } from "@/types/common";
import type { AcademicSession, Class, Section, Subject } from "@/types/academic";
import {
  academicSessions as initialSessions,
  classes as initialClasses,
  sections as initialSections,
  subjects as initialSubjects,
} from "@/data/academic";
import { generateId, paginate, simulateLatency, success } from "./base.service";

const sessionsStore = [...initialSessions];
const classesStore = [...initialClasses];
const sectionsStore = [...initialSections];
const subjectsStore = [...initialSubjects];

export const academicService = {
  async getSessions() {
    await simulateLatency();
    return success(sessionsStore);
  },

  async getClasses(query?: PaginatedQuery) {
    await simulateLatency();
    return success(paginate(classesStore, query));
  },

  async getSections(classId?: string) {
    await simulateLatency();
    const filtered = classId ? sectionsStore.filter((s) => s.classId === classId) : sectionsStore;
    return success(filtered);
  },

  async getSubjects(query?: PaginatedQuery) {
    await simulateLatency();
    return success(paginate(subjectsStore, query));
  },

  async createClass(input: Omit<Class, "id" | "madrasaId" | "studentCount">) {
    await simulateLatency();
    const cls: Class = { ...input, id: generateId("class"), studentCount: 0, madrasaId: "madrasa_alnoor" };
    classesStore.push(cls);
    return success(cls);
  },

  async createSection(input: Omit<Section, "id" | "madrasaId" | "studentCount">) {
    await simulateLatency();
    const sec: Section = { ...input, id: generateId("sec"), studentCount: 0, madrasaId: "madrasa_alnoor" };
    sectionsStore.push(sec);
    return success(sec);
  },

  async createSubject(input: Omit<Subject, "id" | "madrasaId">) {
    await simulateLatency();
    const sub: Subject = { ...input, id: generateId("sub"), madrasaId: "madrasa_alnoor" };
    subjectsStore.push(sub);
    return success(sub);
  },

  getAllClasses() {
    return classesStore;
  },

  getAllSections() {
    return sectionsStore;
  },
};
