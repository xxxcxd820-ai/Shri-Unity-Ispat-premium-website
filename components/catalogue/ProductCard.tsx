import Link from "next/link";
import type { Product } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";
import { Availability } from "@/components/ui/Availability";
import { cn, productHref } from "@/lib/utils";

/** Catalogue tile: photograph, family label, title and two headline specs. */
export function ProductCard({ product, index, className }: { product: Product; index?: number; className?: string }) {
  const category = categoryBySlug(product.category);
  const keySpecs = product.specs.slice(0, 2);
  return (
    <Link
      href={productHref(product.category, product.slug)}
      className={cn("group flex h-full flex-col border border-line bg-paper transition-colors duration-500 hover:border-navy/40", className)}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-bone">
        <Img
          k={product.image}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white">
          <span className="label">
            {category?.index}
            {typeof index === "number" && <span className="text-white/60"> · {String(index + 1).padStart(2, "0")}</span>}
          </span>
          <span className="label bg-navy/70 px-2 py-1 backdrop-blur-sm">{product.type}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="label text-gold">{category?.name}</p>
        <h3 className="mt-3 font-display text-[1.7rem] leading-[1.02] text-navy uppercase transition-transform duration-500 group-hover:translate-x-1">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-graphite/75">{product.summary}</p>

        <dl className="mt-5 space-y-2 border-t border-line pt-4 text-xs">
          {keySpecs.map((s) => (
            <div key={s.label} className="grid grid-cols-[6.5rem_1fr] gap-3">
              <dt className="label text-steel-dark">{s.label}</dt>
              <dd className="line-clamp-2 text-graphite">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-center justify-between pt-6">
          <Availability value={product.availability} />
          <span className="flex items-center gap-2 text-navy">
            <span className="text-[0.64rem] font-semibold tracking-[0.18em] uppercase">Specs</span>
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
