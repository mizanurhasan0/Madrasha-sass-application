import { RoleGuard } from "@/components/dashboard/role-guard";
import { SubjectsPageContent } from "@/components/academics/subjects-page-content";

export default function SubjectsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <SubjectsPageContent />
    </RoleGuard>
  );
}
