"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { TeachersTable } from "@/components/teachers/teachers-table";
import { StaffTable } from "@/components/teachers/staff-table";
import { TeacherForm } from "@/components/teachers/teacher-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => {
    setEditingTeacher(undefined);
    setModalOpen(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    setModalOpen(false);
    setEditingTeacher(undefined);
    setRefreshKey((k) => k + 1);
  };

  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <div className="space-y-6">
        <PageHeader
          title="Teachers & Staff"
          description="Manage teachers and administrative staff members."
          actions={
            <Button onClick={handleAdd}>
              <Plus className="mr-2 size-4" />
              Add Teacher
            </Button>
          }
        />

        <Tabs defaultValue="teachers">
          <TabsList>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          <TabsContent value="teachers" className="mt-4">
            <TeachersTable onEdit={handleEdit} refreshKey={refreshKey} />
          </TabsContent>

          <TabsContent value="staff" className="mt-4">
            <StaffTable />
          </TabsContent>
        </Tabs>

        <FormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
          description={
            editingTeacher
              ? "Update teacher information and assignments."
              : "Fill in the details to add a new teacher."
          }
        >
          <TeacherForm
            teacher={editingTeacher}
            onSuccess={handleSuccess}
            onCancel={() => setModalOpen(false)}
          />
        </FormModal>
      </div>
    </RoleGuard>
  );
}
