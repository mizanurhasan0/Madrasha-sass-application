import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BookOpenCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sign In",
};

function LoginFormFallback() {
  return (
    <div className="mx-auto w-full max-w-md animate-pulse space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
      </div>
      <div className="space-y-4">
        <div className="h-10 rounded-lg bg-muted" />
        <div className="h-10 rounded-lg bg-muted" />
        <div className="h-10 rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Branding panel — full width on mobile header, half screen on desktop */}
      <div className="islamic-pattern relative flex flex-col justify-between overflow-hidden bg-primary px-6 py-8 text-primary-foreground lg:w-1/2 lg:px-12 lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.72_0.12_85/0.15),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-primary-foreground/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 size-56 rotate-45 border border-primary-foreground/10"
        />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/10 ring-1 ring-primary-foreground/20">
              <BookOpenCheck className="size-5 text-gold" />
            </span>
            <span className="font-heading text-lg font-semibold">{siteConfig.shortName}</span>
          </Link>
        </div>

        <div className="relative z-10 my-10 space-y-6 lg:my-0 lg:max-w-md">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">
              {siteConfig.madrasaName}
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight lg:text-4xl">
              {siteConfig.tagline}
            </h2>
            <p className="text-base leading-relaxed text-primary-foreground/80">
              {siteConfig.description}
            </p>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="h-px flex-1 bg-primary-foreground/20" />
            <span className="text-xs uppercase tracking-widest text-primary-foreground/50">
              Trusted platform
            </span>
            <div className="h-px flex-1 bg-primary-foreground/20" />
          </div>
        </div>

        <p className="relative z-10 hidden text-xs text-primary-foreground/60 lg:block">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col justify-center bg-background px-6 py-10 lg:px-16 lg:py-12">
        <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <BookOpenCheck className="size-4 text-primary" />
          </span>
          <span className="font-heading text-lg font-semibold">{siteConfig.shortName}</span>
        </div>

        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>

        <p className="mx-auto mt-10 max-w-md text-center text-xs text-muted-foreground lg:text-left">
          Need help? Contact{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium text-primary hover:underline"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </div>
  );
}
