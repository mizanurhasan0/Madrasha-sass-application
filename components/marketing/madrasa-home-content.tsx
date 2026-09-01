"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { Notice, Event } from "@/types/notice";
import type { Teacher } from "@/types/teacher";
import type { Program } from "@/components/website/sections/programs-section";
import type { WebsiteConfig } from "@/types/website";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { MadrasaHomeHero } from "./madrasa-home-hero";
import { MadrasaStatsBand } from "./madrasa-stats-band";
import { Testimonials } from "./testimonials";
import { Section } from "./section";
import { SectionTitle } from "./section-title";
import { Reveal, wowStaggerDelay } from "./reveal";
import { FaqSection } from "./faq-section";
import { FaqJsonLd } from "@/components/seo/json-ld";

const whoWeServe = [
  {
    title: "Hifz Program",
    description: "Full-time Quran memorization with tajweed, supervised by experienced Hafiz teachers.",
  },
  {
    title: "Nazera & Tajweed",
    description: "Correct recitation and pronunciation for students building their Quranic foundation.",
  },
  {
    title: "General Education",
    description: "Islamic studies combined with Bangla, English, and mathematics for well-rounded growth.",
  },
];

const dayTimeline = [
  { time: "6:30 AM", activity: "Fajr & morning assembly" },
  { time: "7:30 AM", activity: "Quran / Hifz session" },
  { time: "10:00 AM", activity: "Academic classes" },
  { time: "1:00 PM", activity: "Dhuhr & lunch break" },
  { time: "2:30 PM", activity: "Islamic studies & activities" },
  { time: "4:30 PM", activity: "Asr & dismissal" },
];

type MadrasaHomeContentProps = {
  config: WebsiteConfig;
  notices: Notice[];
  events: Event[];
  teachers: Teacher[];
};

export function MadrasaHomeContent({
  config,
  notices,
  events,
  teachers,
}: MadrasaHomeContentProps) {
  const featuredPrograms = config.programs.slice(0, 3);

  const faqItems = [
    {
      question: "How do I apply for admission?",
      answer: "Complete the online application at /admission or visit our campus during office hours.",
    },
    {
      question: "What programs do you offer?",
      answer: "We offer Hifz, Nazera, Islamic studies, Arabic, and general education programs.",
    },
    {
      question: "How can I check my child's result?",
      answer: "Use the public result portal at /check-result with student ID and exam name.",
    },
  ];

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <MadrasaHomeHero
        general={config.general}
        homepage={config.homepage}
        whatsapp={config.contact.whatsapp}
      />
      {config.homepage.showStats && <MadrasaStatsBand />}

      <Section>
        <SectionTitle eyebrow="Who We Serve" title="Programs for Every Stage" />
        <div className="grid gap-6 md:grid-cols-3">
          {whoWeServe.map((item, i) => (
            <Reveal key={item.title} delay={wowStaggerDelay(i)}>
              <Card className="h-full border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionTitle eyebrow="Programs" title="Featured Programs" />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPrograms.map((program, i) => (
            <Reveal key={program.title} delay={wowStaggerDelay(i)}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button render={<Link href="/programs" />}>
            View All Programs <ArrowRight className="size-4" />
          </Button>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Campus Life" title="A Day at Our Madrasa" />
        <div className="mx-auto max-w-2xl space-y-4">
          {dayTimeline.map((item, i) => (
            <Reveal key={item.time} delay={wowStaggerDelay(i)}>
              <div className="flex gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-soft">
                <span className="shrink-0 font-mono text-sm font-semibold text-primary">
                  {item.time}
                </span>
                <p className="text-muted-foreground">{item.activity}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionTitle eyebrow="Our Team" title="Featured Teachers" />
        <div className="grid gap-6 md:grid-cols-3">
          {teachers.map((teacher, i) => (
            <Reveal key={teacher.id} delay={wowStaggerDelay(i)}>
              <Card className="h-full border-border/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <CardDescription>{teacher.designation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{teacher.bio}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" render={<Link href="/teachers" />}>
            Meet All Teachers
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Updates" title="Latest Notices" align="left" />
            <ul className="mt-6 space-y-4">
              {notices.map((notice) => (
                <li key={notice.id} className="rounded-xl border border-border/60 p-4 shadow-soft">
                  <p className="font-medium">{notice.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {notice.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(notice.publishDate)}
                  </p>
                </li>
              ))}
            </ul>
            <Button className="mt-6" variant="outline" render={<Link href="/notices" />}>
              All Notices
            </Button>
          </div>
          <div>
            <SectionTitle eyebrow="Calendar" title="Upcoming Events" align="left" />
            <ul className="mt-6 space-y-4">
              {events.map((event) => (
                <li key={event.id} className="rounded-xl border border-border/60 p-4 shadow-soft">
                  <p className="font-medium">{event.title}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-4" /> {formatDate(event.date)} · {event.time}
                  </p>
                </li>
              ))}
            </ul>
            <Button className="mt-6" variant="outline" render={<Link href="/events" />}>
              All Events
            </Button>
          </div>
        </div>
      </Section>

      {config.homepage.showTestimonials && <Testimonials />}

      <FaqSection />

      <Section tone="deep" containerClassName="text-center">
        <Reveal>
          <h2 className="font-heading text-3xl text-white sm:text-4xl">Visit Our Campus</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">{config.contact.address}</p>
          <p className="mt-2 text-white/75">{config.contact.phone} · {config.contact.email}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" render={<Link href="/admission" />}>
              Apply for Admission
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
              render={<Link href="/contact" />}
            >
              Contact Us
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <Card className="h-full border-border/60 shadow-soft">
      <CardHeader>
        <CardTitle>{program.title}</CardTitle>
        <CardDescription>{program.duration}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{program.description}</p>
      </CardContent>
    </Card>
  );
}
