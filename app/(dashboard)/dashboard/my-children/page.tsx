import { RoleGuard } from "@/components/dashboard/role-guard";
import { ChildrenList } from "@/components/guardian/children-list";

export default function MyChildrenPage() {
  return (
    <RoleGuard allowed={["guardian"]}>
      <ChildrenList />
    </RoleGuard>
  );
}
