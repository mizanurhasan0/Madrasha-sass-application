"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { RoleGuard } from "@/components/dashboard/role-guard";
import { PageHeader } from "@/components/common/page-header";
import { FormModal } from "@/components/common/form-modal";
import { TeacherProfile } from "@/components/teachers/teacher-profile";
import { TeacherForm } from "@/components/teachers/teacher-form";
import { ErrorState } from "@/components/common/error-state";
import { LoadingState } from "@/components/common/loading-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { teacherService } from "@/services/teacher.service";
import type { Teacher } from "@/types/teacher";

export default function TeacherDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadTeacher = async () => {
    setLoading(true);
    const result = await teacherService.getTeacherById(id);
    if (result.success) {
      setTeacher(result.data);
      setError(null);
    } else {
      setTeacher(null);
      setError(result.message ?? "Teacher not found");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTeacher();
  }, [id]);

  const handleSuccess = () => {
    setModalOpen(false);
    loadTeacher();
  };

  return (
    <RoleGuard allowed={["madrasa_admin"]}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/teachers"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <ArrowLeft className="mr-1 size-4" />
            Back to Teachers
          </Link>
        </div>

        {loading ? (
          <LoadingState rows={6} />
        ) : error || !teacher ? (
          <ErrorState title="Teacher not found" message={error ?? "This teacher does not exist."} />
        ) : (
          <>
            <PageHeader
              title="Teacher Profile"
              description={`Viewing profile for ${teacher.name}`}
              actions={
                <Button variant="outline" onClick={() => setModalOpen(true)}>
                  <Pencil className="mr-2 size-4" />
                  Edit Profile
                </Button>
              }
            />
            <TeacherProfile teacher={teacher} />
          </>
        )}

        {teacher && (
          <FormModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="Edit Teacher"
            description="Update teacher information and assignments."
          >
            <TeacherForm
              teacher={teacher}
              onSuccess={handleSuccess}
              onCancel={() => setModalOpen(false)}
            />
          </FormModal>
        )}
      </div>
    </RoleGuard>
  );
}
