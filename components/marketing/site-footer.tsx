"use client";

import Link from "next/link";
import { publicNavLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useT } from "@/lib/i18n/locale-provider";
import { marketingContainer } from "./layout";

export function SiteFooter() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep py-16 pb-8 text-white/75">
      <div className={marketingContainer}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="mb-3 font-heading text-xl text-white">{siteConfig.shortName}</p>
            <p className="text-sm leading-relaxed">{t("footer.description")}</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-lime">
              {t("footer.quickLinks")}
            </h4>
            {publicNavLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-1 text-[0.9375rem] transition-colors hover:text-lime"
              >
                {t(link.titleKey)}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-lime">
              {t("footer.explore")}
            </h4>
            {publicNavLinks.slice(5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-1 text-[0.9375rem] transition-colors hover:text-lime"
              >
                {t(link.titleKey)}
              </Link>
            ))}
            <Link
              href="/login"
              className="block py-1 text-[0.9375rem] transition-colors hover:text-lime"
            >
              {t("footer.portalLogin")}
            </Link>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-lime">
              {t("footer.contact")}
            </h4>
            <p className="text-sm">{siteConfig.contact.address}</p>
            <p className="mt-2 text-sm">{siteConfig.contact.phone}</p>
            <p className="text-sm">{siteConfig.contact.email}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm">
          {t("footer.copyright", { year, name: siteConfig.shortName, rights: t("footer.rights") })}
        </div>
      </div>
    </footer>
  );
}
