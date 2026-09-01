export type WebsiteGeneral = {
  madrasaName: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  showPublicSite: boolean;
};

export type WebsiteHomepage = {
  heroTitle: string;
  heroSubtitle: string;
  badgeText: string;
  primaryCta: string;
  secondaryCta: string;
  showStats: boolean;
  showTestimonials: boolean;
  admissionOpen: boolean;
  admissionBannerText: string;
};

export type WebsiteAbout = {
  pageTitle: string;
  intro: string;
  mission: string;
  vision: string;
  values: string;
};

export type WebsiteProgram = {
  title: string;
  duration: string;
  description: string;
};

export type WebsiteProgramsMeta = {
  pageTitle: string;
  pageSubtitle: string;
  ctaTitle: string;
  ctaDescription: string;
};

export type WebsiteTeachersMeta = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  featuredCount: number;
};

export type WebsiteNoticesMeta = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  maxVisible: number;
};

export type WebsiteEventsMeta = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  maxVisible: number;
};

export type WebsiteGalleryMeta = {
  pageTitle: string;
  pageSubtitle: string;
  showOnWebsite: boolean;
  albumCount: number;
};

export type WebsiteContact = {
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

export type WebsiteConfig = {
  general: WebsiteGeneral;
  homepage: WebsiteHomepage;
  about: WebsiteAbout;
  programs: WebsiteProgram[];
  programsMeta: WebsiteProgramsMeta;
  teachersMeta: WebsiteTeachersMeta;
  noticesMeta: WebsiteNoticesMeta;
  eventsMeta: WebsiteEventsMeta;
  galleryMeta: WebsiteGalleryMeta;
  contact: WebsiteContact;
};
