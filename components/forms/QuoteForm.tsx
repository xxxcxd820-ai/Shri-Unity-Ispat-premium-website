"use client";

import { useId, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Check, Loader2, Mail, MessageCircle, Phone, TriangleAlert } from "lucide-react";
import type { QuoteOptions } from "@/lib/quote-options";
import { quoteSchema, quoteSteps, quoteSummary, type QuoteInput } from "@/lib/quote-schema";
import { mailHref, site, telHref, whatsappHref } from "@/lib/site";
import { Img } from "@/components/ui/Img";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error" | "fallback";
type Values = Record<keyof QuoteInput, string>;
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  fullName: "",
  company: "",
  phone: "",
  email: "",
  category: "",
  product: "",
  quantity: "",
  unit: "Tonnes",
  brand: "",
  grade: "",
  size: "",
  location: "",
  deliveryDate: "",
  message: "",
  website: "",
};

const STEPS = [
  { title: "Product", hint: "What do you need?" },
  { title: "Specification", hint: "Quantity, grade & size" },
  { title: "Delivery & contact", hint: "Where and who" },
];
const UNITS = ["Tonnes", "Pieces", "Bundles", "Metres"];

/**
 * Three-step enquiry builder with a live summary rail.
 * Validation runs per step; the final step posts to /api/quote and, if online
 * delivery is unavailable, hands the prefilled enquiry to WhatsApp or email.
 */
