import type { MetadataRoute } from "next";
import { readWebsiteConfig } from "@/lib/website/config";

export default function robots(): MetadataRoute.Robots {
  const config = readWebsiteConfig();
  const base = config.general.websiteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/", "/login", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
