import { RoleGuard } from "@/components/dashboard/role-guard";
import { SessionsPageContent } from "@/components/academics/sessions-page-content";

export default function SessionsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <SessionsPageContent />
    </RoleGuard>
  );
}
