import type { PaginatedQuery } from "@/types/common";
import type { AdmissionApplication, AdmissionStatus, CreateAdmissionInput } from "@/types/admission";
import { classes } from "@/data/academic";
import { generateId, paginate, simulateLatency, success } from "./base.service";

const applicationsStore: AdmissionApplication[] = [];
let applicationCounter = 0;

function nextApplicationNo(): string {
  applicationCounter += 1;
  const year = new Date().getFullYear();
  return `ADM-${year}-${String(applicationCounter).padStart(4, "0")}`;
}

export const admissionService = {
  async submitApplication(input: CreateAdmissionInput) {
    const cls = classes.find((c) => c.id === input.classId);
    const application: AdmissionApplication = {
      ...input,
      id: generateId("adm"),
      applicationNo: nextApplicationNo(),
      className: cls?.name ?? "—",
      status: "pending",
      submittedAt: new Date().toISOString(),
      madrasaId: "madrasa_alnoor",
    };
    applicationsStore.unshift(application);
    return success(application);
  },

  async getApplications(query?: PaginatedQuery & { status?: AdmissionStatus | "all" }) {
    await simulateLatency();
    let filtered = [...applicationsStore];
    if (query?.status && query.status !== "all") {
      filtered = filtered.filter((a) => a.status === query.status);
    }
    return success(
      paginate(filtered, query, {
        searchKeys: ["applicationNo", "studentName", "guardianName", "guardianPhone"],
      })
    );
  },

  async getByApplicationNo(applicationNo: string) {
    const application = applicationsStore.find(
      (a) => a.applicationNo.toLowerCase() === applicationNo.toLowerCase()
    );
    if (!application) {
      return { success: false as const, data: null, message: "Application not found" };
    }
    return success(application);
  },

  async updateStatus(id: string, status: AdmissionStatus) {
    await simulateLatency();
    const idx = applicationsStore.findIndex((a) => a.id === id);
    if (idx === -1) {
      return { success: false as const, data: null, message: "Application not found" };
    }
    applicationsStore[idx] = { ...applicationsStore[idx], status };
    return success(applicationsStore[idx]);
  },
};
