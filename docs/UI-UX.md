# Public Site UI/UX Guide

Documentation for the MadrasaMS marketing site under `app/(public)/`.

---

## Overview

| Item | Detail |
|------|--------|
| **Stack** | Next.js 16, React 19, Tailwind CSS v4, shadcn/ui, **Sass/SCSS** |
| **Scope** | Public marketing pages (`app/(public)/`) |
| **Content** | Madrasa management SaaS (hero, features, dashboard preview, programs, etc.) |
| **Languages** | English (`en`) and Bangla (`bn`) via `useT()` |
| **Dashboard** | Untouched — `app/(dashboard)/` keeps Madrasa SaaS UI |

---

## Navigation

Primary navbar (from [`config/navigation.ts`](../config/navigation.ts)):

| Link | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Programs | `/programs` |
| Teachers | `/teachers` |
| Notices | `/notices` |
| Events | `/events` |
| Gallery | `/gallery` |
| Contact | `/contact` |
| Login | `/login` |

**Unlinked legacy Islamus routes** (still reachable by URL, not in navbar): `/causes`, `/shop`, `/news`, `/team`, `/faq`, `/testimonials`, `/services/[slug]`.

---

## Architecture

```
styles/marketing/          ← SCSS partials (header, footer, hero, sections)
components/marketing/      ← SaaS marketing components
app/(public)/layout.tsx    ← SiteHeader + SiteFooter + SCSS import
app/theme.css              ← shadcn + MadrasaMS brand tokens
components/islamus/        ← Legacy Islamus theme (unlinked routes only)
```

---

## Homepage sections (order)

1. Hero — SaaS headline + dashboard preview
2. StatsBand — students, teachers, institutions, uptime
3. FeatureGrid — 6 platform features
4. HowItWorks — 4-step onboarding
5. MadrasaFeatures — Hifz, curriculum, waqf, bilingual, RBAC
6. BenefitsSection — guardians vs teachers
7. HomeMarquee — scrolling feature band
8. Testimonials — community quotes
9. FaqSection — accordion FAQ
10. CtaBand — Get Started + Contact

---

## Marketing layout styles

Marketing layout uses **Tailwind CSS** directly in [`components/marketing/`](../components/marketing/). Shared container/section utilities live in [`components/marketing/layout.ts`](../components/marketing/layout.ts).

Brand tokens are defined in [`app/theme.css`](../app/theme.css) (`primary`, `deep`, `lime`, `sand`, etc.) and mapped in [`app/globals.css`](../app/globals.css).

---

## Theming

Edit [`app/theme.css`](../app/theme.css) for brand colors:

| Token | Purpose |
|-------|---------|
| `--brand-green` | Primary green |
| `--brand-deep` | Dark backgrounds |
| `--brand-lime` | Accent highlight |
| `--brand-sand` | Section backgrounds |

---

## i18n

Navigation and content strings use `useT()` with keys under `nav.*`, `hero.*`, `features.*`, `programs.*`, etc. in [`messages/en.ts`](../messages/en.ts) and [`messages/bn.ts`](../messages/bn.ts).

---

## Legacy Islamus pages

Unlinked routes wrap content in [`IslamusPageWrapper`](../components/islamus/islamus-page-wrapper.tsx) which loads `islamus.css`, GSAP animations, and (for shop) cart provider. They render under the marketing header/footer.
