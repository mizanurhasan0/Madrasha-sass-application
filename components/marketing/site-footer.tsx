"use client";

import Link from "next/link";
import { publicNavLinks } from "@/config/navigation";
import { useWebsiteConfig } from "@/components/marketing/public-site-provider";
import { useT } from "@/lib/i18n/locale-provider";
import { marketingContainer } from "./layout";

export function SiteFooter() {
  const t = useT();
  const config = useWebsiteConfig();
  const year = new Date().getFullYear();

  const quickServices = [
    { href: "/admission", label: "Online Admission" },
    { href: "/check-result", label: "Check Result" },
    { href: "/check-fee", label: "Check Fee" },
    { href: "/platform", label: "For Madrasa Owners" },
  ];

  return (
    <footer className="bg-deep py-16 pb-8 text-white/75">
      <div className={marketingContainer}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="mb-3 font-heading text-xl text-white">{config.general.madrasaName}</p>
            <p className="text-sm leading-relaxed">{config.general.description}</p>
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
              Quick Services
            </h4>
            {quickServices.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-1 text-[0.9375rem] transition-colors hover:text-lime"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-lime">
              {t("footer.contact")}
            </h4>
            <p className="text-sm">{config.contact.address}</p>
            <p className="mt-2 text-sm">{config.contact.phone}</p>
            <p className="text-sm">{config.contact.email}</p>
            <p className="mt-2 text-sm">{config.contact.officeHours}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm">
          {t("footer.copyright", { year, name: config.general.madrasaName, rights: t("footer.rights") })}
        </div>
      </div>
    </footer>
  );
}
