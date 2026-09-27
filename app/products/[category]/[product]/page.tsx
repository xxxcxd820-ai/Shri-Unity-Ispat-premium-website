import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { categoryBySlug } from "@/data/categories";
import { products, findProduct, relatedProducts } from "@/data/products";
import { brands } from "@/data/brands";
import { PageHero } from "@/components/sections/PageHero";
import { SpecSheet } from "@/components/product/SpecSheet";
import { ApplicationCards } from "@/components/product/ApplicationCards";
import { BrandList } from "@/components/product/BrandList";
import { ProductCard } from "@/components/catalogue/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Img } from "@/components/ui/Img";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { Availability } from "@/components/ui/Availability";
import { DimensionLine } from "@/components/ui/DimensionLine";
import { absoluteUrl, buildMetadata, JsonLd } from "@/lib/seo";
import { images } from "@/lib/images";
import { site, telHref, whatsappHref } from "@/lib/site";
import { productHref } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await props.params;
  const p = findProduct(category, product);
  const c = categoryBySlug(category);
  if (!p || !c) return {};
  return buildMetadata({
    title: `${p.name} Supplier in Varanasi`,
    description: `${p.summary} ${p.standards.length ? `Standard: ${p.standards.join(", ")}. ` : ""}${p.name} from Shri Unity Ispat, Varanasi — request a quote today.`,
    path: productHref(category, product),
    image: p.image,
  });
}

export default async function ProductPage(props: PageProps<"/products/[category]/[product]">) {
  const { category, product } = await props.params;
  const p = findProduct(category, product);
  const c = categoryBySlug(category);
  if (!p || !c) notFound();

  const related = relatedProducts(p, 4);
  const brandSlugs = p.brands.length ? p.brands : brands.filter((b) => b.categories.includes(c.slug)).map((b) => b.slug);
  const gallery = p.gallery ?? [];
  const quoteHref = `/quote?category=${c.slug}&product=${p.slug}`;
  const waHref = whatsappHref(`Hello Shri Unity Ispat, I would like a quote for ${p.name}.`);

  const facts = [
    { label: "Material", value: p.material },
    { label: "Grades", value: p.grades.join(", ") },
    { label: "Standards", value: p.standards.join(", ") },
    { label: "Finish", value: p.finishes.join(", ") },
  ].filter((f) => f.value);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: absoluteUrl(images[p.image].src),
    category: c.name,
    material: p.material,
    url: absoluteUrl(productHref(c.slug, p.slug)),
    additionalProperty: p.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
    seller: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <PageHero
        label={c.name}
        title={p.name}
        subtitle={p.summary}
        image={p.image}
        crumbs={[
          { name: "Products", path: "/products" },
          { name: c.name, path: `/products/${c.slug}` },
          { name: p.name, path: productHref(c.slug, p.slug) },
        ]}
        aside={
          <div className="border-l border-white/25 pl-6">
            <Availability value={p.availability} tone="dark" />
            <p className="mt-4 text-sm text-white/65">
              {p.availability === "on-request"
                ? "Procured against enquiry — share size and quantity for lead time."
                : "Part of our regular range — confirm current stock and sizes with our team."}
            </p>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href={quoteHref} variant="light" magnetic>
            Request a Quote
          </LinkButton>
          <LinkButton href={waHref} variant="outline-light">
            WhatsApp
          </LinkButton>
        </div>
      </PageHero>

      {/* Presentation */}
      <section className="bg-paper py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <MaskReveal className="relative aspect-[4/3] overflow-hidden bg-bone">
              <Img k={p.image} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
            </MaskReveal>
            <DimensionLine label={`${c.index} · ${p.type}`} className="mt-5" />
            {gallery.length > 0 && (
              <ul className="mt-5 grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((g) => (
                  <li key={g} className="relative aspect-square overflow-hidden bg-bone">
                    <Img k={g} fill sizes="(min-width:1024px) 18vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-5">
            <p className="label text-gold">Product information</p>
            <Reveal>
              <p className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] text-navy">{p.description}</p>
            </Reveal>
            <dl className="mt-10 border-t border-line">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="label pt-0.5 text-steel-dark">{f.label}</dt>
                  <dd className="text-sm text-navy">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#specifications" variant="outline">
                Technical specifications
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section id="specifications" aria-labelledby="spec-title" className="bg-ivory py-14 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <SectionHead align="stack" label="Technical specifications" title={<span id="spec-title">The numbers.</span>} titleClassName="text-[clamp(2.4rem,4vw,3.8rem)]" />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-graphite/75">
                Values reflect the governing standard or common market supply. Exact sizes, thicknesses and brands
                depend on stock at the time of order — our team will confirm with your quotation.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <SpecSheet specs={p.specs} caption={`${p.name} — specification`} />
            <details className="group mt-4 border border-line bg-paper">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 sm:px-8 [&::-webkit-details-marker]:hidden">
                <span className="label text-navy">Custom requirements &amp; notes</span>
                <span className="text-xl text-steel transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="space-y-3 border-t border-line px-5 py-5 text-sm leading-relaxed text-graphite/85 sm:px-8">
                <p>Share the grade, size, length and quantity you need. Mixed-size and multi-product orders can be quoted together.</p>
                <p>Mention brand preference, cutting requirements or documentation needs in your enquiry and we will confirm what can be provided.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section aria-labelledby="papps-title" className="bg-paper py-14 md:py-20">
        <div className="container-x">
          <SectionHead label="Applications" title={<span id="papps-title">Put to work in.</span>} />
          <div className="mt-10">
            <ApplicationCards applications={p.applications} fallback={p.image} />
          </div>
        </div>
      </section>

      {/* Brands */}
      {brandSlugs.length > 0 && (
        <section aria-labelledby="pbrands-title" className="bg-paper pb-14 md:pb-20">
          <div className="container-x">
            <SectionHead
              label="Available brands"
              title={<span id="pbrands-title">Brands we deal in.</span>}
              intro="Brand availability varies by size and time of order."
            />
            <div className="mt-10">
              <BrandList slugs={brandSlugs} />
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section aria-labelledby="need-title" className="relative overflow-hidden bg-navy py-14 text-white md:py-20">
        <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-gold-soft">Need this product?</p>
            <h2 id="need-title" className="mt-6 font-display text-[length:var(--text-title)] leading-[0.95] uppercase">
              {p.name}, quoted for your project.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
            <LinkButton href={quoteHref} variant="gold" magnetic>
              Request a Quote
            </LinkButton>
            <a href={telHref(site.phones[0].e164)} className="inline-flex h-12 items-center justify-center gap-2 border border-white/35 px-6 text-[0.7rem] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-navy sm:h-[3.25rem]">
              <Phone className="size-4" aria-hidden="true" /> Call now
            </a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 border border-white/35 px-6 text-[0.7rem] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-navy sm:h-[3.25rem]">
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-ivory py-14 md:py-20">
          <div className="container-x">
            <SectionHead label={`More in ${c.name}`} title={<span id="related-title">Related products.</span>} />
            <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug} className="w-[80%] shrink-0 snap-start sm:w-auto">
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <JsonLd data={productLd} />
    </>
  );
}
