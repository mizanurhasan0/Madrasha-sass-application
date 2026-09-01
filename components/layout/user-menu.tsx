"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { useT } from "@/lib/i18n/locale-provider";
import { UserAvatar } from "@/components/common/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const t = useT();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="h-auto gap-2 px-2 py-1.5" />}
      >
        <UserAvatar name={user.name} src={user.avatar} size="sm" />
        <div className="hidden text-left md:block">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          {role && (
            <p className="mt-0.5 text-xs text-muted-foreground">{t(`roles.${role}`)}</p>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span>{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
            {role && (
              <span className="text-xs font-normal text-muted-foreground">
                {t(`roles.${role}`)}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
          <User className="size-4" />
          {t("nav.profile")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} variant="destructive">
          <LogOut className="size-4" />
          {t("nav.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
