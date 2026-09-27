import type { Product } from "@/data/products";
import { ProductCard } from "@/components/catalogue/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { ScrollRail } from "@/components/ui/ScrollRail";

/** Featured products in a calm, swipeable rail. */
export function FeaturedProducts({ items, index = "03" }: { items: Product[]; index?: string }) {
  return (
    <section aria-labelledby="featured-title" className="overflow-hidden bg-paper py-14 md:py-20">
      <div className="container-x">
        <SectionHead
          index={index}
          label="Featured steel products"
          title={<span id="featured-title">The core range.</span>}
          intro="Key products from our regular range — each with its own specification page."
        />
        <ScrollRail label="Featured products" className="mt-10">
          {items.map((p) => (
            <div key={p.slug} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/4)]">
              <ProductCard product={p} />
            </div>
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
