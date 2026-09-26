import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

type Props = {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "split" | "stack";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
};

/** Section header: indexed label, editorial title and optional supporting copy. */
export function SectionHead({
  index,
  label,
  title,
  intro,
  tone = "light",
  align = "split",
  className,
  titleClassName,
  as = "h2",
}: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("grid gap-8", align === "split" && "lg:grid-cols-12 lg:items-end", className)}>
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <div className={cn("mb-6 flex items-center gap-4", dark ? "text-white/60" : "text-steel-dark")}>
          {index && <span className="label text-gold">{index}</span>}
          <span className={cn("h-px w-10", dark ? "bg-white/30" : "bg-ink/20")} aria-hidden="true" />
          <span className="label">{label}</span>
        </div>
        <SplitHeading
          as={as}
          className={cn(
            "font-display text-[length:var(--text-title)] leading-[0.98] uppercase",
            dark ? "text-white" : "text-navy",
            titleClassName,
          )}
        >
          {title}
        </SplitHeading>
      </div>
      {intro && (
        <Reveal
          delay={0.15}
          className={cn(
            "max-w-xl text-[0.98rem] leading-relaxed",
            align === "split" && "lg:col-span-5 lg:justify-self-end",
            dark ? "text-white/70" : "text-graphite/80",
          )}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
