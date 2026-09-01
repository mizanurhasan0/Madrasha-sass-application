import { RoleGuard } from "@/components/dashboard/role-guard";
import { TeachersPageContent } from "@/components/teachers/teachers-page-content";

export default function TeachersPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <TeachersPageContent />
    </RoleGuard>
  );
}
