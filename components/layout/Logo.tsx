import { cn } from "@/lib/utils";

/** I-beam cross-section mark + wordmark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9 shrink-0", className)} aria-hidden="true">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 10h20v4.2h-7.6v11.6H30V30H10v-4.2h7.6V14.2H10z" fill="currentColor" />
      <path d="M10 33.5h20" stroke="#b08a3e" strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.28rem] font-semibold tracking-[0.06em] uppercase">Shri Unity Ispat</span>
        {!compact && (
          <span className="mt-1 text-[0.56rem] font-semibold tracking-[0.3em] uppercase opacity-70">
            Iron &amp; Steel — The Complete Solution
          </span>
        )}
      </span>
    </span>
  );
}
