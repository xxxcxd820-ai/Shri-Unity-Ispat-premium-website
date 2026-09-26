import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { SectionHead } from "@/components/ui/SectionHead";
import { LinkButton } from "@/components/ui/Button";

export function Brands({ index = "08" }: { index?: string }) {
  return (
    <section aria-labelledby="brands-title" className="border-y border-line bg-ivory py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          index={index}
          label="Brands we deal in"
          title={<span id="brands-title">Leading brands, one address.</span>}
          intro={
            <>
              Material from India&rsquo;s established steel makers — so you can specify the brand your project needs.
              <span className="mt-4 block">
                <LinkButton href="/brands" variant="outline" className="mt-2">
                  All brands
                </LinkButton>
              </span>
            </>
          }
        />
      </div>
      <div className="mt-16 border-y border-line bg-paper">
        <BrandMarquee />
      </div>
      <p className="container-x mt-6 text-xs text-steel-dark">
        Brand names are trademarks of their respective owners. Availability varies by product and brand.
      </p>
    </section>
  );
}
