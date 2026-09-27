import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { SectionHead } from "@/components/ui/SectionHead";
import { LinkButton } from "@/components/ui/Button";

/** Brands band: heading, then a single-row wordmark marquee between fine rules. */
export function Brands({ index = "08" }: { index?: string }) {
  return (
    <section aria-labelledby="brands-title" className="bg-ivory pt-14 md:pt-20">
      <div className="container-x">
        <SectionHead
          index={index}
          label="Brands we deal in"
          title={<span id="brands-title">Leading brands, one address.</span>}
          intro={
            <>
              Specify the brand your project calls for — we source across India&rsquo;s established steel makers and
              quote them side by side.
              <span className="mt-5 block">
                <LinkButton href="/brands" variant="outline">
                  Explore all brands
                </LinkButton>
              </span>
            </>
          }
        />
      </div>

      <div className="mt-10 border-y border-line bg-paper">
        <BrandMarquee />
      </div>

      <p className="container-x py-5 text-xs text-steel-dark">
        Brand names are trademarks of their respective owners. Availability varies by product and brand.
      </p>
    </section>
  );
}
