"use client";

import { useMemo } from "react";
import Link from "next/link";
import { GraduationCap, Phone, User } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { UserAvatar } from "@/components/common/user-avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { guardians } from "@/data/guardians";
import { studentService } from "@/services/student.service";
import { formatPhone } from "@/lib/format";

export function ChildrenList() {
  const { user } = useAuth();

  const guardian = useMemo(
    () =>
      guardians.find(
        (g) => g.email === user?.email || g.phone === user?.email
      ),
    [user?.email]
  );

  const children = useMemo(() => {
    if (!guardian) return [];
    return studentService
      .getAll()
      .filter((s) => guardian.studentIds.includes(s.id));
  }, [guardian]);

  if (!guardian) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Children" description="Your enrolled children." />
        <EmptyState
          title="Guardian profile not found"
          description="Your account is not linked to a guardian record."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Children"
        description={`${children.length} child${children.length === 1 ? "" : "ren"} enrolled at the madrasa.`}
      />

      {children.length === 0 ? (
        <EmptyState
          title="No children linked"
          description="Contact the madrasa admin to link your children to your account."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Card key={child.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <UserAvatar name={child.name} src={child.avatar} size="md" />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="truncate text-lg">{child.name}</CardTitle>
                    {child.nameBn && (
                      <p className="truncate text-sm text-muted-foreground">{child.nameBn}</p>
                    )}
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {child.studentId}
                    </p>
                  </div>
                  <StatusBadge status={child.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="size-4 text-muted-foreground" />
                  <span>
                    {child.className} · {child.sectionName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  <span className="capitalize">{child.gender}</span>
                  <span>·</span>
                  <span>
                    Admitted <DateDisplay date={child.admissionDate} />
                  </span>
                </div>
                {child.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="size-4" />
                    <span>{formatPhone(child.phone)}</span>
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="flex-1" render={<Link href={`/dashboard/my-fees?student=${child.id}`} />}>
                    View Fees
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" render={<Link href={`/dashboard/attendance?student=${child.id}`} />}>
                    Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
