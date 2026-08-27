"use client";

import { use } from "react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { StudentProfile } from "@/components/students/student-profile";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function StudentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <StudentProfile studentId={id} />
    </RoleGuard>
  );
}
