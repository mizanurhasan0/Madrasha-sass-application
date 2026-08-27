import type { PaginatedQuery } from "@/types/common";
import type { Exam, MarkEntry } from "@/types/exam";
import { exams as initialExams, markEntries as initialMarks } from "@/data/exams";
import { subjects } from "@/data/academic";
import { calculateGrade } from "@/lib/format";
import { generateId, paginate, simulateLatency, success } from "./base.service";

const examsStore = [...initialExams];
const marksStore = [...initialMarks];

export const examService = {
  async getExams(query?: PaginatedQuery) {
    await simulateLatency();
    return success(paginate(examsStore, query));
  },

  async getExamById(id: string) {
    await simulateLatency();
    const exam = examsStore.find((e) => e.id === id);
    if (!exam) return { success: false as const, data: null, message: "Exam not found" };
    return success(exam);
  },

  async getMarks(examId: string, classId?: string) {
    await simulateLatency();
    const marks = marksStore.filter((m) => m.examId === examId);
    return success(marks);
  },

  async saveMarks(marks: Omit<MarkEntry, "id" | "madrasaId" | "grade">[]) {
    await simulateLatency();
    for (const mark of marks) {
      const grade = calculateGrade((mark.obtainedMarks / mark.totalMarks) * 100);
      const idx = marksStore.findIndex(
        (m) => m.examId === mark.examId && m.studentId === mark.studentId && m.subjectId === mark.subjectId
      );
      if (idx >= 0) {
        marksStore[idx] = { ...marksStore[idx], ...mark, grade };
      } else {
        marksStore.push({ ...mark, id: generateId("mark"), grade, madrasaId: "madrasa_alnoor" });
      }
    }
    return success(marksStore.filter((m) => m.examId === marks[0]?.examId));
  },

  async getStudentResult(studentId: string, examId: string) {
    await simulateLatency();
    const exam = examsStore.find((e) => e.id === examId);
    const marks = marksStore.filter((m) => m.studentId === studentId && m.examId === examId);
    if (!exam || marks.length === 0) return { success: false as const, data: null, message: "Result not found" };

    const subjectMarks = marks.map((m) => {
      const subject = subjects.find((s) => s.id === m.subjectId);
      return {
        subjectName: subject?.name ?? "Unknown",
        totalMarks: m.totalMarks,
        obtainedMarks: m.obtainedMarks,
        grade: m.grade,
      };
    });

    const totalMarks = marks.reduce((s, m) => s + m.totalMarks, 0);
    const obtainedMarks = marks.reduce((s, m) => s + m.obtainedMarks, 0);
    const average = (obtainedMarks / totalMarks) * 100;
    const grade = calculateGrade(average);

    return success({
      studentId,
      examId,
      examName: exam.name,
      className: "",
      subjects: subjectMarks,
      totalMarks,
      obtainedMarks,
      average,
      grade,
      status: average >= 33 ? "pass" as const : "fail" as const,
    });
  },

  getAll() {
    return examsStore;
  },
};
