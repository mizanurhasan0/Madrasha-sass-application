import { RoleGuard } from "@/components/dashboard/role-guard";
import { ExamList } from "@/components/exams/exam-list";

export default function ExamsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <ExamList />
    </RoleGuard>
  );
}
