import { RoleGuard } from "@/components/dashboard/role-guard";
import { SectionsPageContent } from "@/components/academics/sections-page-content";

export default function SectionsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <SectionsPageContent />
    </RoleGuard>
  );
}
