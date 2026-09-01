"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { AcademicNav } from "@/components/academics/academic-nav";
import { ClassesTable } from "@/components/academics/classes-table";
import { ClassForm } from "@/components/academics/class-form";
import { Button } from "@/components/ui/button";

export function ClassesPageContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Management"
        description="Manage classes, sections, subjects, and academic sessions."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add Class
          </Button>
        }
      />

      <AcademicNav />

      <ClassesTable refreshKey={refreshKey} />

      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Add Class"
        description="Create a new class for the current academic session."
      >
        <ClassForm
          onSuccess={() => {
            setModalOpen(false);
            setRefreshKey((k) => k + 1);
          }}
          onCancel={() => setModalOpen(false)}
        />
      </FormModal>
    </div>
  );
}
