import { Suspense } from "react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { MyFeesView } from "@/components/guardian/my-fees-view";
import { TableSkeleton } from "@/components/common/loading-state";

export default function MyFeesPage() {
  return (
    <RoleGuard allowed={["guardian"]}>
      <Suspense fallback={<TableSkeleton />}>
        <MyFeesView />
      </Suspense>
    </RoleGuard>
  );
}
