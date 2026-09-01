import { RoleGuard } from "@/components/dashboard/role-guard";
import { AdmissionsPageContent } from "@/components/admission/admissions-page-content";

export default function AdmissionsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <AdmissionsPageContent />
    </RoleGuard>
  );
}
