export type AdmissionStatus = "pending" | "approved" | "rejected";

export type AdmissionApplication = {
  id: string;
  applicationNo: string;
  studentName: string;
  dateOfBirth: string;
  gender: "male" | "female";
  address: string;
  classId: string;
  className: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  status: AdmissionStatus;
  submittedAt: string;
  madrasaId: string;
};

export type CreateAdmissionInput = Omit<
  AdmissionApplication,
  "id" | "applicationNo" | "status" | "submittedAt" | "madrasaId" | "className"
>;
