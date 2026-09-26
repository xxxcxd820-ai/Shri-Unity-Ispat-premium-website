import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { buildMetadata, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { directionsHref, site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote — Steel Prices & Availability",
  description:
    "Request a quotation from Shri Unity Ispat, Varanasi for TMT bars, pipes, structural steel, plates, sheets, coils, roofing and more. Share grade, size and quantity.",
  path: "/quote",
});

export default async function QuotePage(props: PageProps<"/quote">) {
  const sp = await props.searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const category = one(sp.category);
  const product = one(sp.product);
  const note = one(sp.note);

  const contacts = [
    ...site.phones.map((p) => ({ Icon: Phone, label: "Call", value: p.display, href: telHref(p.e164) })),
    { Icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: whatsappHref() },
    { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: MapPin, label: "Visit", value: site.address.full, href: directionsHref },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-paper pt-[calc(var(--header-h)+4rem)] pb-24 md:pb-32">
        <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" aria-hidden="true" />
        <div className="container-x relative grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              Request a quote
            </p>
            <SplitHeading as="h1" immediate className="mt-6 font-display text-[length:var(--text-title)] leading-[0.95] text-navy uppercase">
              Tell us what you need. We&rsquo;ll price it.
            </SplitHeading>
            <p className="mt-8 max-w-sm leading-relaxed text-graphite/80">
              The more detail you share — grade, sizes, quantities, brand preference and delivery location — the faster
              and more accurate our response.
            </p>

            <ul className="mt-12 border-t border-line">
              {contacts.map(({ Icon, label, value, href }) => (
                <li key={label + value} className="border-b border-line">
                  <a
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group grid grid-cols-[1.5rem_1fr] items-start gap-4 py-4"
                  >
                    <Icon className="mt-0.5 size-4 text-gold" aria-hidden="true" />
                    <span>
                      <span className="label block text-steel">{label}</span>
                      <span className="mt-1 block break-all text-navy group-hover:underline">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-line bg-paper p-6 sm:p-10 lg:col-span-8">
            <QuoteForm defaultCategory={category} defaultProduct={product} defaultMessage={note ? `Looking for: ${note}` : undefined} />
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request a Quote", path: "/quote" }])} />
    </>
  );
}
