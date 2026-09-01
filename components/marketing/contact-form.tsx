"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { WebsiteContact } from "@/types/website";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useT } from "@/lib/i18n/locale-provider";
import { whatsappUrl } from "@/lib/website/config";
import { toast } from "sonner";

type ContactFormProps = {
  contact: WebsiteContact;
};

export function ContactForm({ contact }: ContactFormProps) {
  const t = useT();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    toast.success(t("contact.success"));
    (e.target as HTMLFormElement).reset();
  }

  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;
  const mailHref = `mailto:${contact.email}`;
  const waHref =
    contact.whatsapp && contact.whatsapp !== "#"
      ? whatsappUrl(contact.whatsapp, "Assalamu Alaikum, I would like to get in touch.")
      : null;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-border/60 bg-card p-8 shadow-soft"
      >
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

        <div className="space-y-4">
          <a
            href={phoneHref}
            className="flex items-start gap-3 rounded-xl border border-border/60 p-4 transition-colors hover:bg-muted/40"
          >
            <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">{t("common.phone")}</p>
              <p className="text-muted-foreground">{contact.phone}</p>
            </div>
          </a>
          <a
            href={mailHref}
            className="flex items-start gap-3 rounded-xl border border-border/60 p-4 transition-colors hover:bg-muted/40"
          >
            <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">{t("common.email")}</p>
              <p className="text-muted-foreground">{contact.email}</p>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-xl border border-border/60 p-4">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">{t("common.address")}</p>
              <p className="text-muted-foreground">{contact.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border/60 p-4">
            <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">{t("contact.officeHours")}</p>
              <p className="text-muted-foreground">{contact.officeHours}</p>
            </div>
          </div>
        </div>

        {waHref && (
          <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a]" render={<a href={waHref} target="_blank" rel="noopener noreferrer" />}>
            Chat on WhatsApp
          </Button>
        )}

        {contact.showMap && (
          <div className="overflow-hidden rounded-xl border border-border/60">
            <iframe
              title="Campus location"
              src="https://maps.google.com/maps?q=Mirpur%20DOHS%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="aspect-video w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </div>
  );
}
