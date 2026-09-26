import { applicationImages } from "@/data/industries";
import type { ImageKey } from "@/lib/images";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";

/** Visual application tiles. Falls back to the supplied image when an application has no mapping. */
export function ApplicationCards({ applications, fallback }: { applications: string[]; fallback: ImageKey }) {
  return (
    <ul
      className={`no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 ${
        applications.length >= 5 ? "lg:grid-cols-3 xl:grid-cols-5" : applications.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {applications.map((a, i) => (
        <li key={a} className="w-[70%] shrink-0 snap-start sm:w-auto">
          <Reveal delay={i * 0.05}>
            <div className="group relative aspect-[3/4] overflow-hidden bg-navy">
              <Img
                k={applicationImages[a] ?? fallback}
                fill
                sizes="(min-width:1280px) 20vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 70vw"
                className="object-cover opacity-90 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="label text-gold-soft">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-display text-2xl leading-tight uppercase">{a}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
