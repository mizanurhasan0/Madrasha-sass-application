"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";
import { useT } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

const pageLinks = [
  { href: "/about", key: "nav.about" },
  { href: "/causes", key: "nav.causes" },
  { href: "/team", key: "nav.team" },
  { href: "/faq", key: "nav.faq" },
  { href: "/testimonials", key: "nav.testimonials" },
  { href: "/news", key: "nav.news" },
  { href: "/shop", key: "nav.shop" },
];

export function SiteHeader() {
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <header className="is-header">
      <div className="is-container is-header-inner">
        <Link href="/" className="shrink-0">
          <Image src="/theme/logo.png" alt="Islamus" width={140} height={48} priority />
        </Link>

        <nav className="is-nav">
          <Link href="/" className="is-active">
            {t("nav.home")}
          </Link>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setPagesOpen(!pagesOpen)}
            >
              {t("nav.pages")} <ChevronDown className="size-4" />
            </button>
            {pagesOpen && (
              <div
                className="absolute top-full left-0 mt-1 min-w-[180px] rounded-xl bg-white py-2 shadow-lg"
                onMouseLeave={() => setPagesOpen(false)}
              >
                {pageLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2 text-sm hover:bg-[var(--theme-color-gray)]"
                    onClick={() => setPagesOpen(false)}
                  >
                    {t(l.key)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/causes">{t("nav.donation")}</Link>
          <Link href="/events">{t("nav.events")}</Link>
          <Link href="/news">{t("nav.news")}</Link>
          <Link href="/contact">{t("nav.contact")}</Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeBtn href="/#prayer-times" variant="five">
            {t("islamus.prayerTime")}
          </ThemeBtn>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <Link href="/" className="block py-2" onClick={() => setMobileOpen(false)}>
            {t("nav.home")}
          </Link>
          <p className="py-2 text-xs font-semibold uppercase text-[var(--text-color)]">{t("nav.pages")}</p>
          {pageLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 pl-4"
              onClick={() => setMobileOpen(false)}
            >
              {t(l.key)}
            </Link>
          ))}
          <Link href="/causes" className="block py-2" onClick={() => setMobileOpen(false)}>
            {t("nav.donation")}
          </Link>
          <Link href="/events" className="block py-2" onClick={() => setMobileOpen(false)}>
            {t("nav.events")}
          </Link>
          <Link href="/news" className="block py-2" onClick={() => setMobileOpen(false)}>
            {t("nav.news")}
          </Link>
          <Link href="/contact" className="block py-2" onClick={() => setMobileOpen(false)}>
            {t("nav.contact")}
          </Link>
          <div className={cn("mt-4")}>
            <ThemeBtn href="/#prayer-times" variant="five">
              {t("islamus.prayerTime")}
            </ThemeBtn>
          </div>
        </div>
      )}
    </header>
  );
}
