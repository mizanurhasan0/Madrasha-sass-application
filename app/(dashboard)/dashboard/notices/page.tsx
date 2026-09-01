import { RoleGuard } from "@/components/dashboard/role-guard";
import { NoticesRoleRouter } from "@/components/notices/notices-role-router";

export default function NoticesPage() {
  return (
    <RoleGuard allowed={["madrasa_admin", "teacher", "guardian"]}>
      <NoticesRoleRouter />
    </RoleGuard>
  );
}
