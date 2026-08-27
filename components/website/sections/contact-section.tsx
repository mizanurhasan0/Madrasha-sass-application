"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CmsField, SaveBar } from "@/components/website/cms-field";

export type ContactState = {
  pageTitle: string;
  pageSubtitle: string;
  address: string;
  phone: string;
  email: string;
  officeHours: string;
  facebook: string;
  youtube: string;
  whatsapp: string;
  showMap: boolean;
};

type ContactSectionProps = {
  contact: ContactState;
  onChange: (contact: ContactState) => void;
  onSave: () => void;
};

export function ContactSection({ contact, onChange, onSave }: ContactSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Page</CardTitle>
        <CardDescription>Contact details and social links for visitors.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CmsField label="Page Title">
          <Input
            value={contact.pageTitle}
            onChange={(e) => onChange({ ...contact, pageTitle: e.target.value })}
          />
        </CmsField>
        <CmsField label="Page Subtitle">
          <Textarea
            rows={2}
            value={contact.pageSubtitle}
            onChange={(e) => onChange({ ...contact, pageSubtitle: e.target.value })}
          />
        </CmsField>
        <CmsField label="Address">
          <Textarea
            rows={2}
            value={contact.address}
            onChange={(e) => onChange({ ...contact, address: e.target.value })}
          />
        </CmsField>
        <div className="grid gap-4 sm:grid-cols-2">
          <CmsField label="Phone">
            <Input
              value={contact.phone}
              onChange={(e) => onChange({ ...contact, phone: e.target.value })}
            />
          </CmsField>
          <CmsField label="Email">
            <Input
              value={contact.email}
              onChange={(e) => onChange({ ...contact, email: e.target.value })}
            />
          </CmsField>
        </div>
        <CmsField label="Office Hours">
          <Input
            value={contact.officeHours}
            onChange={(e) => onChange({ ...contact, officeHours: e.target.value })}
          />
        </CmsField>
        <div className="grid gap-4 sm:grid-cols-3">
          <CmsField label="Facebook URL">
            <Input
              value={contact.facebook}
              onChange={(e) => onChange({ ...contact, facebook: e.target.value })}
            />
          </CmsField>
          <CmsField label="YouTube URL">
            <Input
              value={contact.youtube}
              onChange={(e) => onChange({ ...contact, youtube: e.target.value })}
            />
          </CmsField>
          <CmsField label="WhatsApp URL">
            <Input
              value={contact.whatsapp}
              onChange={(e) => onChange({ ...contact, whatsapp: e.target.value })}
            />
          </CmsField>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Show Map</p>
            <p className="text-xs text-muted-foreground">Display location map placeholder</p>
          </div>
          <Switch
            checked={contact.showMap}
            onCheckedChange={(checked) => onChange({ ...contact, showMap: checked })}
          />
        </div>
        <SaveBar onSave={onSave} />
      </CardContent>
    </Card>
  );
}
