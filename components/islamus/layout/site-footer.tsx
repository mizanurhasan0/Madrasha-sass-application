"use client";

import Image from "next/image";
import Link from "next/link";
import { siteInfo } from "@/data/islamus/content";
import { useT } from "@/lib/i18n/locale-provider";

export function SiteFooter() {
  const t = useT();

  return (
    <footer className="is-footer">
      <div className="absolute inset-0 opacity-20">
        <Image src="/theme/footer/footer-one-bg.png" alt="" fill className="object-cover" />
      </div>
      <div className="is-container relative z-[2]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src="/theme/footer/footer-one-logo.png" alt="Islamus" width={120} height={40} className="mb-6" />
            <p className="text-sm leading-relaxed">
              {t("islamus.footerAbout")}
            </p>
          </div>
          <div>
            <h4>{t("islamus.quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">{t("nav.about")}</Link></li>
              <li><Link href="/causes">{t("nav.causes")}</Link></li>
              <li><Link href="/events">{t("nav.events")}</Link></li>
              <li><Link href="/team">{t("nav.team")}</Link></li>
              <li><Link href="/contact">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t("islamus.contactInfo")}</h4>
            <ul className="space-y-2 text-sm">
              <li>{siteInfo.address}</li>
              <li>{siteInfo.phone}</li>
              <li>{siteInfo.email}</li>
            </ul>
          </div>
          <div>
            <h4>{t("islamus.newsletter")}</h4>
            <p className="mb-4 text-sm">{t("islamus.newsletterText")}</p>
            <form className="flex gap-2">
              <input type="email" placeholder={t("common.email")} className="is-form-input flex-1" />
              <button type="submit" className="is-btn is-btn-five shrink-0">
                {t("common.submit")}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} {siteInfo.name}. {t("islamus.allRights")}
        </div>
      </div>
    </footer>
  );
}
