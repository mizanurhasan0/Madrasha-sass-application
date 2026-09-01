import { RoleGuard } from "@/components/dashboard/role-guard";
import { StudentsPageContent } from "@/components/students/students-page-content";

export default function StudentsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <StudentsPageContent />
    </RoleGuard>
  );
}
