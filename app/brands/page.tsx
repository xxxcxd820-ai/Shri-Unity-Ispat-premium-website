import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/data/brands";
import { categoryBySlug } from "@/data/categories";
import { PageHero } from "@/components/sections/PageHero";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Brands We Deal In — Tata Tiscon, SAIL, JSW, APL Apollo & More",
  description:
    "Leading steel brands available through Shri Unity Ispat, Varanasi: Tata Tiscon, Tata Structura, SAIL, JSW, Shyam Steel, APL Apollo, Kamdhenu, SRMB Real Edge and SUL.",
  path: "/brands",
  image: "tmtBarsStack",
});

export default function BrandsPage() {
  return (
    <>
      <PageHero
        label="Brands we deal in"
        title={
          <>
            Leading brands.
            <br />
            One address.
          </>
        }
        subtitle="Specify the brand your project calls for — we source across India's established steel makers."
        image="coilsWarehouse"
        crumbs={[{ name: "Brands", path: "/brands" }]}
      />

      <section className="border-b border-line bg-paper">
        <BrandMarquee />
      </section>

      <section aria-labelledby="brand-grid-title" className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            label="Brand directory"
            title={<span id="brand-grid-title">Brands &amp; product lines.</span>}
            intro="Availability of a given brand depends on product, size and timing. Mention your preference when requesting a quote."
          />
          <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((b, i) => (
              <li key={b.slug} className="border-r border-b border-line">
                <Reveal delay={(i % 3) * 0.05} className="flex h-full min-h-64 flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-[2.2rem] leading-none font-semibold text-navy uppercase">{b.name}</span>
                    <span className="label text-steel">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <p className="mt-8 text-sm text-graphite/80">{b.lines}</p>
                    {b.categories.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {b.categories.map((cs) => {
                          const c = categoryBySlug(cs);
                          return c ? (
                            <li key={cs}>
                              <Link href={`/products/${cs}`} className="inline-block border border-line px-2.5 py-1 text-xs text-navy hover:border-navy">
                                {c.short}
                              </Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-steel-dark">
            Brand names and trademarks belong to their respective owners and are used here only to identify the
            products we deal in. Their use does not imply an authorised dealership or distributorship.
          </p>
        </div>
      </section>

      <QuoteSection index="—" />
    </>
  );
}
