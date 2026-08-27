import Link from "next/link";
import { PageTitle } from "@/components/islamus/layout/page-title";
import { ThemeBtn } from "@/components/islamus/ui/theme-btn";

export default function NotFound() {
  return (
    <>
      <PageTitle title="404" breadcrumb={[{ label: "Home", href: "/" }, { label: "404" }]} />
      <section className="is-pt-120 is-pb-120 text-center">
        <div className="is-container">
          <h2 className="is-title text-6xl mb-4">404</h2>
          <p className="text-[var(--text-color)] mb-8">
            Oops! The page you are looking for does not exist.
          </p>
          <ThemeBtn href="/" variant="one" showArrow>
            Back to Home
          </ThemeBtn>
        </div>
      </section>
    </>
  );
}
