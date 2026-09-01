import type { WebsiteConfig } from "@/types/website";
import { siteConfig } from "@/config/site";

type JsonLdProps = {
  config: WebsiteConfig;
};

export function OrganizationJsonLd({ config }: JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: config.general.madrasaName,
    description: config.general.description,
    url: config.general.websiteUrl,
    telephone: config.contact.phone,
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.contact.address,
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd({ config }: JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.general.madrasaName,
    url: config.general.websiteUrl,
    description: config.general.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.shortName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function EventJsonLd({
  title,
  description,
  startDate,
  location,
  image,
  url,
}: {
  title: string;
  description: string;
  startDate: string;
  location: string;
  image?: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: title,
    description,
    startDate,
    location: {
      "@type": "Place",
      name: location,
    },
    image,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
