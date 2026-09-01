"use client";

import { useEffect, useState } from "react";
import { Moon, Save, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { BrandThemePicker } from "@/components/settings/brand-theme-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { roleLabels } from "@/config/roles";
import { madrasas } from "@/data/madrasas";
import { mockUsers, MADRASA_ID } from "@/data/users";
import type { UserRole } from "@/types/user";

const madrasa = madrasas.find((m) => m.id === MADRASA_ID)!;

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function SettingsContent() {
  const { user, role } = useAuth();
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;
    const account = mockUsers.find((u) => u.id === user.sub);
    setProfile({
      name: user.name,
      email: user.email,
      phone: account?.phone ?? "",
    });
  }, [user]);

  const [madrasaInfo, setMadrasaInfo] = useState({
    name: madrasa.name,
    adminName: madrasa.adminName,
    adminEmail: madrasa.adminEmail,
    phone: madrasa.phone,
    address: madrasa.address,
  });

  const visibleUsers =
    role === "super_admin"
      ? mockUsers
      : mockUsers.filter((u) => u.madrasaId === MADRASA_ID || u.role === "super_admin");

  const handleSave = (section: string) => {
    toast.success(`${section} saved locally`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, madrasa information, users, and appearance."
      />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="madrasa">Madrasa Info</TabsTrigger>
          <TabsTrigger value="users">Users & Permissions</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  placeholder="01XXXXXXXXX"
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              {role && (
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Current Role</p>
                  <p className="mt-1 font-medium">{roleLabels[role]}</p>
                </div>
              )}
              <Button size="sm" onClick={() => handleSave("Profile")}>
                <Save data-icon="inline-start" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="madrasa" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Madrasa Info</CardTitle>
              <CardDescription>
                Institution details for {madrasa.name}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Madrasa Name</Label>
                <Input
                  value={madrasaInfo.name}
                  onChange={(e) => setMadrasaInfo({ ...madrasaInfo, name: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Admin Name</Label>
                  <Input
                    value={madrasaInfo.adminName}
                    onChange={(e) =>
                      setMadrasaInfo({ ...madrasaInfo, adminName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Admin Email</Label>
                  <Input
                    type="email"
                    value={madrasaInfo.adminEmail}
                    onChange={(e) =>
                      setMadrasaInfo({ ...madrasaInfo, adminEmail: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={madrasaInfo.phone}
                  onChange={(e) => setMadrasaInfo({ ...madrasaInfo, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  rows={2}
                  value={madrasaInfo.address}
                  onChange={(e) => setMadrasaInfo({ ...madrasaInfo, address: e.target.value })}
                />
              </div>
              <div className="grid gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Students</p>
                  <p className="font-medium tabular-nums">{madrasa.studentCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Teachers</p>
                  <p className="font-medium tabular-nums">{madrasa.teacherCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <StatusBadge status={madrasa.status} />
                </div>
              </div>
              <Button size="sm" onClick={() => handleSave("Madrasa info")}>
                <Save data-icon="inline-start" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Users & Permissions</CardTitle>
              <CardDescription>
                Team members and their roles. Permissions are defined per role.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{roleLabels[u.role as UserRole]}</TableCell>
                      <TableCell>
                        <StatusBadge status={u.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-xs text-muted-foreground">
                Role permissions are configured in the system. Contact a super admin to
                change user roles.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the dashboard theme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTheme(option.value)}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                      theme === option.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border"
                    }`}
                  >
                    <option.icon className="size-5 text-primary" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Theme preference is saved in your browser and applies across the dashboard.
              </p>

              <div className="border-t pt-6">
                <BrandThemePicker initialTheme={madrasa.theme} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
