import Image from "next/image";
import Link from "next/link";

interface PageTitleProps {
  title: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageTitle({ title, breadcrumb }: PageTitleProps) {
  return (
    <section className="is-page-title">
      <div className="is-page-title-bg">
        <Image src="/theme/bg/page-title.jpg" alt="" fill className="object-cover" priority />
      </div>
      <div className="is-container relative z-[2]">
        <h1>{title}</h1>
        {breadcrumb && (
          <nav className="mt-4 flex justify-center gap-2 text-sm text-white/70">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-[var(--theme-color1)]">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[var(--theme-color1)]">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
