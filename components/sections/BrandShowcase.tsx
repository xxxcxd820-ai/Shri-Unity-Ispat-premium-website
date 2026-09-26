"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Brand } from "@/data/brands";
import type { Category } from "@/data/categories";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Row = { brand: Brand; cats: Category[] };

/**
 * Editorial brand directory: a sticky index on desktop tracks the brand in view,
 * each brand gets a large wordmark, its product lines and imagery.
 */
export function BrandShowcase({ rows }: { rows: Row[] }) {
  const [active, setActive] = useState(rows[0]?.brand.slug);

  useEffect(() => {
    const els = rows.map((r) => document.getElementById(`brand-${r.brand.slug}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("brand-", ""));
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rows]);

  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_1fr] xl:grid-cols-[17rem_1fr]">
      <nav aria-label="Brands" className="hidden lg:block">
        <ol className="sticky top-[calc(var(--header-h)+2rem)] border-t border-line">
          {rows.map(({ brand }, i) => (
            <li key={brand.slug} className="border-b border-line">
              <a
                href={`#brand-${brand.slug}`}
                className={cn(
                  "group flex items-center gap-4 py-3.5 transition-colors",
                  active === brand.slug ? "text-navy" : "text-steel hover:text-navy",
                )}
              >
                <span className="font-mono text-[0.68rem]">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[0.8rem] font-semibold tracking-[0.12em] uppercase">{brand.name}</span>
                <span className={cn("h-px bg-gold transition-all duration-500", active === brand.slug ? "w-6" : "w-0")} />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div>
        {rows.map(({ brand, cats }, i) => {
          const hero = cats[0]?.image ?? "coilsWarehouse";
          const second = cats[1]?.image;
          return (
            <article
              key={brand.slug}
              id={`brand-${brand.slug}`}
              aria-labelledby={`brand-title-${brand.slug}`}
              className="scroll-mt-28 border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20"
            >
              <div className="grid gap-10 xl:grid-cols-12">
                <div className="xl:col-span-6">
                  <p className="label text-gold">
                    {String(i + 1).padStart(2, "0")} / {String(rows.length).padStart(2, "0")}
                  </p>
                  <Reveal>
                    <h3
                      id={`brand-title-${brand.slug}`}
                      className="mt-5 font-display text-[clamp(3rem,7vw,6.2rem)] leading-[0.88] font-semibold text-navy uppercase"
                    >
                      {brand.name}
                    </h3>
                  </Reveal>
                  <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-graphite/80">
                    {brand.lines}
                    {cats.length > 0 ? " — available through Shri Unity Ispat, subject to size and stock." : " — product lines available on request."}
                  </p>

                  {cats.length > 0 && (
                    <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                      {cats.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/products/${c.slug}`}
                            className="group flex items-center gap-3 border border-line bg-paper p-2 pr-4 transition-colors hover:border-navy"
                          >
                            <span className="relative size-12 shrink-0 overflow-hidden bg-bone">
                              <Img k={c.image} fill sizes="48px" quality={60} className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            </span>
                            <span className="flex-1 text-sm font-medium text-navy">{c.name}</span>
                            <Arrow className="text-steel group-hover:text-navy" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/quote?note=${encodeURIComponent(`Brand preference: ${brand.name}`)}`}
                      className="group inline-flex h-12 items-center gap-3 bg-navy px-6 text-[0.7rem] font-semibold tracking-[0.2em] text-paper uppercase transition-colors hover:bg-gold"
                    >
                      Enquire for {brand.name} <Arrow />
                    </Link>
                    <a
                      href={whatsappHref(`Hello Shri Unity Ispat, I would like to enquire about ${brand.name} products.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-12 items-center gap-3 border border-line px-6 text-[0.7rem] font-semibold tracking-[0.2em] text-navy uppercase transition-colors hover:border-navy"
                    >
                      WhatsApp <Arrow direction="up-right" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3 xl:col-span-6">
                  <MaskReveal className={cn("relative aspect-[4/5] overflow-hidden bg-bone", second ? "col-span-3" : "col-span-5 aspect-[16/10]")}>
                    <Img k={hero} fill sizes="(min-width:1280px) 25vw, 60vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
                    <span className="label absolute bottom-3 left-3 bg-navy/80 px-2.5 py-1.5 text-white backdrop-blur">{cats[0]?.short ?? "Steel"}</span>
                  </MaskReveal>
                  {second && (
                    <div className="col-span-2 flex flex-col gap-3">
                      <MaskReveal delay={0.15} className="relative flex-1 overflow-hidden bg-bone">
                        <Img k={second} fill sizes="(min-width:1280px) 16vw, 40vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
                        <span className="label absolute bottom-3 left-3 bg-navy/80 px-2.5 py-1.5 text-white backdrop-blur">{cats[1]?.short}</span>
                      </MaskReveal>
                      <div className="flex aspect-square flex-col justify-between bg-navy p-4 text-white">
                        <span className="label text-gold-soft">Lines</span>
                        <span className="font-display text-5xl leading-none">{String(cats.length).padStart(2, "0")}</span>
                        <span className="text-xs text-white/60">product families</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
