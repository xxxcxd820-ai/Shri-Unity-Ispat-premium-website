import Link from "next/link";
import type { Product } from "@/data/products";
import { categoryBySlug } from "@/data/categories";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";
import { Availability } from "@/components/ui/Availability";
import { cn, productHref } from "@/lib/utils";

/** Spec labels that best describe a product's size range, most useful first. */
const SIZE_LABELS = ["diameter", "nominal bore", "size range", "leg size", "depth", "designation", "size", "width × thickness", "thickness", "gauge", "section", "profile", "form"];
const NOT_INFORMATIVE = /^(on request|as per design|as specified)$/i;

function keyFacts(product: Product) {
  const size = SIZE_LABELS.map((l) => product.specs.find((s) => s.label.toLowerCase() === l && !NOT_INFORMATIVE.test(s.value))).find(Boolean);
  const grades = product.grades.filter((g) => !NOT_INFORMATIVE.test(g));
  return {
    size,
    standard: product.standards.slice(0, 2).join(" · "),
    grades: grades.slice(0, 3),
    moreGrades: Math.max(0, grades.length - 3),
  };
}

/**
 * Product card: photograph, clear name and summary, then the facts a buyer
 * scans for — standard, size range and grades — plus direct quote and spec actions.
 * The whole card links to the specification page; "Get quote" is a separate action.
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const category = categoryBySlug(product.category);
  const { size, standard, grades, moreGrades } = keyFacts(product);
  const href = productHref(product.category, product.slug);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-line bg-white transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-navy/30 hover:shadow-[0_24px_50px_-28px_rgb(15_29_49/0.45)]",
        className,
      )}
    >
      {/* Gold rule sweeps in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
      />

      <div className="relative aspect-[16/11] overflow-hidden bg-bone">
        <Img
          k={product.image}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 90vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 text-[0.66rem] font-semibold tracking-[0.08em] text-navy uppercase backdrop-blur-sm">
          {product.type}
        </span>
        {standard && (
          <span className="absolute bottom-3 left-3 border border-white/40 bg-navy/60 px-2.5 py-1 text-[0.7rem] font-medium text-white backdrop-blur-sm">
            {standard}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">{category?.name}</p>
        <h3 className="mt-2 font-display text-[1.65rem] leading-[1.05] text-navy uppercase">
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-graphite/80">{product.summary}</p>

        {(size || grades.length > 0) && (
          <dl className="mt-4 space-y-3 border-t border-line pt-4">
            {size && (
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-steel uppercase">{size.label}</dt>
                <dd className="mt-1 line-clamp-2 text-[0.88rem] leading-snug text-navy">{size.value}</dd>
              </div>
            )}
            {grades.length > 0 && (
              <div>
                <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-steel uppercase">
                  {grades.length + moreGrades > 1 ? "Grades" : "Grade"}
                </dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {grades.map((g) => (
                    <span key={g} className="bg-ivory px-2 py-0.5 text-[0.78rem] text-navy ring-1 ring-line">
                      {g}
                    </span>
                  ))}
                  {moreGrades > 0 && <span className="px-1 py-0.5 text-[0.78rem] text-steel">+{moreGrades} more</span>}
                </dd>
              </div>
            )}
          </dl>
        )}

        <div className="min-h-5 flex-1" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <Availability value={product.availability} compact />
          <div className="relative z-10 flex items-center gap-2">
            <Link
              href={`/quote?category=${product.category}&product=${product.slug}`}
              className="border border-line-strong px-3 py-2 text-[0.64rem] font-semibold tracking-[0.12em] whitespace-nowrap text-navy uppercase transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Get quote
            </Link>
            <span className="flex items-center gap-1.5 text-navy" aria-hidden="true">
              <span className="hidden text-[0.64rem] font-semibold tracking-[0.14em] uppercase min-[400px]:inline">Specs</span>
              <Arrow />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
