export type ExamStatus = "upcoming" | "ongoing" | "completed";

export type Exam = {
  id: string;
  name: string;
  sessionId: string;
  classId: string;
  startDate: string;
  endDate: string;
  status: ExamStatus;
  madrasaId: string;
};

export type MarkEntry = {
  id: string;
  examId: string;
  studentId: string;
  subjectId: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  madrasaId: string;
};

export type StudentResult = {
  studentId: string;
  examId: string;
  examName: string;
  className: string;
  subjects: {
    subjectName: string;
    totalMarks: number;
    obtainedMarks: number;
    grade: string;
  }[];
  totalMarks: number;
  obtainedMarks: number;
  average: number;
  grade: string;
  status: "pass" | "fail";
};
