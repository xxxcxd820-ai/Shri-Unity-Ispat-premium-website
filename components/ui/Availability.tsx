import { availabilityLabel, type Availability as A } from "@/data/products";
import { cn } from "@/lib/utils";

const dot: Record<A, string> = {
  "in-stock": "bg-success",
  available: "bg-gold",
  "on-request": "bg-steel",
};

export function Availability({
  value,
  className,
  tone = "light",
}: {
  value: A;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn("label inline-flex items-center gap-2", tone === "dark" ? "text-white/80" : "text-graphite", className)}
    >
      <span className={cn("size-1.5 rounded-full", dot[value])} aria-hidden="true" />
      {availabilityLabel[value]}
    </span>
  );
}
