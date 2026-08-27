import { RoleGuard } from "@/components/dashboard/role-guard";
import { MarksEntryGrid } from "@/components/exams/marks-entry-grid";

type MarksPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MarksPage({ params }: MarksPageProps) {
  const { id } = await params;

  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <MarksEntryGrid examId={id} />
    </RoleGuard>
  );
}
