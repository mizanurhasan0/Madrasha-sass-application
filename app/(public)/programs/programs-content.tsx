"use client";

import Link from "next/link";
import type { Program, ProgramsMetaState } from "@/components/website/sections/programs-section";
import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { Section } from "@/components/marketing/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { Reveal, wowStaggerDelay } from "@/components/marketing/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisonExtras: Record<string, { age: string; outcome: string }> = {
  "Hifz Program": { age: "7–18 years", outcome: "Complete Hifz certification" },
  Nazera: { age: "6–14 years", outcome: "Fluent Quran recitation" },
  "Islamic Studies": { age: "All ages", outcome: "Strong Islamic foundation" },
  "General Education": { age: "6–16 years", outcome: "National curriculum + Islamic studies" },
};

type ProgramsContentProps = {
  programs: Program[];
  meta: ProgramsMetaState;
};

export function ProgramsContent({ programs, meta }: ProgramsContentProps) {
  return (
    <>
      <MarketingPageHeader
        eyebrow="Academics"
        title={meta.pageTitle}
        description={meta.pageSubtitle}
      />
      <Section tone="sand">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {programs.map((program, i) => (
            <Reveal key={program.title} delay={wowStaggerDelay(i)}>
              <Card className="h-full border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>Duration: {program.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">{program.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="mb-6 font-heading text-2xl">Program Comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => {
                const extra = comparisonExtras[program.title] ?? {
                  age: "Varies",
                  outcome: "Islamic education",
                };
                return (
                  <TableRow key={program.title}>
                    <TableCell className="font-medium">{program.title}</TableCell>
                    <TableCell>{program.duration}</TableCell>
                    <TableCell>{extra.age}</TableCell>
                    <TableCell>{extra.outcome}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Section>

      <CtaBand
        title={meta.ctaTitle}
        description={meta.ctaDescription}
        primaryHref="/admission"
        primaryLabel="Apply Now"
        secondaryHref="/contact"
      />
      <Section>
        <div className="flex flex-wrap justify-center gap-4">
          <Button render={<Link href="/admission" />}>Apply Now</Button>
          <Button variant="outline" render={<Link href="/contact" />}>
            Contact Us
          </Button>
        </div>
      </Section>
    </>
  );
}
