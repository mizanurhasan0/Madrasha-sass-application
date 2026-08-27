import type { Metadata } from "next";
import { Manrope, Noto_Sans_Bengali } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { getLocaleFromCookie } from "@/lib/i18n/locale";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const gallery = localFont({
  src: "../public/theme/fonts/Gallery/gallery.regular.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "400",
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore.toString());

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${manrope.variable} ${gallery.variable} ${notoBengali.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
