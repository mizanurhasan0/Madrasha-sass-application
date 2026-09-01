"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { WebsiteHomepage } from "@/types/website";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

export type HomepageState = WebsiteHomepage;

type HomepageSectionProps = {
  homepage: HomepageState;
  onChange: (homepage: HomepageState) => void;
  onSave: () => void;
};

export function HomepageSection({ homepage, onChange, onSave }: HomepageSectionProps) {
  return (
    <CmsPageSection
      title="Homepage"
      description="Hero section and landing page content."
      onSave={onSave}
    >
      <CmsField label="Hero Title">
        <Input
          value={homepage.heroTitle}
          onChange={(e) => onChange({ ...homepage, heroTitle: e.target.value })}
        />
      </CmsField>
      <CmsField label="Hero Subtitle">
        <Textarea
          rows={3}
          value={homepage.heroSubtitle}
          onChange={(e) => onChange({ ...homepage, heroSubtitle: e.target.value })}
        />
      </CmsField>
      <CmsField label="Badge Text">
        <Input
          value={homepage.badgeText}
          onChange={(e) => onChange({ ...homepage, badgeText: e.target.value })}
        />
      </CmsField>
      <div className="grid gap-4 sm:grid-cols-2">
        <CmsField label="Primary CTA">
          <Input
            value={homepage.primaryCta}
            onChange={(e) => onChange({ ...homepage, primaryCta: e.target.value })}
          />
        </CmsField>
        <CmsField label="Secondary CTA">
          <Input
            value={homepage.secondaryCta}
            onChange={(e) => onChange({ ...homepage, secondaryCta: e.target.value })}
          />
        </CmsField>
      </div>
      <CmsVisibilitySwitch
        label="Show Stats Band"
        description="Student and teacher counts"
        checked={homepage.showStats}
        onCheckedChange={(checked) => onChange({ ...homepage, showStats: checked })}
      />
      <CmsVisibilitySwitch
        label="Show Testimonials"
        description="Guardian feedback section"
        checked={homepage.showTestimonials}
        onCheckedChange={(checked) => onChange({ ...homepage, showTestimonials: checked })}
      />
      <CmsVisibilitySwitch
        label="Admission Open Banner"
        description="Show sticky admission banner on public site"
        checked={homepage.admissionOpen}
        onCheckedChange={(checked) => onChange({ ...homepage, admissionOpen: checked })}
      />
      <CmsField label="Admission Banner Text">
        <Input
          value={homepage.admissionBannerText}
          onChange={(e) => onChange({ ...homepage, admissionBannerText: e.target.value })}
        />
      </CmsField>
    </CmsPageSection>
  );
}
