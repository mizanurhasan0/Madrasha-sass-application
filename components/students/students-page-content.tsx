"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { TableSkeleton } from "@/components/common/loading-state";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";
import { StudentsTable } from "@/components/students/students-table";
import { StudentForm, type StudentFormValues } from "@/components/students/student-form";
import { useResourceList } from "@/hooks/use-resource-list";
import { useCrudModal } from "@/hooks/use-crud-modal";
import { studentService } from "@/services/student.service";
import { academicService } from "@/services/academic.service";
import type { StudentWithRelations } from "@/types/student";
import type { SelectOption } from "@/types/common";

export function StudentsPageContent() {
  const [classOptions, setClassOptions] = useState<SelectOption[]>([]);
  const [deactivateTarget, setDeactivateTarget] = useState<StudentWithRelations | null>(null);

  const {
    data: students,
    total,
    totalPages,
    error,
    search,
    setSearch,
    page,
    setPage,
    filters,
    setFilter,
    refetch,
    isInitialLoad,
  } = useResourceList<
    StudentWithRelations,
    { classId: string; status: string }
  >({
    fetchFn: ({ page, limit, search, classId, status }) =>
      studentService.getStudents({
        page,
        limit,
        search: search || undefined,
        classId: classId !== "all" ? classId : undefined,
        status: status !== "all" ? status : undefined,
      }),
    initialFilters: { classId: "all", status: "all" },
    errorMessage: "Failed to load students",
  });

  useEffect(() => {
    academicService.getClasses({ limit: 100 }).then((res) => {
      if (res.success) {
        setClassOptions(res.data.data.map((c) => ({ label: c.name, value: c.id })));
      }
    });
  }, []);

  const crud = useCrudModal<StudentWithRelations>({
    onCreate: async (values) => {
      const res = await studentService.createStudent(values as StudentFormValues);
      return { success: res.success, message: res.message };
    },
    onUpdate: async (id, values) => {
      const res = await studentService.updateStudent(id, values as StudentFormValues);
      return { success: res.success, message: res.message };
    },
    onSuccess: refetch,
    messages: {
      create: "Student added successfully",
      update: "Student updated successfully",
      error: "Operation failed",
    },
  });

  const handleFormSubmit = async (values: StudentFormValues) => {
    await crud.handleSubmit(values);
  };

  const handleDeactivate = async () => {
    if (!deactivateTarget) return;
    const res = await studentService.deactivateStudent(deactivateTarget.id);
    if (res.success) {
      toast.success(`${deactivateTarget.name} has been deactivated`);
      setDeactivateTarget(null);
      refetch();
    } else {
      toast.error(res.message ?? "Failed to deactivate student");
    }
  };

  const classFilter = filters.classId ?? "all";
  const statusFilter = filters.status ?? "all";

  const description = useMemo(
    () => `Manage enrolled students — ${total} total`,
    [total]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description={description}
        actions={
          <Button onClick={crud.openCreate}>
            <Plus />
            Add Student
          </Button>
        }
      />

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : isInitialLoad ? (
        <TableSkeleton rows={8} />
      ) : (
        <StudentsTable
          students={students}
          search={search}
          onSearchChange={setSearch}
          classFilter={classFilter}
          onClassFilterChange={(v) => setFilter("classId", v)}
          statusFilter={statusFilter}
          onStatusFilterChange={(v) => setFilter("status", v)}
          classOptions={classOptions}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onEdit={crud.openEdit}
          onDeactivate={setDeactivateTarget}
        />
      )}

      <FormModal
        open={crud.formOpen}
        onOpenChange={crud.setFormOpen}
        title={crud.editing ? "Edit Student" : "Add Student"}
        description={
          crud.editing
            ? "Update student information below."
            : "Fill in the details to enroll a new student."
        }
        className="sm:max-w-2xl"
      >
        <StudentForm
          key={crud.editing?.id ?? "new"}
          defaultValues={crud.editing ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={crud.closeForm}
          submitLabel={crud.editing ? "Update Student" : "Add Student"}
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
