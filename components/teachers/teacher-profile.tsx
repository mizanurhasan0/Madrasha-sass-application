"use client";

import { Mail, MapPin, Phone, BookOpen, GraduationCap } from "lucide-react";
import { UserAvatar } from "@/components/common/user-avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { DateDisplay } from "@/components/common/format-display";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { academicService } from "@/services/academic.service";
import { formatPhone } from "@/lib/format";
import type { Teacher } from "@/types/teacher";

type TeacherProfileProps = {
  teacher: Teacher;
};

export function TeacherProfile({ teacher }: TeacherProfileProps) {
  const classMap = new Map(academicService.getAllClasses().map((c) => [c.id, c.name]));
  const assignedClasses = teacher.classIds
    .map((id) => classMap.get(id))
    .filter(Boolean) as string[];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
          <UserAvatar name={teacher.name} src={teacher.avatar} size="lg" />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">{teacher.name}</h2>
                {teacher.nameBn && (
                  <p className="text-muted-foreground">{teacher.nameBn}</p>
                )}
                <p className="mt-1 text-sm text-muted-foreground">{teacher.designation}</p>
              </div>
              <StatusBadge status={teacher.status} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <a href={`mailto:${teacher.email}`} className="hover:underline">
                  {teacher.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <span>{formatPhone(teacher.phone)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4 text-muted-foreground" />
                <span>{teacher.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="size-4 text-muted-foreground" />
                <span>
                  Joined <DateDisplay date={teacher.joiningDate} />
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="size-4" />
              Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {teacher.subjects.map((subject) => (
                <Badge key={subject} variant="secondary">
                  {subject}
                </Badge>
              ))}
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
            {assignedClasses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {assignedClasses.map((cls) => (
                  <Badge key={cls} variant="outline">
                    {cls}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No classes assigned</p>
            )}
          </CardContent>
        </Card>
      </div>

      {teacher.bio && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{teacher.bio}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
