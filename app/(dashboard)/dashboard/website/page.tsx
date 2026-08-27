import { RoleGuard } from "@/components/dashboard/role-guard";
import { WebsiteCms } from "@/components/website/website-cms";

export default function WebsitePage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <WebsiteCms />
    </RoleGuard>
  );
}
