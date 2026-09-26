"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { facetLabels, facetOptionLabel, facetOptions, facetValues, matchesQuery, type FacetKey } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";
import { LinkButton } from "@/components/ui/Button";
import { whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const FACETS: FacetKey[] = ["type", "material", "grade", "brand", "finish", "application", "availability"];
const ALL_KEYS: FacetKey[] = ["category", ...FACETS];
const EXAMPLES = ["MS round pipe", "TMT 500D", "ISMB", "GI sheet", "MS angle", "HR coil"];

type Selection = Record<FacetKey, string[]>;

const emptySelection = (): Selection => ({
  category: [],
  type: [],
  material: [],
  grade: [],
  brand: [],
  finish: [],
  application: [],
  availability: [],
});

function readParams(params: URLSearchParams): { q: string; sel: Selection } {
  const sel = emptySelection();
  for (const k of ALL_KEYS) {
    const v = params.get(k);
    if (v) sel[k] = v.split(",").filter(Boolean);
  }
  return { q: params.get("q") ?? "", sel };
}

export function Catalogue() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const initial = useMemo(() => readParams(new URLSearchParams(params.toString())), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [query, setQuery] = useState(initial.q);
  const [sel, setSel] = useState<Selection>(initial.sel);
  const [drawer, setDrawer] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Keep the URL in sync (shareable filtered views) without adding history entries.
  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams();
      if (query.trim()) next.set("q", query.trim());
      for (const k of ALL_KEYS) if (sel[k].length) next.set(k, sel[k].join(","));
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 250);
    return () => clearTimeout(t);
  }, [query, sel, pathname, router]);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const results = useMemo(() => {
    const list = products.filter(
      (p) =>
        matchesQuery(p, query) &&
        ALL_KEYS.every((k) => !sel[k].length || facetValues(p, k).some((v) => sel[k].includes(v))),
    );
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return [...list].sort((a, b) => Number(b.name.toLowerCase().includes(q)) - Number(a.name.toLowerCase().includes(q)));
  }, [query, sel]);

  const toggle = (k: FacetKey, v: string) =>
    setSel((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));

  const activeChips = ALL_KEYS.flatMap((k) => sel[k].map((v) => ({ k, v })));
  const clearAll = () => {
    setSel(emptySelection());
    setQuery("");
  };

  const filterPanel = (
    <div className="divide-y divide-line border-y border-line">
      {FACETS.map((k) => (
        <FacetGroup key={k} facet={k} selected={sel[k]} onToggle={(v) => toggle(k, v)} defaultOpen={k === "type" || k === "availability" || sel[k].length > 0} />
      ))}
    </div>
  );

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <label htmlFor="catalogue-search" className="sr-only">
          Search products
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-0 size-6 -translate-y-1/2 text-steel" aria-hidden="true" />
        <input
          id="catalogue-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search — e.g. MS round pipe, TMT 500D, ISMB"
          autoComplete="off"
          className="w-full border-0 border-b border-ink/20 bg-transparent py-5 pr-12 pl-10 font-display text-[clamp(1.5rem,3vw,2.4rem)] text-navy placeholder:text-steel/70 focus:border-navy focus:outline-none"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute top-1/2 right-0 flex size-10 -translate-y-1/2 items-center justify-center text-steel hover:text-navy">
            <X className="size-5" />
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="label mr-1 text-steel">Try</span>
        {EXAMPLES.map((ex) => (
          <button key={ex} type="button" onClick={() => setQuery(ex)} className="border border-line px-3 py-1.5 text-xs text-graphite transition-colors hover:border-navy hover:text-navy">
            {ex}
          </button>
        ))}
      </div>

      {/* Category rail */}
      <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => setSel((s) => ({ ...s, category: [] }))}
          aria-pressed={!sel.category.length}
          className={cn(
            "shrink-0 px-4 py-2.5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-colors",
            !sel.category.length ? "bg-navy text-paper" : "border border-line text-graphite hover:border-navy",
          )}
        >
          All
        </button>
        {categories.map((c) => {
          const on = sel.category.includes(c.slug);
          return (
            <button
              key={c.slug}
              type="button"
              aria-pressed={on}
              onClick={() => toggle("category", c.slug)}
              className={cn(
                "shrink-0 px-4 py-2.5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase transition-colors",
                on ? "bg-navy text-paper" : "border border-line text-graphite hover:border-navy",
              )}
            >
              {c.short}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[17rem_1fr] xl:grid-cols-[19rem_1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] max-h-[calc(100svh-var(--header-h)-3rem)] overflow-y-auto pr-2">
            <div className="mb-4 flex items-center justify-between">
              <p className="label text-navy">Refine</p>
              {activeChips.length > 0 && (
                <button type="button" onClick={clearAll} className="label text-steel underline underline-offset-4 hover:text-navy">
                  Clear all
                </button>
              )}
            </div>
            {filterPanel}
          </div>
        </aside>

        <div ref={resultsRef}>
          <h2 className="sr-only">Matching products</h2>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <p className="text-sm text-graphite" aria-live="polite">
              <span className="font-display text-2xl text-navy">{results.length}</span>{" "}
              {results.length === 1 ? "product" : "products"}
            </p>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex h-10 items-center gap-2 border border-navy px-4 text-[0.68rem] font-semibold tracking-[0.16em] text-navy uppercase lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters{activeChips.length ? ` (${activeChips.length})` : ""}
            </button>
          </div>

          {activeChips.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
              {activeChips.map(({ k, v }) => (
                <li key={`${k}-${v}`}>
                  <button
                    type="button"
                    onClick={() => toggle(k, v)}
                    className="inline-flex items-center gap-2 bg-ivory px-3 py-1.5 text-xs text-navy hover:bg-bone"
                    aria-label={`Remove filter ${facetLabels[k]}: ${facetOptionLabel(k, v)}`}
                  >
                    <span className="text-steel-dark">{facetLabels[k]}:</span> {facetOptionLabel(k, v)}
                    <X className="size-3" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {results.length ? (
            <m.ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((p) => (
                  <m.li
                    key={`${p.category}/${p.slug}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard product={p} />
                  </m.li>
                ))}
              </AnimatePresence>
            </m.ul>
          ) : (
            <div className="mt-8 flex flex-col items-start gap-6 border border-dashed border-line-strong bg-ivory/60 p-8 sm:p-14">
              <p className="label text-gold">No match</p>
              <h3 className="font-display text-4xl text-navy uppercase">No exact product found.</h3>
              <p className="max-w-md text-graphite/80">
                Talk to our team about your requirement — we source many items beyond the listed catalogue.
              </p>
              <div className="flex flex-wrap gap-3">
                <LinkButton href={`/quote${query ? `?note=${encodeURIComponent(query)}` : ""}`}>Request a Quote</LinkButton>
                <LinkButton href={whatsappHref(`Hello Shri Unity Ispat, I am looking for: ${query || "a steel product"}`)} variant="outline">
                  Ask on WhatsApp
                </LinkButton>
                <button type="button" onClick={clearAll} className="label px-2 text-steel underline underline-offset-4 hover:text-navy">
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <m.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close filters" className="absolute inset-0 bg-navy/50" onClick={() => setDrawer(false)} />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col bg-paper"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <p className="label text-navy">Refine products</p>
                <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="flex size-10 items-center justify-center">
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5">{filterPanel}</div>
              <div className="grid grid-cols-2 gap-2 border-t border-line p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button type="button" onClick={clearAll} className="h-12 border border-navy text-[0.7rem] font-semibold tracking-[0.16em] text-navy uppercase">
                  Clear all
                </button>
                <button type="button" onClick={() => setDrawer(false)} className="h-12 bg-navy text-[0.7rem] font-semibold tracking-[0.16em] text-paper uppercase">
                  Show {results.length}
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FacetGroup({
  facet,
  selected,
  onToggle,
  defaultOpen,
}: {
  facet: FacetKey;
  selected: string[];
  onToggle: (v: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const options = useMemo(() => facetOptions(facet), [facet]);
  const visible = showAll ? options : options.slice(0, 8);
  const id = `facet-${facet}`;

  return (
    <div className="py-4">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={id} className="flex w-full items-center justify-between text-left">
        <span className="text-[0.72rem] font-semibold tracking-[0.16em] text-navy uppercase">
          {facetLabels[facet]}
          {selected.length > 0 && <span className="ml-2 text-gold">{selected.length}</span>}
        </span>
        <ChevronDown className={cn("size-4 text-steel transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <div id={id} hidden={!open} className="mt-4">
        <ul className="space-y-1">
          {visible.map((o) => {
            const on = selected.includes(o.value);
            return (
              <li key={o.value}>
                <label className="flex cursor-pointer items-center gap-3 py-1 text-sm text-graphite hover:text-navy">
                  <input type="checkbox" checked={on} onChange={() => onToggle(o.value)} className="size-4 accent-[#0f1d31]" />
                  <span className="flex-1">{o.label}</span>
                  <span className="font-mono text-[0.68rem] text-steel">{o.count}</span>
                </label>
              </li>
            );
          })}
        </ul>
        {options.length > 8 && (
          <button type="button" onClick={() => setShowAll((v) => !v)} className="label mt-3 text-steel underline underline-offset-4 hover:text-navy">
            {showAll ? "Show fewer" : `Show all ${options.length}`}
          </button>
        )}
      </div>
    </div>
  );
}
