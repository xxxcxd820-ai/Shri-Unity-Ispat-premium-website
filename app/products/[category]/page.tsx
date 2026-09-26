import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug } from "@/data/categories";
import { productsByCategory, availabilityLabel } from "@/data/products";
import { brands } from "@/data/brands";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/catalogue/ProductCard";
import { CategoryCard } from "@/components/catalogue/CategoryCard";
import { ApplicationCards } from "@/components/product/ApplicationCards";
import { BrandList } from "@/components/product/BrandList";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { SectionHead } from "@/components/ui/SectionHead";
import { Img } from "@/components/ui/Img";
import { Parallax } from "@/components/ui/Parallax";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Availability } from "@/components/ui/Availability";
import { buildMetadata } from "@/lib/seo";
import { whatsappHref } from "@/lib/site";
import { productHref } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await props.params;
  const c = categoryBySlug(category);
  if (!c) return {};
  const names = productsByCategory(c.slug)
    .slice(0, 5)
    .map((p) => p.name)
    .join(", ");
  return buildMetadata({
    title: `${c.name} Supplier in Varanasi`,
    description: `${c.intro} Products include ${names}. Request a quote from Shri Unity Ispat, Varanasi.`,
    path: `/products/${c.slug}`,
    image: c.image,
  });
}

export default async function CategoryPage(props: PageProps<"/products/[category]">) {
  const { category } = await props.params;
  const c = categoryBySlug(category);
  if (!c) notFound();

  const list = productsByCategory(c.slug);
  const categoryBrands = brands.filter((b) => b.categories.includes(c.slug)).map((b) => b.slug);
  const idx = categories.findIndex((x) => x.slug === c.slug);
  const related = [categories[(idx + 1) % categories.length], categories[(idx + 2) % categories.length]];
  const counts = {
    available: list.filter((p) => p.availability !== "on-request").length,
    request: list.filter((p) => p.availability === "on-request").length,
  };

  return (
    <>
      <PageHero
        label={`${c.index} / ${c.name}`}
        title={c.name}
        subtitle={c.headline}
        image={c.image}
        tall
        crumbs={[
          { name: "Products", path: "/products" },
          { name: c.name, path: `/products/${c.slug}` },
        ]}
        aside={
          <dl className="grid grid-cols-3 border-t border-white/20 text-white lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pl-8">
            <div className="py-4 lg:py-3">
              <dt className="label text-white/55">Products</dt>
              <dd className="mt-1 font-display text-4xl">{String(list.length).padStart(2, "0")}</dd>
            </div>
            <div className="py-4 lg:py-3">
              <dt className="label text-white/55">Regular range</dt>
              <dd className="mt-1 font-display text-4xl">{String(counts.available).padStart(2, "0")}</dd>
            </div>
            <div className="py-4 lg:py-3">
              <dt className="label text-white/55">On request</dt>
              <dd className="mt-1 font-display text-4xl">{String(counts.request).padStart(2, "0")}</dd>
            </div>
          </dl>
        }
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={`/quote?category=${c.slug}`} variant="light" magnetic>
            Request a Quote
          </LinkButton>
          <LinkButton href={whatsappHref(`Hello Shri Unity Ispat, I would like to enquire about ${c.name}.`)} variant="outline-light">
            WhatsApp
          </LinkButton>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-gold">Overview</p>
            <p className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.1] text-navy">{c.intro}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label text-steel-dark">Product families</p>
            <ul className="mt-6 border-t border-line">
              {list.map((p, i) => (
                <li key={p.slug} className="border-b border-line">
                  <Link href={productHref(c.slug, p.slug)} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-4">
                    <span className="font-mono text-[0.7rem] text-steel">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[1.02rem] font-medium text-navy transition-transform duration-500 group-hover:translate-x-1">{p.name}</span>
                    <Availability value={p.availability} className="hidden sm:inline-flex" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section aria-labelledby="range-title" className="bg-ivory py-20 md:py-28">
        <div className="container-x">
          <SectionHead
            index={c.index}
            label="The range"
            title={<span id="range-title">Specifications by product.</span>}
            intro={`Every item below opens into a detailed specification page. Items marked “${availabilityLabel["on-request"]}” are procured against enquiry.`}
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={(i % 4) * 0.05} className="h-full">
                  <ProductCard product={p} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Standards table */}
      <section aria-labelledby="standards-title" className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead label="At a glance" title={<span id="standards-title">Grades &amp; standards.</span>} />
          <div className="mt-12 overflow-x-auto border border-line">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-ivory">
                <tr>
                  {["Product", "Grades / classes", "Standard", "Availability"].map((h) => (
                    <th key={h} scope="col" className="label px-5 py-4 font-normal text-steel-dark">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.slug} className="border-t border-line hover:bg-ivory/60">
                    <th scope="row" className="px-5 py-4 font-medium text-navy">
                      <Link href={productHref(c.slug, p.slug)} className="link-underline">
                        {p.name}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-graphite">{p.grades.join(", ") || "—"}</td>
                    <td className="px-5 py-4 text-graphite">{p.standards.join(", ") || "—"}</td>
                    <td className="px-5 py-4">
                      <Availability value={p.availability} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Image band */}
      {c.detailImage && (
        <section aria-hidden="true" className="relative h-[60svh] overflow-hidden bg-navy">
          <Parallax amount={20}>
            <Img k={c.detailImage} fill sizes="100vw" className="object-cover" />
          </Parallax>
          <div className="absolute inset-0 bg-navy/30" />
          <div className="container-x relative flex h-full items-end pb-10">
            <p className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-none text-white uppercase">{c.headline}</p>
          </div>
        </section>
      )}

      {/* Applications */}
      <section aria-labelledby="apps-title" className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <SectionHead label="Applications" title={<span id="apps-title">Where it goes to work.</span>} />
          <div className="mt-12">
            <ApplicationCards applications={c.applications} fallback={c.image} />
          </div>
        </div>
      </section>

      {/* Brands */}
      {categoryBrands.length > 0 && (
        <section aria-labelledby="cat-brands-title" className="bg-paper pb-20 md:pb-28">
          <div className="container-x">
            <SectionHead
              label="Brands we deal in"
              title={<span id="cat-brands-title">Available brands.</span>}
              intro="Subject to availability at the time of order. Tell us your preferred brand when requesting a quote."
            />
            <div className="mt-12">
              <BrandList slugs={categoryBrands} />
            </div>
          </div>
        </section>
      )}

      {/* Related categories */}
      <section aria-labelledby="related-cat-title" className="bg-ivory py-20 md:py-28">
        <div className="container-x">
          <SectionHead label="Continue exploring" title={<span id="related-cat-title">Related families.</span>} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <CategoryCard key={r.slug} category={r} size="md" count={productsByCategory(r.slug).length} className="md:aspect-[16/11]" />
            ))}
          </div>
        </div>
      </section>

      <QuoteSection index={c.index} defaultCategory={c.slug} />
    </>
  );
}
