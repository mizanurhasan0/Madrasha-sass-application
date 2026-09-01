import type { Metadata } from "next";
import { readWebsiteConfig } from "@/lib/website/config";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PublicSiteProvider } from "@/components/marketing/public-site-provider";
import { WhatsAppFab } from "@/components/marketing/whatsapp-fab";
import { AdmissionBanner } from "@/components/marketing/admission-banner";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const config = readWebsiteConfig();
  return {
    title: {
      default: config.general.madrasaName,
      template: `%s | ${config.general.madrasaName}`,
    },
    description: config.general.description,
    metadataBase: new URL(config.general.websiteUrl),
    openGraph: {
      siteName: config.general.madrasaName,
      locale: "en_BD",
    },
  };
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const config = readWebsiteConfig();

  return (
    <PublicSiteProvider config={config}>
      <OrganizationJsonLd config={config} />
      <WebSiteJsonLd config={config} />
      {config.homepage.admissionOpen && (
        <AdmissionBanner text={config.homepage.admissionBannerText} />
      )}
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab phone={config.contact.whatsapp} />
    </PublicSiteProvider>
  );
}
