import { PageHeader } from "@/components/common/page-header";
import { AcademicNav } from "@/components/academics/academic-nav";
import { SessionsTable } from "@/components/academics/sessions-table";

export function SessionsPageContent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Management"
        description="Manage classes, sections, subjects, and academic sessions."
      />

      <AcademicNav />

      <SessionsTable />
    </div>
  );
}
