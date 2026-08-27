"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { AcademicNav } from "@/components/academics/academic-nav";
import { SubjectsTable } from "@/components/academics/subjects-table";
import { SubjectForm } from "@/components/academics/subject-form";
import { Button } from "@/components/ui/button";

export default function SubjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <div className="space-y-6">
        <PageHeader
          title="Academic Management"
          description="Manage classes, sections, subjects, and academic sessions."
          actions={
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="mr-2 size-4" />
              Add Subject
            </Button>
          }
        />

        <AcademicNav />

        <SubjectsTable refreshKey={refreshKey} />

        <FormModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Add Subject"
          description="Assign a subject to a class and teacher."
        >
          <SubjectForm
            onSuccess={() => {
              setModalOpen(false);
              setRefreshKey((k) => k + 1);
            }}
            onCancel={() => setModalOpen(false)}
          />
        </FormModal>
      </div>
    </RoleGuard>
  );
}
