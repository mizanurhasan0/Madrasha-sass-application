import { RoleGuard } from "@/components/dashboard/role-guard";
import { ClassesPageContent } from "@/components/academics/classes-page-content";

export default function ClassesPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <ClassesPageContent />
    </RoleGuard>
  );
}
