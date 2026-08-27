import { RoleGuard } from "@/components/dashboard/role-guard";
import { GalleryPageContent } from "@/components/gallery/gallery-page-content";

export default function GalleryPage() {
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <GalleryPageContent />
    </RoleGuard>
  );
}
