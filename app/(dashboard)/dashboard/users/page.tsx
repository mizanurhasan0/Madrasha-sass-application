import { RoleGuard } from "@/components/dashboard/role-guard";
import { UsersPageContent } from "@/components/super-admin/users-page-content";

export default function UsersPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <UsersPageContent />
    </RoleGuard>
  );
}
