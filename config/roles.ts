import type { UserRole } from "@/types/user";

export const roleLabels: Record<UserRole, string> = {
  super_admin: "Super Admin",
  madrasa_admin: "Madrasa Admin",
  teacher: "Teacher",
  accountant: "Accountant",
  guardian: "Guardian",
};

export const rolePermissions: Record<UserRole, string[]> = {
  super_admin: ["*"],
  madrasa_admin: [
    "students:*",
    "teachers:*",
    "academic:*",
    "attendance:*",
    "fees:*",
    "exams:*",
    "notices:*",
    "events:*",
    "gallery:*",
    "website:*",
    "reports:*",
    "settings:*",
  ],
  teacher: [
    "attendance:read",
    "attendance:write",
    "students:read",
    "results:read",
    "results:write",
    "notices:read",
  ],
  accountant: [
    "fees:*",
    "payments:*",
    "receipts:*",
    "reports:read",
  ],
  guardian: [
    "children:read",
    "attendance:read",
    "fees:read",
    "results:read",
    "notices:read",
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const perms = rolePermissions[role];
  if (perms.includes("*")) return true;
  return perms.some((p) => {
    if (p === permission) return true;
    const [resource, action] = p.split(":");
    const [reqResource, reqAction] = permission.split(":");
    return resource === reqResource && (action === "*" || action === reqAction);
  });
}
