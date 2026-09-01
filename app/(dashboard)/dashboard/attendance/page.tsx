import { RoleGuard } from "@/components/dashboard/role-guard";
import { AttendancePageContent } from "@/components/attendance/attendance-page-content";

export default function AttendancePage() {
  return (
    <RoleGuard allowed={["madrasa_admin", "teacher", "guardian"]}>
      <AttendancePageContent />
    </RoleGuard>
  );
}
