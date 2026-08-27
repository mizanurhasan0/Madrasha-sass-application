import type { Exam, MarkEntry } from "@/types/exam";
import { MADRASA_ID } from "./users";
import { students } from "./students";
import { subjects } from "./academic";
import { calculateGrade } from "@/lib/format";

export const exams: Exam[] = [
  { id: "exam_1", name: "Half Yearly Examination 2025", sessionId: "session_1", classId: "class_1", startDate: "2025-06-01", endDate: "2025-06-15", status: "completed", madrasaId: MADRASA_ID },
  { id: "exam_2", name: "Half Yearly Examination 2025", sessionId: "session_1", classId: "class_2", startDate: "2025-06-01", endDate: "2025-06-15", status: "completed", madrasaId: MADRASA_ID },
  { id: "exam_3", name: "Monthly Test - August", sessionId: "session_1", classId: "class_3", startDate: "2025-08-20", endDate: "2025-08-22", status: "ongoing", madrasaId: MADRASA_ID },
  { id: "exam_4", name: "Annual Examination 2025", sessionId: "session_1", classId: "class_4", startDate: "2025-11-01", endDate: "2025-11-20", status: "upcoming", madrasaId: MADRASA_ID },
  { id: "exam_5", name: "Annual Examination 2025", sessionId: "session_1", classId: "class_5", startDate: "2025-11-01", endDate: "2025-11-20", status: "upcoming", madrasaId: MADRASA_ID },
];

export const markEntries: MarkEntry[] = [];
let markId = 1;

for (const exam of exams.slice(0, 2)) {
  const classStudents = students.filter((s) => s.classId === exam.classId);
  const classSubjects = subjects.filter((s) => s.classId === exam.classId);
  for (const student of classStudents) {
    for (const subject of classSubjects) {
      const totalMarks = 100;
      const obtainedMarks = 40 + Math.floor(Math.random() * 55);
      markEntries.push({
        id: `mark_${markId++}`,
        examId: exam.id,
        studentId: student.id,
        subjectId: subject.id,
        totalMarks,
        obtainedMarks,
        grade: calculateGrade((obtainedMarks / totalMarks) * 100),
        madrasaId: MADRASA_ID,
      });
    }
  }
}