export function QuoteForm({
  options,
  defaultCategory,
  defaultProduct,
  defaultMessage,
  headingLevel = "h3",
}: {
  options: QuoteOptions;
  defaultCategory?: string;
  defaultProduct?: string;
  defaultMessage?: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const { categories } = options;
  const initialCategory = categories.find((c) => c.slug === defaultCategory)?.name ?? "";
  const initialProduct =
    (defaultCategory ? options.products[defaultCategory] ?? [] : Object.values(options.products).flat()).find((p) => p.slug === defaultProduct)?.name ?? "";
  const [values, setValues] = useState<Values>({
    ...empty,
    category: initialCategory,
    product: initialProduct,
    message: defaultMessage?.slice(0, 500) ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(initialCategory ? (initialProduct ? 1 : 0) : 0);
  const [dir, setDir] = useState(1);
  const uid = useId();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  const cat = categories.find((c) => c.name === values.category);
  const catProducts = useMemo(() => (cat ? options.products[cat.slug] ?? [] : []), [cat, options.products]);
  const selectedProduct = catProducts.find((p) => p.name === values.product);
  const catBrands = cat ? options.brands[cat.slug] ?? [] : [];
  const gradeHints = selectedProduct?.grades ?? [];

  const set = (key: keyof Values, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v, ...(key === "category" && v !== prev.category ? { product: "", brand: "", grade: "" } : {}) }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };
  const field = (key: keyof Values) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    error: errors[key],
    onChange: (v: string) => set(key, v),
  });

  const errorsFor = (fields: (keyof Values)[]) => {
    const parsed = quoteSchema.safeParse(values);
    const next: Errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Values;
        if (fields.includes(k)) next[k] ??= issue.message;
      }
    }
    return next;
  };

  const goTo = (target: number) => {
    setDir(target > step ? 1 : -1);
    setStep(target);
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }));
  };

  const next = () => {
    const errs = errorsFor(quoteSteps[step]);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    goTo(step + 1);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    const all = errorsFor(quoteSteps.flat());
    if (Object.keys(all).length) {
      setErrors(all);
      const firstStep = quoteSteps.findIndex((s) => s.some((k) => all[k]));
      if (firstStep !== step) goTo(firstStep);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteSchema.parse(values)),
      });
      if (res.ok) return setStatus("success");
      const data = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Errors };
      if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        setStatus("idle");
        return;
      }
      setStatus(data.error === "not_configured" ? "fallback" : "error");
    } catch {
      setStatus("error");
    }
  };

  const summary = quoteSummary(values);
  const waText = `Hello Shri Unity Ispat, I would like a quote.\n\n${summary}`;
  const progress = status === "success" ? 1 : (step + 1) / STEPS.length;

  const summaryRows = [
    { k: "Category", v: values.category },
    { k: "Product", v: values.product },
    { k: "Quantity", v: values.quantity && `${values.quantity} ${values.unit}` },
    { k: "Grade", v: values.grade },
    { k: "Size", v: values.size },
    { k: "Brand", v: values.brand },
    { k: "Deliver to", v: values.location },
  ];

  return (
    <div className="grid overflow-hidden border border-line bg-paper shadow-[0_40px_80px_-40px_rgb(15_29_49/0.35)] lg:grid-cols-[19rem_1fr] xl:grid-cols-[22rem_1fr]">
      {/* Rail */}
      <aside className="relative overflow-hidden bg-navy text-white">
        <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative flex h-full flex-col p-5 sm:p-8">
          <p className="label text-gold-soft">Enquiry builder</p>

          {/* Steps */}
          <ol className="mt-5 grid grid-cols-3 gap-2 lg:mt-8 lg:grid-cols-1 lg:gap-0">
            {STEPS.map((s, i) => {
              const done = i < step || status === "success";
              const active = i === step && status !== "success";
              return (
                <li key={s.title} className="lg:border-b lg:border-white/10 lg:last:border-b-0">
                  <button
                    type="button"
                    disabled={i > step || status === "success"}
                    onClick={() => goTo(i)}
                    className="flex w-full items-center gap-3 py-2 text-left disabled:cursor-default lg:py-4"
                    aria-current={active ? "step" : undefined}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center border font-mono text-[0.7rem] transition-colors duration-500",
                        done ? "border-gold-soft bg-gold-soft text-navy" : active ? "border-white text-white" : "border-white/25 text-white/40",
                      )}
                    >
                      {done ? <Check className="size-3.5" aria-hidden="true" /> : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block min-w-0">
                      <span className={cn("block truncate text-[0.58rem] font-semibold tracking-[0.12em] uppercase sm:text-[0.72rem] sm:tracking-[0.14em]", active || done ? "text-white" : "text-white/45")}>
                        {s.title}
                      </span>
                      <span className="hidden text-xs text-white/45 lg:block">{s.hint}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 h-px bg-white/10 lg:mt-6">
            <m.div className="h-px origin-left bg-gold-soft" animate={{ scaleX: progress }} transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }} />
          </div>

          {/* Live summary */}
          <div className="mt-8 hidden lg:block">
            <p className="label text-white/50">Your enquiry</p>
            <dl className="mt-4 space-y-3">
              {summaryRows.map((r) => (
                <div key={r.k} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                  <dt className="label pt-0.5 text-white/40">{r.k}</dt>
                  <dd className={cn("transition-colors", r.v ? "text-white" : "text-white/25")}>{r.v || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-auto hidden space-y-2 border-t border-white/10 pt-6 lg:block">
            <p className="label mb-3 text-white/50">Prefer to talk?</p>
            {site.phones.map((p) => (
              <a key={p.e164} href={telHref(p.e164)} className="flex items-center gap-3 font-display text-xl text-white/85 hover:text-white">
                <Phone className="size-4 text-gold-soft" aria-hidden="true" />
                {p.display}
              </a>
            ))}
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-display text-xl text-white/85 hover:text-white">
              <MessageCircle className="size-4 text-gold-soft" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </aside>

      {/* Panel */}
      <div ref={panelRef} className="relative min-w-0 scroll-mt-28 p-5 sm:p-10 xl:p-12">
        {status === "success" ? (
          <Success summaryRows={summaryRows} waText={waText} onReset={() => { setValues(empty); setStep(0); setStatus("idle"); }} />
        ) : (
          <form onSubmit={onSubmit} noValidate aria-describedby={`${uid}-note`}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="label text-steel-dark">
                Step {step + 1} of {STEPS.length}
              </p>
              <p className="label text-gold">{STEPS[step].title}</p>
            </div>
            <Heading className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1] text-navy uppercase">{STEPS[step].hint}</Heading>

            <div className="relative mt-8 min-h-[22rem]">
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <m.div
                  key={step}
                  custom={dir}
                  initial={reduce ? false : { opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 0 && (
                    <div>
                      <fieldset>
                        <legend className="label mb-4 text-steel-dark">
                          Product category <span className="text-gold">*</span>
                        </legend>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4" role="radiogroup" aria-label="Product category">
                          {categories.map((c) => {
                            const on = values.category === c.name;
                            return (
                              <button
                                key={c.slug}
                                type="button"
                                role="radio"
                                aria-checked={on}
                                id={c === categories[0] ? `${uid}-category` : undefined}
                                onClick={() => set("category", c.name)}
                                className={cn(
                                  "group relative flex h-24 overflow-hidden border text-left transition-all duration-300 sm:h-28",
                                  on ? "border-navy ring-1 ring-navy" : "border-line hover:border-steel",
                                )}
                              >
                                <Img k={c.image} fill sizes="200px" quality={60} className={cn("object-cover transition-transform duration-700 group-hover:scale-110", on ? "opacity-100" : "opacity-80")} />
                                <span className={cn("absolute inset-0 transition-colors", on ? "bg-navy/70" : "bg-gradient-to-t from-navy/90 to-navy/10")} />
                                <span className="relative mt-auto p-3 text-[0.7rem] leading-tight font-semibold tracking-[0.08em] text-white uppercase sm:text-xs">
                                  {c.name}
                                </span>
                                {on && (
                                  <span className="absolute top-2 right-2 flex size-6 items-center justify-center bg-gold text-white">
                                    <Check className="size-3.5" aria-hidden="true" />
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {errors.category && <p className="mt-3 text-xs text-danger">{errors.category}</p>}
                      </fieldset>

                      <AnimatePresence>
                        {cat && (
                          <m.fieldset
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-8 overflow-hidden"
                          >
                            <legend className="label mb-4 text-steel-dark">Product (optional)</legend>
                            <Chips options={catProducts.map((p) => p.name)} value={values.product} onChange={(v) => set("product", v)} />
                            <FloatField {...field("product")} label="Or type the product you need" className="mt-5" />
                          </m.fieldset>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <div className="grid grid-cols-[1fr_auto] items-end gap-4">
                          <FloatField {...field("quantity")} label="Required quantity" required inputMode="decimal" />
                          <div role="radiogroup" aria-label="Unit" className="flex border border-line">
                            {UNITS.map((u) => (
                              <button
                                key={u}
                                type="button"
                                role="radio"
                                aria-checked={values.unit === u}
                                onClick={() => set("unit", u)}
                                className={cn(
                                  "px-2.5 py-2.5 text-[0.62rem] font-semibold tracking-[0.1em] uppercase transition-colors sm:px-3.5 sm:text-[0.68rem]",
                                  values.unit === u ? "bg-navy text-white" : "text-graphite hover:bg-ivory",
                                )}
                              >
                                {u}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <FloatField {...field("grade")} label="Required grade" />
                        {gradeHints.length > 0 && (
                          <div className="mt-3">
                            <Chips small options={gradeHints} value={values.grade} onChange={(v) => set("grade", v)} />
                          </div>
                        )}
                      </div>
                      <FloatField {...field("size")} label="Size / dimensions" hint="e.g. 50×50×5 mm, 25 NB, 12 mm" />
                      {catBrands.length > 0 && (
                        <fieldset className="sm:col-span-2">
                          <legend className="label mb-3 text-steel-dark">Brand preference</legend>
                          <Chips options={["Any brand", ...catBrands]} value={values.brand} onChange={(v) => set("brand", v)} />
                        </fieldset>
                      )}
                      <FloatField {...field("message")} label="Additional requirements" textarea className="sm:col-span-2" hint="Mixed sizes, cutting, documentation, timelines…" />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                      <FloatField {...field("fullName")} label="Full name" required autoComplete="name" />
                      <FloatField {...field("company")} label="Company name" autoComplete="organization" />
                      <FloatField {...field("phone")} label="Phone number" required type="tel" inputMode="tel" autoComplete="tel" />
                      <FloatField {...field("email")} label="Email" type="email" inputMode="email" autoComplete="email" />
                      <FloatField {...field("location")} label="Delivery location" required autoComplete="address-level2" />
                      <FloatField {...field("deliveryDate")} label="Expected delivery date" type="date" />
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </div>

            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor={`${uid}-website`}>Website</label>
              <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
            </div>

            <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p id={`${uid}-note`} className="max-w-xs text-xs leading-relaxed text-steel-dark">
                <span className="text-gold">*</span> Required. Your details are used only to respond to this enquiry.
              </p>
              <div className="flex gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="h-12 border border-line px-5 text-[0.7rem] font-semibold tracking-[0.18em] text-navy uppercase transition-colors hover:border-navy sm:h-13"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative inline-flex h-12 flex-1 items-center justify-center gap-3 overflow-hidden bg-navy px-7 text-[0.7rem] font-semibold tracking-[0.2em] text-paper uppercase transition-colors disabled:opacity-70 sm:h-13 sm:flex-none"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" aria-hidden="true" />
                  <span className="relative flex items-center gap-3">
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Submitting…
                      </>
                    ) : step < STEPS.length - 1 ? (
                      <>
                        Continue <Arrow />
                      </>
                    ) : (
                      <>
                        Request a Quote <Arrow />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {(status === "error" || status === "fallback") && (
                <m.div role="alert" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 border border-danger/25 bg-danger/5 p-5 sm:p-6">
                  <p className="flex items-center gap-2 font-semibold text-danger">
                    <TriangleAlert className="size-4" aria-hidden="true" />
                    {status === "fallback" ? "Online submission isn’t available right now." : "We couldn’t send your request."}
                  </p>
                  <p className="mt-2 text-sm text-graphite/80">Your details are ready — send them to us directly in one tap:</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={whatsappHref(waText)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 bg-navy px-5 text-[0.7rem] font-semibold tracking-[0.18em] text-paper uppercase">
                      <MessageCircle className="size-4" aria-hidden="true" /> Send via WhatsApp
                    </a>
                    <a href={mailHref(`Quote request — ${values.fullName}`, summary)} className="inline-flex h-11 items-center gap-2 border border-navy px-5 text-[0.7rem] font-semibold tracking-[0.18em] text-navy uppercase">
                      <Mail className="size-4" aria-hidden="true" /> Send via email
                    </a>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- parts */

function Chips({ options, value, onChange, small }: { options: string[]; value: string; onChange: (v: string) => void; small?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? "" : o)}
            className={cn(
              "border transition-colors duration-300",
              small ? "px-2.5 py-1 text-[0.72rem]" : "px-3.5 py-2 text-sm",
              on ? "border-navy bg-navy text-white" : "border-line text-graphite hover:border-navy hover:text-navy",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

type FloatProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  hint?: string;
  textarea?: boolean;
  className?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "decimal" | "numeric";
  autoComplete?: string;
};

/** Input with a label that floats above once focused or filled, and an animated underline. */
function FloatField({ id, name, label, value, onChange, error, required, hint, textarea, className, type = "text", inputMode, autoComplete }: FloatProps) {
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  const common = {
    id,
    name,
    value,
    placeholder: " ",
    "aria-invalid": !!error,
    "aria-required": required || undefined,
    "aria-describedby": describedBy,
    className: cn(
      "peer block w-full rounded-none border-0 border-b bg-transparent px-0 pt-6 pb-2 text-[1rem] text-navy outline-none transition-colors placeholder:text-transparent",
      error ? "border-danger" : "border-line-strong hover:border-steel",
      type === "date" && "min-h-[3.25rem]",
    ),
  };
  return (
    <div className={cn("relative", className)}>
      {textarea ? (
        <textarea {...common} rows={3} onChange={(e) => onChange(e.target.value)} className={cn(common.className, "resize-y")} />
      ) : (
        <input {...common} type={type} inputMode={inputMode} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute top-0 left-0 origin-left translate-y-0 text-[0.66rem] font-semibold tracking-[0.18em] uppercase transition-all duration-300",
          "peer-placeholder-shown:translate-y-[1.45rem] peer-placeholder-shown:text-[0.95rem] peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case",
          "peer-focus:translate-y-0 peer-focus:text-[0.66rem] peer-focus:font-semibold peer-focus:tracking-[0.18em] peer-focus:uppercase",
          type === "date" && "!translate-y-0 !text-[0.66rem] !font-semibold !tracking-[0.18em] !uppercase",
          error ? "text-danger" : "text-steel-dark peer-focus:text-navy",
        )}
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-navy transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] peer-focus:scale-x-100" aria-hidden="true" />
      {error ? (
        <p id={`${id}-err`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-2 text-xs text-steel">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function Success({ summaryRows, waText, onReset }: { summaryRows: { k: string; v: string }[]; waText: string; onReset: () => void }) {
  return (
    <m.div role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[26rem] flex-col justify-center">
      <svg viewBox="0 0 52 52" className="size-16 text-success" aria-hidden="true">
        <m.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
        <m.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
      </svg>
      <h3 className="mt-8 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-navy uppercase">Thank you.</h3>
      <p className="mt-4 max-w-md text-graphite/80">Our team will contact you shortly.</p>
      <dl className="mt-8 grid max-w-lg gap-2 border-t border-line pt-6 text-sm">
        {summaryRows
          .filter((r) => r.v)
          .map((r) => (
            <div key={r.k} className="grid grid-cols-[6.5rem_1fr] gap-3">
              <dt className="label pt-0.5 text-steel-dark">{r.k}</dt>
              <dd className="text-navy">{r.v}</dd>
            </div>
          ))}
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={whatsappHref(waText)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 bg-navy px-5 text-[0.7rem] font-semibold tracking-[0.18em] text-paper uppercase">
          <MessageCircle className="size-4" aria-hidden="true" /> Follow up on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="h-11 border border-line px-5 text-[0.7rem] font-semibold tracking-[0.18em] text-navy uppercase hover:border-navy">
          New request
        </button>
      </div>
    </m.div>
  );
}
