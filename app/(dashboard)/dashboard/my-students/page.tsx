import { RoleGuard } from "@/components/dashboard/role-guard";
import { MyStudentsList } from "@/components/teacher/my-students-list";

export default function MyStudentsPage() {
  return (
    <RoleGuard allowed={["teacher"]}>
      <MyStudentsList />
    </RoleGuard>
  );
}
