import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/images";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/ui/Parallax";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { name: string; path: string };

/** Cinematic dark hero for inner pages, with breadcrumbs and structured data. */
export function PageHero({
  label,
  title,
  subtitle,
  image,
  crumbs,
  children,
  aside,
  tall = false,
}: {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: ImageKey;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  tall?: boolean;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section
      data-hero="dark"
      className={`grain relative isolate flex flex-col overflow-hidden bg-navy text-white ${tall ? "min-h-[92svh]" : "min-h-[74svh]"}`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax amount={16}>
          <Img k={image} fill priority sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-transparent" />
      </div>

      <div className="container-x flex flex-1 flex-col pt-[calc(var(--header-h)+2rem)] pb-12 md:pb-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-white/60">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i < all.length - 1 ? (
                  <Link href={c.path} className="label hover:text-white">
                    {c.name}
                  </Link>
                ) : (
                  <span className="label text-white/90" aria-current="page">
                    {c.name}
                  </span>
                )}
                {i < all.length - 1 && <span aria-hidden="true" className="text-white/30">/</span>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-5 h-px bg-white/20" aria-hidden="true" />

        <div className="mt-auto grid gap-10 pt-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-3 text-gold-soft">
              <span className="h-px w-8 bg-gold-soft" aria-hidden="true" />
              {label}
            </p>
            <SplitHeading as="h1" immediate className="font-display text-[length:var(--text-display)] leading-[0.92] uppercase">
              {title}
            </SplitHeading>
            {subtitle && (
              <Reveal delay={0.3}>
                <p className="mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-white/80">{subtitle}</p>
              </Reveal>
            )}
            {children && <Reveal delay={0.4} className="mt-9">{children}</Reveal>}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </div>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </section>
  );
}
