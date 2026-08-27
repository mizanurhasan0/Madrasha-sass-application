import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  );
}
