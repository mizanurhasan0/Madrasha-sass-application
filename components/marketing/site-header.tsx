"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { publicNavLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { marketingContainer } from "./layout";

export function SiteHeader() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div
        className={cn(
          marketingContainer,
          "flex h-[4.5rem] items-center justify-between gap-4"
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-heading text-xl font-semibold text-deep"
        >
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3.5 py-2 text-[0.9375rem] font-medium text-deep transition-colors",
                pathname === link.href
                  ? "bg-sand text-primary"
                  : "hover:bg-sand hover:text-primary"
              )}
            >
              {t(link.titleKey)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button size="sm" render={<Link href="/login" />}>
            {t("nav.login")}
          </Button>
        </div>

        <button
          type="button"
          className="flex p-2 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/6 bg-white p-4 lg:hidden">
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 font-medium text-deep hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {t(link.titleKey)}
            </Link>
          ))}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button size="sm" render={<Link href="/login" />}>
              {t("nav.login")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
