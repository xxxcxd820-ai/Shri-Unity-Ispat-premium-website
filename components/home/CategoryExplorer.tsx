import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { CategoryCard } from "@/components/catalogue/CategoryCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Asymmetric editorial grid: large / small rhythm repeated across the catalogue. */
const layout: { span: string; size: "lg" | "md" | "sm" }[] = [
  { span: "lg:col-span-7", size: "lg" },
  { span: "lg:col-span-5", size: "md" },
  { span: "lg:col-span-4", size: "sm" },
  { span: "lg:col-span-4", size: "sm" },
  { span: "lg:col-span-4", size: "sm" },
  { span: "lg:col-span-5", size: "md" },
  { span: "lg:col-span-7", size: "lg" },
];

export function CategoryExplorer({ limit, index = "02" }: { limit?: number; index?: string }) {
  const list = limit ? categories.slice(0, limit) : categories;
  return (
    <section aria-labelledby="explorer-title" className="bg-ivory py-14 md:py-20">
      <div className="container-x">
        <SectionHead
          index={index}
          label="Category explorer"
          title={<span id="explorer-title">Engineered for every framework.</span>}
          intro="Each family opens into its own specification pages — grades, standards, applications and the brands we can supply."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-12 lg:gap-4">
          {list.map((c, i) => {
            const l = layout[i % layout.length];
            return (
              <Reveal key={c.slug} delay={(i % 3) * 0.06} className={cn(l.span, l.size === "lg" && "sm:col-span-2 lg:col-span-7")}>
                <CategoryCard category={c} size={l.size} count={productsByCategory(c.slug).length} />
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/products" variant="solid" magnetic>
            Open the full catalogue
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
