"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { TableSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";
import { StudentsTable } from "@/components/students/students-table";
import { StudentForm, type StudentFormValues } from "@/components/students/student-form";
import { studentService } from "@/services/student.service";
import { academicService } from "@/services/academic.service";
import type { StudentWithRelations } from "@/types/student";
import type { SelectOption } from "@/types/common";

export default function StudentsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <StudentsPageContent />
    </RoleGuard>
  );
}

function StudentsPageContent() {
  const [students, setStudents] = useState<StudentWithRelations[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classOptions, setClassOptions] = useState<SelectOption[]>([]);

  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentWithRelations | null>(null);
  const [deactivateTarget, setDeactivateTarget] = useState<StudentWithRelations | null>(null);

  useEffect(() => {
    academicService.getClasses({ limit: 100 }).then((res) => {
      if (res.success) {
        setClassOptions(res.data.data.map((c) => ({ label: c.name, value: c.id })));
      }
    });
  }, []);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await studentService.getStudents({
        page,
        limit: 10,
        search: search || undefined,
        classId: classFilter !== "all" ? classFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      if (res.success) {
        setStudents(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotal(res.data.total);
      } else {
        setError("Failed to load students");
      }
    } catch {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [page, search, classFilter, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchStudents, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchStudents, search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleClassFilterChange = (value: string) => {
    setClassFilter(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setFormOpen(true);
  };

  const handleEdit = (student: StudentWithRelations) => {
    setEditingStudent(student);
    setFormOpen(true);
  };

  const handleFormSubmit = async (values: StudentFormValues) => {
    if (editingStudent) {
      const res = await studentService.updateStudent(editingStudent.id, values);
      if (res.success) {
        toast.success(`${values.name} updated successfully`);
        setFormOpen(false);
        setEditingStudent(null);
        fetchStudents();
      } else {
        toast.error(res.message ?? "Failed to update student");
      }
    } else {
      const res = await studentService.createStudent(values);
      if (res.success) {
        toast.success(`${values.name} added successfully`);
        setFormOpen(false);
        fetchStudents();
      } else {
        toast.error("Failed to add student");
      }
    }
  };

  const handleDeactivate = async () => {
    if (!deactivateTarget) return;
    const res = await studentService.deactivateStudent(deactivateTarget.id);
    if (res.success) {
      toast.success(`${deactivateTarget.name} has been deactivated`);
      setDeactivateTarget(null);
      fetchStudents();
    } else {
      toast.error(res.message ?? "Failed to deactivate student");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description={`Manage enrolled students — ${total} total`}
        actions={
          <Button onClick={handleAdd}>
            <Plus />
            Add Student
          </Button>
        }
      />

      {error ? (
        <ErrorState message={error} onRetry={fetchStudents} />
      ) : loading && students.length === 0 ? (
        <TableSkeleton rows={8} />
      ) : (
        <StudentsTable
          students={students}
          search={search}
          onSearchChange={handleSearchChange}
          classFilter={classFilter}
          onClassFilterChange={handleClassFilterChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          classOptions={classOptions}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onEdit={handleEdit}
          onDeactivate={setDeactivateTarget}
        />
      )}

      <FormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingStudent ? "Edit Student" : "Add Student"}
        description={
          editingStudent
            ? "Update student information below."
            : "Fill in the details to enroll a new student."
        }
        className="sm:max-w-2xl"
      >
        <StudentForm
          key={editingStudent?.id ?? "new"}
          defaultValues={editingStudent ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormOpen(false)}
          submitLabel={editingStudent ? "Update Student" : "Add Student"}
        />
      </FormModal>

      <ConfirmDialog
        open={!!deactivateTarget}
        onOpenChange={(open) => !open && setDeactivateTarget(null)}
        title="Deactivate Student"
        description={
          deactivateTarget
            ? `Are you sure you want to deactivate ${deactivateTarget.name}? They will no longer appear as active.`
            : undefined
        }
        confirmLabel="Deactivate"
        variant="destructive"
        onConfirm={handleDeactivate}
      />
    </div>
  );
}
