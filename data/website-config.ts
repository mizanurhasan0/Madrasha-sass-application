import { siteConfig } from "@/config/site";
import { galleryAlbums } from "@/data/gallery";
import { notices, events } from "@/data/notices";
import { teachers } from "@/data/teachers";
import type { WebsiteConfig, WebsiteProgram } from "@/types/website";

const defaultPrograms: WebsiteProgram[] = [
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

const publishedNotices = notices.filter((n) => n.published).length;
const upcomingEvents = events.filter((e) => e.status === "upcoming").length;

export const defaultWebsiteConfig: WebsiteConfig = {
  general: {
    madrasaName: siteConfig.madrasaName,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    websiteUrl: siteConfig.url,
    showPublicSite: true,
  },
  homepage: {
    heroTitle: "Nurturing Faith, Knowledge & Character",
    heroSubtitle:
      "Al-Noor Islamic Academy offers Hifz, Nazera, and general education with qualified Ulama and a caring learning environment in Dhaka.",
    badgeText: siteConfig.tagline,
    primaryCta: "Apply for Admission",
    secondaryCta: "Contact Us",
    showStats: true,
    showTestimonials: true,
    admissionOpen: true,
    admissionBannerText: "Admission open for 2025–2026 session — apply online today.",
  },
  about: {
    pageTitle: siteConfig.madrasaName,
    intro:
      "Established with a vision to combine traditional Islamic education with modern teaching methods, Al-Noor Islamic Academy has been serving the community in Dhaka for over a decade.",
    mission:
      "To provide quality Islamic and general education that nurtures faith, character, and academic excellence in every student.",
    vision:
      "To be a leading madrasa in Bangladesh, producing Hafiz, scholars, and well-rounded citizens who serve the Ummah.",
    values:
      "Taqwa, knowledge, compassion, and community. We believe education is a trust (amanah) that shapes hearts and minds.",
  },
  programs: defaultPrograms,
  programsMeta: {
    pageTitle: "Programs & Curriculum",
    pageSubtitle:
      "From Hifz to general education, our programs are designed to build strong Islamic foundations and academic excellence.",
    ctaTitle: "Ready to enroll?",
    ctaDescription: "Admission for the 2025–2026 session is now open. Apply before August 31.",
  },
  teachersMeta: {
    pageTitle: "Our Teachers",
    pageSubtitle: "Qualified Ulama and experienced educators dedicated to nurturing every student.",
    showOnWebsite: true,
    featuredCount: Math.min(6, teachers.length),
  },
  noticesMeta: {
    pageTitle: "Notices & Announcements",
    pageSubtitle: "Stay updated with the latest news, holidays, and academic notices.",
    showOnWebsite: true,
    maxVisible: publishedNotices,
  },
  eventsMeta: {
    pageTitle: "Events & Activities",
    pageSubtitle: "Upcoming programs, competitions, and community gatherings at our madrasa.",
    showOnWebsite: true,
    maxVisible: upcomingEvents,
  },
  galleryMeta: {
    pageTitle: "Photo Gallery",
    pageSubtitle: "Moments from campus life, events, and academic milestones.",
    showOnWebsite: true,
    albumCount: galleryAlbums.length,
  },
  contact: {
    pageTitle: "Contact Us",
    pageSubtitle: "Have questions about admission, programs, or fees? We would love to hear from you.",
    address: siteConfig.contact.address,
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    officeHours: siteConfig.contact.officeHours,
    facebook: siteConfig.social.facebook,
    youtube: siteConfig.social.youtube,
    whatsapp: "8801712345678",
    showMap: true,
  },
};
