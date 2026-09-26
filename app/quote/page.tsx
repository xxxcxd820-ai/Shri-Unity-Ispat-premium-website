import type { Metadata } from "next";
import { Clock, FileCheck2, Layers } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getQuoteOptions } from "@/lib/quote-options";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Img } from "@/components/ui/Img";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote — Steel Prices & Availability in Varanasi",
  description:
    "Request a quotation from Shri Unity Ispat, Varanasi for TMT bars, pipes, structural steel, plates, sheets, coils, roofing and more. Share grade, size and quantity in three quick steps.",
  path: "/quote",
  image: "stockRacksBars",
});

const points = [
  { Icon: Layers, title: "Mixed orders welcome", text: "Combine sizes, grades and product families in one enquiry." },
  { Icon: FileCheck2, title: "Specification first", text: "We confirm grade, standard and size before pricing." },
  { Icon: Clock, title: "Quick response", text: "Our team follows up by phone, WhatsApp or email." },
];

export default async function QuotePage(props: PageProps<"/quote">) {
  const sp = await props.searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const note = one(sp.note);

  return (
    <>
      <section data-hero="dark" className="grain relative isolate overflow-hidden bg-navy pt-[calc(var(--header-h)+3.5rem)] pb-44 text-white md:pb-56">
        <div className="absolute inset-0 -z-10 opacity-35">
          <Img k="stockRacksBars" fill priority sizes="100vw" quality={60} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy" />
        </div>
        <div className="container-x">
          <p className="eyebrow flex items-center gap-3 text-gold-soft">
            <span className="h-px w-8 bg-gold-soft" aria-hidden="true" />
            Request a quote
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
            <SplitHeading as="h1" immediate className="font-display text-[length:var(--text-display)] leading-[0.92] uppercase lg:col-span-7">
              Tell us what you need. We&rsquo;ll price it.
            </SplitHeading>
            <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
              {points.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold-soft" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-semibold tracking-wide text-white">{title}</span>
                    <span className="mt-1 block text-sm text-white/65">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-paper pb-24">
        <div className="container-x -mt-32 md:-mt-40">
          <QuoteForm options={getQuoteOptions()} headingLevel="h2" defaultCategory={one(sp.category)} defaultProduct={one(sp.product)} defaultMessage={note ? `Looking for: ${note}` : undefined} />
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request a Quote", path: "/quote" }])} />
    </>
  );
}
