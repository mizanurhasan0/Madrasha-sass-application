import { RoleGuard } from "@/components/dashboard/role-guard";
import { PaymentsPageContent } from "@/components/fees/payments-page-content";

export default function PaymentsPage() {
  return (
    <RoleGuard allowed={["super_admin", "madrasa_admin", "accountant"]}>
      <PaymentsPageContent />
    </RoleGuard>
  );
}
