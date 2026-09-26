import { QuoteForm } from "@/components/forms/QuoteForm";
import { getQuoteOptions } from "@/lib/quote-options";
import { SectionHead } from "@/components/ui/SectionHead";

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
    <section id="quote" aria-labelledby="quote-title" className="relative bg-ivory py-20 md:py-32">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHead
          index={index}
          label="Request a quote"
          title={<span id="quote-title">Share the requirement. We&rsquo;ll do the rest.</span>}
          intro="Three quick steps — product, specification, delivery. Our team responds with pricing and availability."
        />
        <div className="mt-12 md:mt-16">
          <QuoteForm options={getQuoteOptions()} defaultCategory={defaultCategory} defaultProduct={defaultProduct} />
        </div>
      </div>
    </section>
  );
}
