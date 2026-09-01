"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

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
    <CmsPageSection
      title="Contact Page"
      description="Contact details and social links for visitors."
      onSave={onSave}
    >
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
      <CmsVisibilitySwitch
        label="Show Map"
        description="Display location map placeholder"
        checked={contact.showMap}
        onCheckedChange={(checked) => onChange({ ...contact, showMap: checked })}
      />
    </CmsPageSection>
  );
}
