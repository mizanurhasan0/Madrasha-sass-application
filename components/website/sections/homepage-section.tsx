"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection, CmsVisibilitySwitch } from "@/components/website/cms-page-section";

export type HomepageState = {
  heroTitle: string;
  heroSubtitle: string;
  badgeText: string;
  primaryCta: string;
  secondaryCta: string;
  showStats: boolean;
  showTestimonials: boolean;
};

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
    </CmsPageSection>
  );
}
