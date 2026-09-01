"use client";

import { createContext, useContext } from "react";
import type { WebsiteConfig } from "@/types/website";

const WebsiteConfigContext = createContext<WebsiteConfig | null>(null);

export function PublicSiteProvider({
  config,
  children,
}: {
  config: WebsiteConfig;
  children: React.ReactNode;
}) {
  return (
    <WebsiteConfigContext.Provider value={config}>{children}</WebsiteConfigContext.Provider>
  );
}

export function useWebsiteConfig(): WebsiteConfig {
  const ctx = useContext(WebsiteConfigContext);
  if (!ctx) {
    throw new Error("useWebsiteConfig must be used within PublicSiteProvider");
  }
  return ctx;
}
