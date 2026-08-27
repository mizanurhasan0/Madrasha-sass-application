"use client";

import { useMemo } from "react";
import { Mail, MapPin, Phone, Briefcase, GraduationCap, Users } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { UserAvatar } from "@/components/common/user-avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { roleLabels } from "@/config/roles";
import { formatPhone } from "@/lib/format";
import { teacherService } from "@/services/teacher.service";
import { guardians } from "@/data/guardians";
import { staffMembers } from "@/data/teachers";
import { academicService } from "@/services/academic.service";
import { studentService } from "@/services/student.service";

export function UserProfile() {
  const { user, role } = useAuth();

  const teacher = useMemo(
    () =>
      role === "teacher"
        ? teacherService.getAll().find((t) => t.email === user?.email)
        : undefined,
    [role, user?.email]
  );

  const staff = useMemo(
    () =>
      role === "accountant"
        ? staffMembers.find((s) => s.email === user?.email)
        : undefined,
    [role, user?.email]
  );

  const guardian = useMemo(
    () =>
      role === "guardian"
        ? guardians.find(
            (g) => g.email === user?.email || g.phone === user?.email
          )
        : undefined,
    [role, user?.email]
  );

  const children = useMemo(() => {
    if (!guardian) return [];
    return studentService
      .getAll()
      .filter((s) => guardian.studentIds.includes(s.id));
  }, [guardian]);

  const assignedClasses = useMemo(() => {
    if (!teacher) return [];
    const classMap = new Map(academicService.getAllClasses().map((c) => [c.id, c.name]));
    return teacher.classIds.map((id) => classMap.get(id) ?? id);
  }, [teacher]);

  if (!user || !role) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Your account and role information."
      />

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
          <UserAvatar name={user.name} src={user.avatar} size="lg" />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{roleLabels[role]}</p>
              </div>
              <StatusBadge status="active" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <a href={`mailto:${user.email}`} className="hover:underline">
                  {user.email}
                </a>
              </div>
              {teacher?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{formatPhone(teacher.phone)}</span>
                </div>
              )}
              {staff?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{formatPhone(staff.phone)}</span>
                </div>
              )}
              {guardian?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{formatPhone(guardian.phone)}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {teacher && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Designation</span>
                <span className="font-medium">{teacher.designation}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground">Address</span>
                <span className="text-right font-medium">{teacher.address}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Joined</span>
                <DateDisplay date={teacher.joiningDate} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GraduationCap className="size-4" />
                Assigned Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {assignedClasses.map((name) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {teacher.subjects.map((subject) => (
                  <Badge key={subject} variant="outline">
                    {subject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {staff && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="size-4" />
              Staff Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Designation</span>
              <span className="font-medium">{staff.designation}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Department</span>
              <span className="font-medium">{staff.department}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Joined</span>
              <DateDisplay date={staff.joiningDate} />
            </div>
          </CardContent>
        </Card>
      )}

      {guardian && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Guardian Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Relation</span>
                <span className="font-medium">{guardian.relation}</span>
              </div>
              {guardian.occupation && (
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Occupation</span>
                  <span className="font-medium">{guardian.occupation}</span>
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground">Address</span>
                <span className="flex items-center gap-1.5 text-right font-medium">
                  <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
                  {guardian.address}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="size-4" />
                Children ({children.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{child.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {child.className} · {child.sectionName}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {child.studentId}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
