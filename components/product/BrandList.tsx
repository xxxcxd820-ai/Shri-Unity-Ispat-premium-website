import Image from "next/image";
import { brandBySlug } from "@/data/brands";

/** Grid of brand wordmarks (or approved logos) for the given brand slugs. */
export function BrandList({ slugs }: { slugs: string[] }) {
  const list = slugs.map(brandBySlug).filter((b): b is NonNullable<typeof b> => Boolean(b));
  if (!list.length) return null;
  return (
    <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-4">
      {list.map((b) => (
        <li key={b.slug} className="group flex min-h-32 flex-col justify-between border-r border-b border-line p-5 transition-colors hover:bg-ivory sm:p-6">
          {b.logo ? (
            <Image src={b.logo} alt={b.name} width={160} height={60} className="h-10 w-auto object-contain" />
          ) : (
            <span className="font-display text-[1.7rem] leading-none font-semibold text-navy uppercase">{b.name}</span>
          )}
          <span className="label mt-4 text-steel-dark">{b.lines}</span>
        </li>
      ))}
    </ul>
  );
}
