"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CmsField } from "@/components/website/cms-field";
import { CmsPageSection } from "@/components/website/cms-page-section";

import type { WebsiteProgram, WebsiteProgramsMeta } from "@/types/website";

export type Program = WebsiteProgram;
export type ProgramsMetaState = WebsiteProgramsMeta;

export const defaultPrograms: Program[] = [
  {
    title: "Hifz Program",
    duration: "3–5 years",
    description:
      "Complete memorization of the Holy Quran with tajweed, daily sabaq, sabqi, and manzil revision under qualified Hafiz teachers.",
  },
  {
    title: "Nazera",
    duration: "1–2 years",
    description:
      "Fluent Quran reading with proper tajweed rules. Foundation program for students beginning their Quranic journey.",
  },
  {
    title: "Islamic Studies",
    duration: "Ongoing",
    description:
      "Comprehensive curriculum covering Aqeedah, Fiqh basics, Seerah, and Islamic history for all age groups.",
  },
  {
    title: "General Education",
    duration: "6 years",
    description:
      "Bangla, English, Mathematics, and Science aligned with national curriculum alongside Islamic education.",
  },
];

type ProgramsSectionProps = {
  programs: Program[];
  meta: ProgramsMetaState;
  onProgramsChange: (programs: Program[]) => void;
  onMetaChange: (meta: ProgramsMetaState) => void;
  onSave: () => void;
};

export function ProgramsSection({
  programs,
  meta,
  onProgramsChange,
  onMetaChange,
  onSave,
}: ProgramsSectionProps) {
  return (
    <CmsPageSection
      title="Programs Page"
      description="Academic offerings displayed on the public site."
      onSave={onSave}
    >
      <CmsField label="Page Title">
        <Input
          value={meta.pageTitle}
          onChange={(e) => onMetaChange({ ...meta, pageTitle: e.target.value })}
        />
      </CmsField>
      <CmsField label="Page Subtitle">
        <Textarea
          rows={2}
          value={meta.pageSubtitle}
          onChange={(e) => onMetaChange({ ...meta, pageSubtitle: e.target.value })}
        />
      </CmsField>
      {programs.map((program, index) => (
        <div key={index} className="space-y-3 rounded-lg border p-4">
          <p className="text-sm font-medium">Program {index + 1}</p>
          <CmsField label="Title">
            <Input
              value={program.title}
              onChange={(e) => {
                const next = [...programs];
                next[index] = { ...next[index], title: e.target.value };
                onProgramsChange(next);
              }}
            />
          </CmsField>
          <CmsField label="Duration">
            <Input
              value={program.duration}
              onChange={(e) => {
                const next = [...programs];
                next[index] = { ...next[index], duration: e.target.value };
                onProgramsChange(next);
              }}
            />
          </CmsField>
          <CmsField label="Description">
            <Textarea
              rows={2}
              value={program.description}
              onChange={(e) => {
                const next = [...programs];
                next[index] = { ...next[index], description: e.target.value };
                onProgramsChange(next);
              }}
            />
          </CmsField>
        </div>
      ))}
      <CmsField label="CTA Title">
        <Input
          value={meta.ctaTitle}
          onChange={(e) => onMetaChange({ ...meta, ctaTitle: e.target.value })}
        />
      </CmsField>
      <CmsField label="CTA Description">
        <Textarea
          rows={2}
          value={meta.ctaDescription}
          onChange={(e) => onMetaChange({ ...meta, ctaDescription: e.target.value })}
        />
      </CmsField>
    </CmsPageSection>
  );
}
