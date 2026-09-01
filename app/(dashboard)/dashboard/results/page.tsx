import { RoleGuard } from "@/components/dashboard/role-guard";
import { ResultsPageContent } from "@/components/exams/results-page-content";

export default function ResultsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin", "teacher"]}>
      <ResultsPageContent />
    </RoleGuard>
  );
}
