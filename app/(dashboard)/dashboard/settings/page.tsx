import { RoleGuard } from "@/components/dashboard/role-guard";
import { SettingsContent } from "@/components/settings/settings-content";

export default function SettingsPage() {
  return (
    <RoleGuard allowed={["super_admin", "madrasa_admin"]}>
      <SettingsContent />
    </RoleGuard>
  );
}
