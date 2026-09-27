import { availabilityLabel, type Availability as A } from "@/data/availability";
import { cn } from "@/lib/utils";

const dot: Record<A, string> = {
  "in-stock": "bg-success",
  available: "bg-gold",
  "on-request": "bg-steel",
};

const short: Record<A, string> = {
  "in-stock": "In stock",
  available: "Available",
  "on-request": "On request",
};

export function Availability({
  value,
  className,
  tone = "light",
  compact = false,
}: {
  value: A;
  className?: string;
  tone?: "light" | "dark";
  /** Short, un-spaced label for tight spaces such as product cards. */
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap",
        compact ? "text-[0.78rem] font-medium" : "label",
        tone === "dark" ? "text-white/80" : "text-graphite",
        className,
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", dot[value])} aria-hidden="true" />
      {compact ? short[value] : availabilityLabel[value]}
    </span>
  );
}
