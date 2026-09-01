import { defaultWebsiteConfig } from "@/data/website-config";
import type { WebsiteConfig } from "@/types/website";
import { success } from "./base.service";

let configStore: WebsiteConfig = structuredClone(defaultWebsiteConfig);

export function getWebsiteConfig(): WebsiteConfig {
  return configStore;
}

export const websiteService = {
  async getConfig() {
    return success(structuredClone(configStore));
  },

  async saveConfig(config: WebsiteConfig) {
    configStore = structuredClone(config);
    return success(configStore);
  },

  async updateSection<K extends keyof WebsiteConfig>(section: K, data: WebsiteConfig[K]) {
    configStore = { ...configStore, [section]: structuredClone(data) };
    return success(configStore);
  },
};
