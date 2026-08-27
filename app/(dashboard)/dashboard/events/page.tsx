import { RoleGuard } from "@/components/dashboard/role-guard";
import { EventsPageContent } from "@/components/events/events-page-content";

export default function EventsPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <EventsPageContent />
    </RoleGuard>
  );
}
