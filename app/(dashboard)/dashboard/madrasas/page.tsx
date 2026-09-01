import { RoleGuard } from "@/components/dashboard/role-guard";
import { MadrasasPageContent } from "@/components/super-admin/madrasas-page-content";

export default function MadrasasPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <MadrasasPageContent />
    </RoleGuard>
  );
}
