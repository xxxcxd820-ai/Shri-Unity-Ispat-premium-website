import { cn } from "@/lib/utils";

/** Two-arrow slide: on group hover the arrow exits and a fresh one slides in. */
export function Arrow({ className, direction = "right" }: { className?: string; direction?: "right" | "up-right" }) {
  const path = direction === "right" ? "M1 8h13m0 0L8.5 2.5M14 8l-5.5 5.5" : "M3 13L13 3m0 0H5m8 0v8";
  return (
    <span className={cn("relative inline-flex size-4 shrink-0 overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="absolute inset-0 size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[140%]"
      >
        <path d={path} />
      </svg>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="absolute inset-0 size-4 -translate-x-[140%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
      >
        <path d={path} />
      </svg>
    </span>
  );
}
