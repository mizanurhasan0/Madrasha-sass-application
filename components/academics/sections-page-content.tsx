"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { FilterDropdown } from "@/components/common/filter-dropdown";
import { AcademicNav } from "@/components/academics/academic-nav";
import { SectionsTable } from "@/components/academics/sections-table";
import { SectionForm } from "@/components/academics/section-form";
import { Button } from "@/components/ui/button";
import { academicService } from "@/services/academic.service";

export function SectionsPageContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [classFilter, setClassFilter] = useState("all");

  const classes = academicService.getAllClasses();
  const classOptions = classes.map((c) => ({ label: c.name, value: c.id }));
  const selectedClassId = classFilter === "all" ? undefined : classFilter;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Management"
        description="Manage classes, sections, subjects, and academic sessions."
        actions={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add Section
          </Button>
        }
      />

      <AcademicNav />

      <FilterDropdown
        label="Filter by Class"
        value={classFilter}
        onChange={setClassFilter}
        options={classOptions}
        placeholder="All Classes"
        className="max-w-xs"
      />

      <SectionsTable classId={selectedClassId} refreshKey={refreshKey} />

      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Add Section"
        description="Create a new section within a class."
      >
        <SectionForm
          defaultClassId={selectedClassId}
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
