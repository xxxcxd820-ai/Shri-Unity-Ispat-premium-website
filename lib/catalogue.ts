import { products, availabilityLabel, type Product } from "@/data/products";
import { categories, categoryBySlug } from "@/data/categories";
import { brandBySlug } from "@/data/brands";

export type FacetKey = "category" | "type" | "material" | "grade" | "brand" | "finish" | "application" | "availability";

export const facetLabels: Record<FacetKey, string> = {
  category: "Category",
  type: "Product type",
  material: "Material",
  grade: "Grade",
  brand: "Brand",
  finish: "Finish",
  application: "Application",
  availability: "Availability",
};

/** Values a product contributes to each facet. */
export function facetValues(p: Product, key: FacetKey): string[] {
  switch (key) {
    case "category":
      return [p.category];
    case "type":
      return [p.type];
    case "material":
      return [p.material];
    case "grade":
      return p.grades;
    case "brand":
      return p.brands;
    case "finish":
      return p.finishes;
    case "application":
      return p.applications;
    case "availability":
      return [p.availability];
  }
}

export function facetOptionLabel(key: FacetKey, value: string) {
  if (key === "category") return categoryBySlug(value)?.short ?? value;
  if (key === "brand") return brandBySlug(value)?.name ?? value;
  if (key === "availability") return availabilityLabel[value as keyof typeof availabilityLabel] ?? value;
  return value;
}

/** Options for each facet with counts, in a stable order. */
export function facetOptions(key: FacetKey) {
  const counts = new Map<string, number>();
  for (const p of products) for (const v of facetValues(p, key)) counts.set(v, (counts.get(v) ?? 0) + 1);
  let values = [...counts.keys()];
  if (key === "category") values = categories.map((c) => c.slug).filter((s) => counts.has(s));
  else if (key === "availability") values = (["in-stock", "available", "on-request"] as const).filter((v) => counts.has(v));
  else values.sort((a, b) => (counts.get(b)! - counts.get(a)!) || a.localeCompare(b));
  return values.map((value) => ({ value, label: facetOptionLabel(key, value), count: counts.get(value)! }));
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s×.-]/g, " ");

const haystacks = new Map<string, { spaced: string; compact: string }>();

function haystack(p: Product) {
  const key = `${p.category}/${p.slug}`;
  let h = haystacks.get(key);
  if (!h) {
    const c = categoryBySlug(p.category);
    const text = norm(
      [
        p.name,
        p.summary,
        p.type,
        p.material,
        c?.name,
        c?.short,
        ...p.grades,
        ...p.standards,
        ...p.finishes,
        ...p.applications,
        ...(p.keywords ?? []),
        ...p.brands.map((b) => brandBySlug(b)?.name ?? b),
        ...p.specs.map((s) => s.value),
      ].join(" "),
    );
    h = { spaced: text, compact: text.replace(/[\s-]+/g, "") };
    haystacks.set(key, h);
  }
  return h;
}

/** Every token must appear somewhere; tolerant of spacing ("fe500d" = "Fe 500D") and simple plurals. */
export function matchesQuery(p: Product, query: string) {
  const tokens = norm(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return true;
  const h = haystack(p);
  return tokens.every((t) => {
    // Short alphabetic tokens ("gi", "ms", "hr") must start a word, or they match inside unrelated words.
    if (/^[a-z]{1,3}$/.test(t)) return new RegExp(`(^|[^a-z])${t}`).test(h.spaced);
    const stem = t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t;
    return h.spaced.includes(stem) || h.compact.includes(stem);
  });
}
