"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { madrasas } from "@/data/madrasas";
import { MADRASA_ID } from "@/data/users";
import { notices, events } from "@/data/notices";
import { galleryAlbums } from "@/data/gallery";
import { teachers } from "@/data/teachers";
import { GeneralSection } from "@/components/website/sections/general-section";
import { HomepageSection } from "@/components/website/sections/homepage-section";
import { AboutSection } from "@/components/website/sections/about-section";
import { ProgramsSection } from "@/components/website/sections/programs-section";
import { TeachersSection } from "@/components/website/sections/teachers-section";
import { NoticesSection } from "@/components/website/sections/notices-section";
import { EventsSection } from "@/components/website/sections/events-section";
import { GallerySection } from "@/components/website/sections/gallery-section";
import { ContactSection } from "@/components/website/sections/contact-section";
import { websiteService } from "@/services/website.service";
import type { WebsiteConfig } from "@/types/website";

const madrasa = madrasas.find((m) => m.id === MADRASA_ID)!;

export function WebsiteCms() {
  const publishedNotices = notices.filter((n) => n.published).length;
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length;

  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    websiteService.getConfig().then((res) => {
      if (res.success) setConfig(res.data);
      setLoading(false);
    });
  }, []);

  const saveSection = async <K extends keyof WebsiteConfig>(
    section: K,
    label: string,
    data: WebsiteConfig[K]
  ) => {
    const res = await websiteService.updateSection(section, data);
    if (res.success) {
      setConfig(res.data);
      toast.success(`${label} saved — visible on public site`);
    } else {
      toast.error(`Failed to save ${label}`);
    }
  };

  if (loading || !config) {
    return (
      <div className="space-y-6">
        <PageHeader title="Website CMS" description="Loading website configuration..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Website CMS"
        description="Manage public website content shown to visitors and prospective students."
        actions={
          <Button variant="outline" size="sm" render={<Link href="/" target="_blank" />}>
            <ExternalLink data-icon="inline-start" />
            Preview Site
          </Button>
        }
      />

      <Tabs defaultValue="general">
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4">
          <GeneralSection
            madrasaName={madrasa.name}
            general={config.general}
            onChange={(general) => setConfig({ ...config, general })}
            onSave={() => saveSection("general", "General settings", config.general)}
          />
        </TabsContent>

        <TabsContent value="homepage" className="mt-4 space-y-4">
          <HomepageSection
            homepage={config.homepage}
            onChange={(homepage) => setConfig({ ...config, homepage })}
            onSave={() => saveSection("homepage", "Homepage", config.homepage)}
          />
        </TabsContent>

        <TabsContent value="about" className="mt-4 space-y-4">
          <AboutSection
            about={config.about}
            onChange={(about) => setConfig({ ...config, about })}
            onSave={() => saveSection("about", "About page", config.about)}
          />
        </TabsContent>

        <TabsContent value="programs" className="mt-4 space-y-4">
          <ProgramsSection
            programs={config.programs}
            meta={config.programsMeta}
            onProgramsChange={(programs) => setConfig({ ...config, programs })}
            onMetaChange={(programsMeta) => setConfig({ ...config, programsMeta })}
            onSave={() => {
              void websiteService.saveConfig(config).then((res) => {
                if (res.success) {
                  setConfig(res.data);
                  toast.success("Programs page saved — visible on public site");
                }
              });
            }}
          />
        </TabsContent>

        <TabsContent value="teachers" className="mt-4 space-y-4">
          <TeachersSection
            teachersCount={teachers.length}
            meta={config.teachersMeta}
            onChange={(teachersMeta) => setConfig({ ...config, teachersMeta })}
            onSave={() => saveSection("teachersMeta", "Teachers page", config.teachersMeta)}
          />
        </TabsContent>

        <TabsContent value="notices" className="mt-4 space-y-4">
          <NoticesSection
            publishedCount={publishedNotices}
            totalCount={notices.length}
            meta={config.noticesMeta}
            onChange={(noticesMeta) => setConfig({ ...config, noticesMeta })}
            onSave={() => saveSection("noticesMeta", "Notices page", config.noticesMeta)}
          />
        </TabsContent>

        <TabsContent value="events" className="mt-4 space-y-4">
          <EventsSection
            upcomingCount={upcomingEvents}
            totalCount={events.length}
            meta={config.eventsMeta}
            onChange={(eventsMeta) => setConfig({ ...config, eventsMeta })}
            onSave={() => saveSection("eventsMeta", "Events page", config.eventsMeta)}
          />
        </TabsContent>

        <TabsContent value="gallery" className="mt-4 space-y-4">
          <GallerySection
            albumTotal={galleryAlbums.length}
            meta={config.galleryMeta}
            onChange={(galleryMeta) => setConfig({ ...config, galleryMeta })}
            onSave={() => saveSection("galleryMeta", "Gallery page", config.galleryMeta)}
          />
        </TabsContent>

        <TabsContent value="contact" className="mt-4 space-y-4">
          <ContactSection
            contact={config.contact}
            onChange={(contact) => setConfig({ ...config, contact })}
            onSave={() => saveSection("contact", "Contact page", config.contact)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
