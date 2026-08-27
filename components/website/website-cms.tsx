"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { madrasas } from "@/data/madrasas";
import { MADRASA_ID } from "@/data/users";
import { notices, events } from "@/data/notices";
import { galleryAlbums } from "@/data/gallery";
import { teachers } from "@/data/teachers";
import { GeneralSection } from "@/components/website/sections/general-section";
import { HomepageSection } from "@/components/website/sections/homepage-section";
import { AboutSection } from "@/components/website/sections/about-section";
import {
  ProgramsSection,
  defaultPrograms,
} from "@/components/website/sections/programs-section";
import { TeachersSection } from "@/components/website/sections/teachers-section";
import { NoticesSection } from "@/components/website/sections/notices-section";
import { EventsSection } from "@/components/website/sections/events-section";
import { GallerySection } from "@/components/website/sections/gallery-section";
import { ContactSection } from "@/components/website/sections/contact-section";

const madrasa = madrasas.find((m) => m.id === MADRASA_ID)!;

export function WebsiteCms() {
  const publishedNotices = notices.filter((n) => n.published).length;
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length;

  const [general, setGeneral] = useState({
    madrasaName: siteConfig.madrasaName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    websiteUrl: siteConfig.url,
    showPublicSite: true,
  });

  const [homepage, setHomepage] = useState({
    heroTitle: "Modern management for Islamic education",
    heroSubtitle: siteConfig.description,
    badgeText: siteConfig.tagline,
    primaryCta: "Get Started",
    secondaryCta: "Book a Demo",
    showStats: true,
    showTestimonials: true,
  });

  const [about, setAbout] = useState({
    pageTitle: siteConfig.madrasaName,
    intro:
      "Established with a vision to combine traditional Islamic education with modern teaching methods, Al-Noor Islamic Academy has been serving the community in Dhaka for over a decade.",
    mission:
      "To provide quality Islamic and general education that nurtures faith, character, and academic excellence in every student.",
    vision:
      "To be a leading madrasa in Bangladesh, producing Hafiz, scholars, and well-rounded citizens who serve the Ummah.",
    values:
      "Taqwa, knowledge, compassion, and community. We believe education is a trust (amanah) that shapes hearts and minds.",
  });

  const [programsState, setProgramsState] = useState(defaultPrograms);
  const [programsMeta, setProgramsMeta] = useState({
    pageTitle: "Programs & Curriculum",
    pageSubtitle:
      "From Hifz to general education, our programs are designed to build strong Islamic foundations and academic excellence.",
    ctaTitle: "Ready to enroll?",
    ctaDescription: "Admission for the 2025–2026 session is now open. Apply before August 31.",
  });

  const [teachersMeta, setTeachersMeta] = useState({
    pageTitle: "Our Teachers",
    pageSubtitle: "Qualified Ulama and experienced educators dedicated to nurturing every student.",
    showOnWebsite: true,
    featuredCount: Math.min(6, teachers.length),
  });

  const [noticesMeta, setNoticesMeta] = useState({
    pageTitle: "Notices & Announcements",
    pageSubtitle: "Stay updated with the latest news, holidays, and academic notices.",
    showOnWebsite: true,
    maxVisible: publishedNotices,
  });

  const [eventsMeta, setEventsMeta] = useState({
    pageTitle: "Events & Activities",
    pageSubtitle: "Upcoming programs, competitions, and community gatherings at our madrasa.",
    showOnWebsite: true,
    maxVisible: upcomingEvents,
  });

  const [galleryMeta, setGalleryMeta] = useState({
    pageTitle: "Photo Gallery",
    pageSubtitle: "Moments from campus life, events, and academic milestones.",
    showOnWebsite: true,
    albumCount: galleryAlbums.length,
  });

  const [contact, setContact] = useState({
    pageTitle: "Contact Us",
    pageSubtitle: "Have questions about admission, programs, or our platform? We'd love to hear from you.",
    address: siteConfig.contact.address,
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    officeHours: siteConfig.contact.officeHours,
    facebook: siteConfig.social.facebook,
    youtube: siteConfig.social.youtube,
    whatsapp: siteConfig.social.whatsapp,
    showMap: true,
  });

  const handleSave = (section: string) => {
    toast.success(`${section} draft saved locally`);
  };

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
            general={general}
            onChange={setGeneral}
            onSave={() => handleSave("General settings")}
          />
        </TabsContent>

        <TabsContent value="homepage" className="mt-4 space-y-4">
          <HomepageSection
            homepage={homepage}
            onChange={setHomepage}
            onSave={() => handleSave("Homepage")}
          />
        </TabsContent>

        <TabsContent value="about" className="mt-4 space-y-4">
          <AboutSection
            about={about}
            onChange={setAbout}
            onSave={() => handleSave("About page")}
          />
        </TabsContent>

        <TabsContent value="programs" className="mt-4 space-y-4">
          <ProgramsSection
            programs={programsState}
            meta={programsMeta}
            onProgramsChange={setProgramsState}
            onMetaChange={setProgramsMeta}
            onSave={() => handleSave("Programs page")}
          />
        </TabsContent>

        <TabsContent value="teachers" className="mt-4 space-y-4">
          <TeachersSection
            teachersCount={teachers.length}
            meta={teachersMeta}
            onChange={setTeachersMeta}
            onSave={() => handleSave("Teachers page")}
          />
        </TabsContent>

        <TabsContent value="notices" className="mt-4 space-y-4">
          <NoticesSection
            publishedCount={publishedNotices}
            totalCount={notices.length}
            meta={noticesMeta}
            onChange={setNoticesMeta}
            onSave={() => handleSave("Notices page")}
          />
        </TabsContent>

        <TabsContent value="events" className="mt-4 space-y-4">
          <EventsSection
            upcomingCount={upcomingEvents}
            totalCount={events.length}
            meta={eventsMeta}
            onChange={setEventsMeta}
            onSave={() => handleSave("Events page")}
          />
        </TabsContent>

        <TabsContent value="gallery" className="mt-4 space-y-4">
          <GallerySection
            albumTotal={galleryAlbums.length}
            meta={galleryMeta}
            onChange={setGalleryMeta}
            onSave={() => handleSave("Gallery page")}
          />
        </TabsContent>

        <TabsContent value="contact" className="mt-4 space-y-4">
          <ContactSection
            contact={contact}
            onChange={setContact}
            onSave={() => handleSave("Contact page")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
