import { RoleGuard } from "@/components/dashboard/role-guard";
import { PlansPageContent } from "@/components/super-admin/plans-page-content";

export default function PlansPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <PlansPageContent />
    </RoleGuard>
  );
}
