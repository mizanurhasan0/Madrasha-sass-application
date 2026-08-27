import { RoleGuard } from "@/components/dashboard/role-guard";
import { MyClassesList } from "@/components/teacher/my-classes-list";

export default function MyClassesPage() {
  return (
    <RoleGuard allowed={["teacher"]}>
      <MyClassesList />
    </RoleGuard>
  );
}
