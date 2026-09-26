import Link from "next/link";
import type { Category } from "@/data/categories";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/utils";

type Props = {
  category: Category;
  count?: number;
  size?: "lg" | "md" | "sm";
  className?: string;
  priority?: boolean;
};

const aspect = {
  lg: "aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[min(38rem,72vh)]",
  md: "aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[min(38rem,72vh)]",
  sm: "aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[min(30rem,62vh)]",
};

/** Editorial category tile: full-bleed photograph with an index, title and a hover reveal. */
export function CategoryCard({ category, count, size = "md", className, priority }: Props) {
  return (
    <Link
      href={`/products/${category.slug}`}
      data-cursor="view"
      className={cn("group relative block overflow-hidden bg-navy text-white", aspect[size], className)}
    >
      <Img
        k={category.image}
        fill
        priority={priority}
        sizes={size === "lg" ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
        className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
      />
      {/* Tonal overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/5 transition-opacity duration-700 group-hover:opacity-95" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy/55 to-transparent" />
      {/* Brushed-steel sheen sweeps across on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255/0.14)_50%,transparent_65%)] transition-transform duration-[1.4s] ease-out group-hover:translate-x-full"
      />
      {/* Corner ticks */}
      <span aria-hidden="true" className="absolute top-4 left-4 size-3 border-t border-l border-white/50" />
      <span aria-hidden="true" className="absolute top-4 right-4 size-3 border-t border-r border-white/50" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8">
        <span className="label text-white/80">
          {category.index} <span className="text-white/40">/ Category</span>
        </span>
        {typeof count === "number" && <span className="label text-white/60">{count} products</span>}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="label mb-3 text-gold-soft">{category.short}</p>
        <h3
          className={cn(
            "font-display leading-[0.95] uppercase transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1",
            size === "lg" ? "text-[clamp(2.2rem,4.4vw,4.2rem)]" : "text-[clamp(1.9rem,2.8vw,2.8rem)]",
          )}
        >
          {category.name}
        </h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="max-w-md pt-4 text-sm leading-relaxed text-white/75">{category.headline}</p>
            <p className="pt-3 text-xs text-white/55">{category.families.join(" · ")}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
          <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase">View specifications</span>
          <Arrow />
        </div>
      </div>
    </Link>
  );
}
