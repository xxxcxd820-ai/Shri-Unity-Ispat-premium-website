import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { brands } from "@/data/brands";
import { categories, categoryBySlug, type Category } from "@/data/categories";
import { PageHero } from "@/components/sections/PageHero";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Brands We Deal In — Tata Tiscon, SAIL, JSW, APL Apollo & More",
  description:
    "Leading steel brands available through Shri Unity Ispat, Varanasi: Tata Tiscon, Tata Structura, SAIL, JSW, Shyam Steel, APL Apollo, Kamdhenu, SRMB Real Edge and SUL — TMT, pipes, structurals, coils and roofing.",
  path: "/brands",
  image: "coilsWarehouse",
});

const process = [
  { n: "01", title: "Name your brand", text: "Tell us the brand your drawings, consultant or client specifies — or ask us to compare." },
  { n: "02", title: "We check availability", text: "We confirm the brand across the sizes and grades you need, and suggest alternatives if short." },
  { n: "03", title: "One consolidated quote", text: "Mixed brands and product families, priced together and dispatched as one supply." },
];

export default function BrandsPage() {
  const rows = brands.map((b) => ({
    brand: b,
    cats: b.categories.map(categoryBySlug).filter((c): c is Category => Boolean(c)),
  }));
  const covered = categories.filter((c) => brands.some((b) => b.categories.includes(c.slug)));

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
        subtitle="Specify the brand your project calls for — Shri Unity Ispat sources across India's established steel makers from its Varanasi base."
        image="coilsWarehouse"
        tall
        crumbs={[{ name: "Brands", path: "/brands" }]}
        aside={
          <dl className="grid grid-cols-2 border-t border-white/20 text-white lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pl-8">
            <div className="py-4 lg:py-3">
              <dt className="label text-white/55">Brands</dt>
              <dd className="mt-1 font-display text-5xl">{String(brands.length).padStart(2, "0")}</dd>
            </div>
            <div className="py-4 lg:py-3">
              <dt className="label text-white/55">Families covered</dt>
              <dd className="mt-1 font-display text-5xl">{String(covered.length).padStart(2, "0")}</dd>
            </div>
          </dl>
        }
      >
        <LinkButton href="#directory" variant="light" magnetic>
          Browse the brands
        </LinkButton>
      </PageHero>

      <section aria-label="Brand marquee" className="border-b border-white/10 bg-navy">
        <BrandMarquee tone="dark" />
      </section>

      {/* Statement + process */}
      <section aria-labelledby="specify-title" className="bg-paper py-20 md:py-32">
        <div className="container-x">
          <SectionHead
            label="Brand sourcing"
            title={<span id="specify-title">Specify the brand. We&rsquo;ll source it.</span>}
            intro="Consultants and clients often name a mill or brand. We make that simple — and tell you straight when an alternative will serve better."
          />
          <ol className="mt-14 grid gap-px bg-line md:grid-cols-3">
            {process.map((p, i) => (
              <li key={p.n} className="bg-paper">
                <Reveal delay={i * 0.08} className="group h-full p-7 transition-colors duration-500 hover:bg-navy sm:p-10">
                  <p className="font-display text-6xl text-steel/40 transition-colors duration-500 group-hover:text-gold-soft">{p.n}</p>
                  <h3 className="mt-8 font-display text-3xl text-navy uppercase transition-colors duration-500 group-hover:text-white">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-graphite/75 transition-colors duration-500 group-hover:text-white/70">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Directory */}
      <section id="directory" aria-labelledby="directory-title" className="scroll-mt-20 bg-ivory py-20 md:py-32">
        <div className="container-x">
          <SectionHead
            label="Brand directory"
            title={<span id="directory-title">The brands &amp; their lines.</span>}
            intro="Availability of a given brand depends on product, size and timing. Mention your preference when requesting a quote."
          />
          <div className="mt-14 md:mt-20">
            <BrandShowcase rows={rows} />
          </div>
        </div>
      </section>

      {/* Matrix */}
      <section aria-labelledby="matrix-title" className="bg-paper py-20 md:py-32">
        <div className="container-x">
          <SectionHead
            label="At a glance"
            title={<span id="matrix-title">Brand × product family.</span>}
            intro="Which brands we deal in for each product family. Scroll sideways on smaller screens."
          />
          <div className="mt-12 overflow-x-auto border border-line">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <caption className="sr-only">Brands we deal in by product family</caption>
              <thead>
                <tr className="bg-navy text-white">
                  <th scope="col" className="label sticky left-0 z-10 bg-navy px-5 py-4 font-normal">
                    Brand
                  </th>
                  {covered.map((c) => (
                    <th key={c.slug} scope="col" className="label px-3 py-4 text-center font-normal whitespace-nowrap">
                      <Link href={`/products/${c.slug}`} className="hover:text-gold-soft">
                        {c.short}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => (
                  <tr key={b.slug} className="border-t border-line transition-colors hover:bg-ivory">
                    <th scope="row" className="sticky left-0 z-10 bg-paper px-5 py-4 font-display text-lg font-semibold whitespace-nowrap text-navy uppercase">
                      {b.name}
                    </th>
                    {covered.map((c) => (
                      <td key={c.slug} className="px-3 py-4 text-center">
                        {b.categories.includes(c.slug) ? (
                          <span className="inline-flex size-7 items-center justify-center bg-navy text-gold-soft">
                            <Check className="size-3.5" aria-label="Yes" />
                          </span>
                        ) : (
                          <span className="text-line-strong" aria-label="No">
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-steel-dark">
            Brand names and trademarks belong to their respective owners and are used here only to identify the
            products we deal in. Their use does not imply an authorised dealership or distributorship.
          </p>
        </div>
      </section>

      <QuoteSection index="—" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Brands available at ${site.name}`,
          itemListElement: brands.map((b, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Brand", name: b.name } })),
        }}
      />
    </>
  );
}
