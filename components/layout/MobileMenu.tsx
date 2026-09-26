"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { nav, site, telHref, whatsappHref } from "@/lib/site";
import { categories } from "@/data/categories";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-[var(--header-h)] lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="container-x flex min-h-full flex-col pb-10">
            <nav aria-label="Mobile" className="border-t border-line">
              <ul>
                {[{ label: "Home", href: "/" }, ...nav, { label: "Request a Quote", href: "/quote" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline justify-between py-4 font-display text-[2.1rem] leading-none text-navy uppercase"
                    >
                      {item.label}
                      <span className="label text-steel">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <p className="label mb-4 text-steel-dark">Product categories</p>
              <ul className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/products/${c.slug}`}
                      onClick={onClose}
                      className="inline-block border border-line px-3 py-2 text-xs font-medium text-graphite"
                    >
                      {c.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 pt-10">
              <a href={telHref(site.phones[0].e164)} className="flex flex-col items-center gap-2 bg-navy py-4 text-paper">
                <Phone className="size-4" aria-hidden="true" />
                <span className="label">Call</span>
              </a>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-ivory py-4 text-navy">
                <MessageCircle className="size-4" aria-hidden="true" />
                <span className="label">WhatsApp</span>
              </a>
              <a href={`mailto:${site.email}`} className="flex flex-col items-center gap-2 bg-ivory py-4 text-navy">
                <Mail className="size-4" aria-hidden="true" />
                <span className="label">Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
