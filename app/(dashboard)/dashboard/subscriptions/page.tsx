import { RoleGuard } from "@/components/dashboard/role-guard";
import { SubscriptionsPageContent } from "@/components/super-admin/subscriptions-page-content";

export default function SubscriptionsPage() {
  return (
    <RoleGuard allowed={["super_admin"]}>
      <SubscriptionsPageContent />
    </RoleGuard>
  );
}
