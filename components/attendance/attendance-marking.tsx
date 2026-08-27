"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCheck, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterDropdown } from "@/components/common/filter-dropdown";
import { StatusBadge } from "@/components/common/status-badge";
import { UserAvatar } from "@/components/common/user-avatar";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { attendanceService } from "@/services/attendance.service";
import { academicService } from "@/services/academic.service";
import { studentService } from "@/services/student.service";
import type { AttendanceStatus } from "@/types/attendance";
import type { Class, Section } from "@/types/academic";
import type { StudentWithRelations } from "@/types/student";
import { cn } from "@/lib/utils";

const STATUSES: AttendanceStatus[] = ["present", "absent", "late", "leave"];

export function AttendanceMarking() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [students, setStudents] = useState<StudentWithRelations[]>([]);
  const [statuses, setStatuses] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadClasses() {
      const res = await academicService.getClasses();
      if (res.success && res.data.data.length > 0) {
        setClasses(res.data.data);
        setClassId(res.data.data[0].id);
      }
      setLoading(false);
    }
    loadClasses();
  }, []);

  useEffect(() => {
    if (!classId) return;
    async function loadSections() {
      const res = await academicService.getSections(classId);
      if (res.success) {
        setSections(res.data);
        setSectionId(res.data[0]?.id ?? "");
      }
    }
    loadSections();
  }, [classId]);

  const loadAttendance = useCallback(async () => {
    if (!classId || !sectionId) return;
    setLoading(true);

    const studentRes = await studentService.getStudents({ classId, status: "active" });
    const filtered = studentRes.success
      ? studentRes.data.data.filter((s) => s.sectionId === sectionId)
      : [];

    const attRes = await attendanceService.getByDateClassSection(date, classId, sectionId);
    const existing = attRes.success ? attRes.data : [];

    const statusMap: Record<string, AttendanceStatus> = {};
    for (const student of filtered) {
      const record = existing.find((r) => r.studentId === student.id);
      statusMap[student.id] = record?.status ?? "present";
    }

    setStudents(filtered);
    setStatuses(statusMap);
    setLoading(false);
  }, [date, classId, sectionId]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setStatuses((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const next: Record<string, AttendanceStatus> = {};
    for (const s of students) next[s.id] = "present";
    setStatuses(next);
  };

  const handleSave = async () => {
    if (!classId || !sectionId || students.length === 0) return;
    setSaving(true);

    const records = students.map((s) => ({
      studentId: s.id,
      classId,
      sectionId,
      date,
      status: statuses[s.id] ?? "present",
    }));

    const res = await attendanceService.saveAttendance(records);
    setSaving(false);

    if (res.success) {
      toast.success("Attendance saved successfully");
    } else {
      toast.error("Failed to save attendance");
    }
  };

  const classOptions = classes.map((c) => ({ label: c.name, value: c.id }));
  const sectionOptions = sections.map((s) => ({ label: s.name, value: s.id }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="space-y-1">
          <Label htmlFor="attendance-date">Date</Label>
          <Input
            id="attendance-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full sm:w-44"
          />
        </div>
        <FilterDropdown
          label="Class"
          value={classId}
          onChange={setClassId}
          options={classOptions}
          placeholder="Select class"
        />
        <FilterDropdown
          label="Section"
          value={sectionId}
          onChange={setSectionId}
          options={sectionOptions}
          placeholder="Select section"
        />
        <div className="flex gap-2 sm:ml-auto">
          <Button variant="outline" onClick={markAllPresent} disabled={students.length === 0}>
            <CheckCheck className="size-4" />
            Mark All Present
          </Button>
          <Button onClick={handleSave} disabled={saving || students.length === 0}>
            <Save className="size-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingState rows={6} />
      ) : students.length === 0 ? (
        <EmptyState
          title="No students found"
          description="Select a class and section with enrolled students."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <div className="hidden md:grid md:grid-cols-[1fr_auto] md:gap-4 md:border-b md:bg-muted/40 md:px-4 md:py-3 md:text-sm md:font-medium md:text-muted-foreground">
            <span>Student</span>
            <span>Status</span>
          </div>
          <ul className="divide-y">
            {students.map((student) => (
              <li
                key={student.id}
                className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar name={student.name} size="sm" />
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.studentId}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatus(student.id, status)}
                      className={cn(
                        "rounded-full transition-opacity",
                        statuses[student.id] !== status && "opacity-40 hover:opacity-70"
                      )}
                    >
                      <StatusBadge status={status} />
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
