import { RoleGuard } from "@/components/dashboard/role-guard";
import { UserProfile } from "@/components/profile/user-profile";

export default function ProfilePage() {
  return (
    <RoleGuard allowed={["teacher", "accountant", "guardian"]}>
      <UserProfile />
    </RoleGuard>
  );
}
