"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { images, stockyardGallery } from "@/lib/images";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Masonry gallery (columns) with a keyboard-accessible fullscreen viewer. */
export function StockyardGallery({ limit }: { limit?: number }) {
  const items = limit ? stockyardGallery.slice(0, limit) : stockyardGallery;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <ul className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>li]:mb-3">
        {items.map((item, i) => {
          const img = images[item.key];
          return (
            <li key={item.key} className="break-inside-avoid">
              <Reveal delay={(i % 3) * 0.06}>
                <button
                  type="button"
                  data-cursor="view"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden bg-bone"
                  aria-label={`Open photo: ${item.label}`}
                >
                  <Img
                    k={item.key}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    style={{ aspectRatio: `${img.width} / ${img.height}` }}
                  />
                  <span className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/25" />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-navy/80 to-transparent p-4 text-white">
                    <span className="label">
                      {String(i + 1).padStart(2, "0")} · {item.label}
                    </span>
                    <Maximize2 className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={`${items[open].label} — photo ${open + 1} of ${items.length}`}
            className="fixed inset-0 z-[80] flex flex-col bg-navy/97 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="container-x flex h-16 items-center justify-between" onClick={(e) => e.stopPropagation()}>
              <span className="label text-white/70">
                {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {items[open].label}
              </span>
              <button type="button" onClick={close} className="flex size-11 items-center justify-center" aria-label="Close viewer" autoFocus>
                <X className="size-6" />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <m.div
                  key={open}
                  className="absolute inset-4 sm:inset-10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Img k={items[open].key} fill sizes="100vw" className="object-contain" />
                </m.div>
              </AnimatePresence>
              {[
                { d: -1, label: "Previous photo", Icon: ChevronLeft, pos: "left-2 sm:left-6" },
                { d: 1, label: "Next photo", Icon: ChevronRight, pos: "right-2 sm:right-6" },
              ].map(({ d, label, Icon, pos }) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => step(d)}
                  aria-label={label}
                  className={cn(
                    "absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-navy/60 backdrop-blur transition-colors hover:bg-white hover:text-navy",
                    pos,
                  )}
                >
                  <Icon className="size-5" />
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
