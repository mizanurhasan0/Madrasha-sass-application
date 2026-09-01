"use client";

import { Bell, BookOpen, GraduationCap, LayoutDashboard, Users } from "lucide-react";
import { useT } from "@/lib/i18n/locale-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardPreview() {
  const t = useT();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-2xl">
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
        <LayoutDashboard className="size-5 text-lime" />
        <span className="font-semibold text-white">{t("dashboardPreview.overview")}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Users, label: t("dashboardPreview.students"), value: "248" },
          { icon: GraduationCap, label: t("dashboardPreview.teachers"), value: "18" },
          { icon: BookOpen, label: t("dashboardPreview.attendance"), value: "94%" },
          { icon: Bell, label: t("dashboardPreview.events"), value: "3" },
        ].map((item) => (
          <Card key={item.label} className="border-white/10 bg-white/10 text-white">
            <CardHeader className="pb-2">
              <item.icon className="size-4 text-lime" />
              <CardTitle className="text-sm font-medium text-white/80">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-2xl font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 space-y-2 rounded-xl bg-black/20 p-3 text-sm text-white/75">
        <p>{t("dashboardPreview.feed1")}</p>
        <p>{t("dashboardPreview.feed2")}</p>
        <p>{t("dashboardPreview.feed3")}</p>
      </div>
    </div>
  );
}
