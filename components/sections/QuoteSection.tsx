import { Phone, MessageCircle } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { site, telHref, whatsappHref } from "@/lib/site";

export function QuoteSection({
  index = "12",
  defaultCategory,
  defaultProduct,
}: {
  index?: string;
  defaultCategory?: string;
  defaultProduct?: string;
}) {
  return (
    <section id="quote" aria-labelledby="quote-title" className="relative bg-paper py-24 md:py-36">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_60%)]" aria-hidden="true" />
      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="mb-6 flex items-center gap-4 text-steel-dark">
            <span className="label text-gold">{index}</span>
            <span className="h-px w-10 bg-ink/20" aria-hidden="true" />
            <span className="label">Request a quote</span>
          </div>
          <SplitHeading id="quote-title" className="font-display text-[length:var(--text-title)] leading-[0.95] text-navy uppercase">
            Share the requirement. We&rsquo;ll do the rest.
          </SplitHeading>
          <p className="mt-8 max-w-sm text-[0.98rem] leading-relaxed text-graphite/80">
            Send us grade, size and quantity — or your BOQ in the notes — and our team will respond with pricing and
            availability.
          </p>

          <div className="mt-10 space-y-px border-t border-line">
            {site.phones.map((p) => (
              <a key={p.e164} href={telHref(p.e164)} className="group flex items-center justify-between border-b border-line py-4">
                <span className="flex items-center gap-3 text-navy">
                  <Phone className="size-4 text-gold" aria-hidden="true" />
                  <span className="font-display text-2xl">{p.display}</span>
                </span>
                <span className="label text-steel transition-colors group-hover:text-navy">Call</span>
              </a>
            ))}
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-line py-4">
              <span className="flex items-center gap-3 text-navy">
                <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                <span className="font-display text-2xl">WhatsApp</span>
              </span>
              <span className="label text-steel transition-colors group-hover:text-navy">Chat</span>
            </a>
          </div>
        </div>

        <div className="border border-line bg-paper/80 p-6 backdrop-blur-sm sm:p-10 lg:col-span-8">
          <QuoteForm defaultCategory={defaultCategory} defaultProduct={defaultProduct} />
        </div>
      </div>
    </section>
  );
}
