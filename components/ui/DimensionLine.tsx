import { cn } from "@/lib/utils";

/** Engineering dimension line with end ticks and a centred measurement label. */
export function DimensionLine({
  label,
  className,
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn("flex items-center gap-3", tone === "dark" ? "text-white/50" : "text-steel", className)}
      aria-hidden="true"
    >
      <span className="h-3 w-px bg-current" />
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="label whitespace-nowrap">{label}</span>
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="h-3 w-px bg-current" />
    </div>
  );
}
