"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useT } from "@/lib/i18n/locale-provider";
import { toast } from "sonner";

export function ContactForm() {
  const t = useT();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success(t("contact.success"));
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border/60 bg-card p-8 shadow-soft">
        <div>
          <Label htmlFor="name">{t("common.name")}</Label>
          <Input id="name" name="name" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">{t("common.email")}</Label>
          <Input id="email" name="email" type="email" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">{t("common.phone")}</Label>
          <Input id="phone" name="phone" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="message">{t("contact.message")}</Label>
          <Textarea id="message" name="message" rows={5} required className="mt-1.5" />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? t("common.loading") : t("contact.sendMessage")}
        </Button>
      </form>
      <div className="space-y-6">
        <div>
          <h3 className="font-heading text-2xl">{t("contact.sendMessageTitle")}</h3>
          <p className="mt-2 text-muted-foreground">{t("contact.sendMessageDesc")}</p>
        </div>
        <div className="space-y-3 text-muted-foreground">
          <p><strong className="text-foreground">{t("common.address")}:</strong> {siteConfig.contact.address}</p>
          <p><strong className="text-foreground">{t("common.phone")}:</strong> {siteConfig.contact.phone}</p>
          <p><strong className="text-foreground">{t("common.email")}:</strong> {siteConfig.contact.email}</p>
          <p><strong className="text-foreground">{t("contact.officeHours")}:</strong> {siteConfig.contact.officeHours}</p>
        </div>
      </div>
    </div>
  );
}
