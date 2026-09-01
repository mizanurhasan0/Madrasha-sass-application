import { MarketingPageHeader } from "@/components/marketing/marketing-page-header";
import { Section } from "@/components/marketing/section";
import { cn } from "@/lib/utils";

type PublicServiceLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  maxWidth?: "md" | "lg" | "xl";
};

const widthClass = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

export function PublicServiceLayout({
  eyebrow,
  title,
  description,
  children,
  maxWidth = "lg",
}: PublicServiceLayoutProps) {
  return (
    <>
      <MarketingPageHeader eyebrow={eyebrow} title={title} description={description} />
      <Section>
        <div className={cn("mx-auto space-y-6", widthClass[maxWidth])}>{children}</div>
      </Section>
    </>
  );
}
