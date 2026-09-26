import Link from "next/link";
import { categories } from "@/data/categories";
import { directionsHref, site, telHref, whatsappHref } from "@/lib/site";
import { Logo } from "./Logo";
import { Arrow } from "@/components/ui/Arrow";

const company = [
  { label: "About", href: "/about" },
  { label: "Brands", href: "/brands" },
  { label: "Stockyard", href: "/stockyard" },
  { label: "Industries", href: "/industries" },
  { label: "Quality & Supply", href: "/about#quality" },
  { label: "Request a Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white/80">
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-x relative">
        {/* CTA band */}
        <div className="grid gap-10 border-b border-white/10 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label mb-6 text-gold-soft">Start a requirement</p>
            <p className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] text-white uppercase">
              Tell us what
              <br />
              you are building.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link
              href="/quote"
              className="group inline-flex h-13 items-center gap-3 bg-gold px-7 text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-[#735820]"
            >
              Request a Quote <Arrow />
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-13 items-center gap-3 border border-white/30 px-7 text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-navy"
            >
              WhatsApp <Arrow direction="up-right" />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo className="text-white" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Iron and steel supplier, distributor and stockist in Varanasi — supplying construction, fabrication,
              infrastructure and industrial requirements.
            </p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="label mb-6 text-white/50">Products</h2>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm min-[420px]:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`} className="link-underline text-white/75 hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label mb-6 text-white/50">Company</h2>
            <ul className="space-y-2.5 text-sm">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-white/75 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label mb-6 text-white/50">Contact</h2>
            <address className="space-y-4 text-sm not-italic">
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="block text-white/75 hover:text-white">
                {site.address.line1}
                <br />
                {site.address.city} – {site.address.postalCode}
              </a>
              <span className="block space-y-1">
                {site.phones.map((p) => (
                  <a key={p.e164} href={telHref(p.e164)} className="block text-white/75 hover:text-white">
                    {p.display}
                  </a>
                ))}
              </span>
              <a href={`mailto:${site.email}`} className="block break-words text-white/75 hover:text-white">
                {site.email}
              </a>
            </address>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
          <p className="font-display text-[15.5vw] leading-[0.8] font-semibold tracking-[-0.02em] whitespace-nowrap text-white/[0.04] uppercase">
            Unity Ispat
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 pb-24 text-xs lg:pb-8 text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Shri Unity Ispat. All Rights Reserved.</p>
          <p className="label text-white/40">Iron &amp; Steel — The Complete Solution</p>
          <Link href="/credits" className="hover:text-white">
            Image credits
          </Link>
        </div>
      </div>
    </footer>
  );
}
