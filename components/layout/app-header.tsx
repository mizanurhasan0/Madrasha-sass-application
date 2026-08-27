"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { NotificationDropdown } from "@/components/layout/notification-dropdown";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { SearchInput } from "@/components/common/search-input";
import { useT } from "@/lib/i18n/locale-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function AppHeader() {
  const [search, setSearch] = useState("");
  const t = useT();

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t("common.search")}
          className="hidden w-48 lg:block xl:w-64"
        />
        <NotificationDropdown />
        <LanguageSwitcher />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
