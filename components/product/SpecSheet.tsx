import type { Spec } from "@/data/products";

/**
 * Technical specification sheet. Desktop: two-column engineering table.
 * Mobile: each row stacks label over value for readability.
 */
export function SpecSheet({ specs, caption }: { specs: Spec[]; caption: string }) {
  return (
    <div className="relative border border-line bg-paper">
      <div className="flex items-center justify-between border-b border-line bg-ivory px-5 py-3 sm:px-8">
        <span className="label text-navy">{caption}</span>
        <span className="label text-steel">{String(specs.length).padStart(2, "0")} parameters</span>
      </div>
      <table className="w-full text-left">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {specs.map((s, i) => (
            <tr key={s.label} className="group block border-b border-line last:border-b-0 sm:table-row">
              <th
                scope="row"
                className="block px-5 pt-5 align-top font-normal sm:table-cell sm:w-[34%] sm:px-8 sm:py-6"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.68rem] text-steel">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label text-steel-dark transition-colors group-hover:text-navy">{s.label}</span>
                </span>
              </th>
              <td className="block px-5 pt-2 pb-5 pl-[3.1rem] text-[1rem] leading-relaxed text-navy sm:table-cell sm:px-8 sm:py-6">
                {s.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
