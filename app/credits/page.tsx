import type { Metadata } from "next";
import { images } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Image Credits",
    description: "Sources and licences for photography used on the Shri Unity Ispat website.",
    path: "/credits",
  }),
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  const list = Object.entries(images);
  return (
    <section className="bg-paper pt-[calc(var(--header-h)+4rem)] pb-24">
      <div className="container-x">
        <p className="eyebrow text-gold">Credits</p>
        <h1 className="mt-4 font-display text-[length:var(--text-title)] leading-none text-navy uppercase">Image credits</h1>
        <p className="mt-6 max-w-2xl text-graphite/80">
          Photography on this site is sourced from Unsplash (Unsplash License) and Wikimedia Commons (licences as
          listed). Images are used to illustrate product families and applications.
        </p>
        <div className="mt-10 overflow-x-auto border border-line">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-ivory">
              <tr>
                {["Image", "Source", "Author", "Licence"].map((h) => (
                  <th key={h} scope="col" className="label px-4 py-3 font-normal text-steel-dark">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(([key, img]) => (
                <tr key={key} className="border-t border-line">
                  <td className="px-4 py-3 text-navy">{img.alt}</td>
                  <td className="px-4 py-3">
                    <a href={img.source.url} target="_blank" rel="noopener noreferrer" className="text-navy underline underline-offset-2">
                      {img.source.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-graphite">{"author" in img.source ? img.source.author : "—"}</td>
                  <td className="px-4 py-3 text-graphite">{img.source.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
