import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Arrow } from "./Arrow";
import { Magnetic } from "./Magnetic";

type Variant = "solid" | "gold" | "outline" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  solid: "bg-navy text-paper hover:bg-navy-2",
  gold: "bg-gold text-white hover:bg-[#735820]",
  outline: "border border-ink/25 text-ink hover:border-navy hover:bg-navy hover:text-paper",
  light: "bg-paper text-navy hover:bg-white",
  "outline-light": "border border-white/45 text-white hover:bg-white hover:text-navy",
};

const base =
  "group relative inline-flex h-12 items-center justify-center gap-3 px-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-[background-color,color,border-color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-60 sm:h-[3.25rem] sm:px-7";

type Common = {
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

export function LinkButton({
  variant = "solid",
  arrow = true,
  magnetic = false,
  className,
  children,
  href,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  const h = String(href);
  const isExternal = /^(https?:|mailto:|tel:)/.test(h);
  const isWeb = h.startsWith("http");
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow direction={isWeb ? "up-right" : "right"} />}
    </>
  );
  const cls = cn(base, styles[variant], className);
  const el = isExternal ? (
    <a
      href={h}
      className={cls}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(rest as ComponentProps<"a">)}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function Button({
  variant = "solid",
  arrow = true,
  className,
  children,
  ...rest
}: Omit<Common, "magnetic"> & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, styles[variant], className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
