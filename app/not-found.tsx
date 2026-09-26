import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { categories } from "@/data/categories";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-paper pt-[calc(var(--header-h)+5rem)] pb-28">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <p className="label text-gold">Error 404</p>
        <h1 className="mt-6 font-display text-[length:var(--text-mega)] leading-[0.85] text-navy uppercase">
          Off the
          <br />
          drawing.
        </h1>
        <p className="mt-8 max-w-md text-graphite/80">
          The page you were looking for doesn&rsquo;t exist. Try the catalogue, or jump to a product family below.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/products">Product catalogue</LinkButton>
          <LinkButton href="/" variant="outline">
            Home
          </LinkButton>
        </div>
        <ul className="mt-14 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/products/${c.slug}`} className="inline-block border border-line px-3 py-2 text-xs text-navy hover:border-navy">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
