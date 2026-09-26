"use client";

import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MessageCircle, TriangleAlert } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { quoteSchema, quoteSummary, type QuoteInput } from "@/lib/quote-schema";
import { mailHref, whatsappHref } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error" | "fallback";
type Values = Record<keyof QuoteInput, string>;

const empty: Values = {
  fullName: "",
  company: "",
  phone: "",
  email: "",
  category: "",
  product: "",
  quantity: "",
  grade: "",
  size: "",
  location: "",
  deliveryDate: "",
  message: "",
  website: "",
};

export function QuoteForm({
  defaultCategory,
  defaultProduct,
  defaultMessage,
  compact = false,
}: {
  defaultCategory?: string;
  defaultProduct?: string;
  defaultMessage?: string;
  compact?: boolean;
}) {
  const initialCategory = categories.find((c) => c.slug === defaultCategory)?.name ?? "";
  const initialProduct =
    products.find((p) => p.slug === defaultProduct && (!defaultCategory || p.category === defaultCategory))?.name ?? "";
  const [values, setValues] = useState<Values>({
    ...empty,
    category: initialCategory,
    product: initialProduct,
    message: defaultMessage?.slice(0, 500) ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();

  const categoryProducts = useMemo(() => {
    const cat = categories.find((c) => c.name === values.category);
    return cat ? products.filter((p) => p.category === cat.slug) : [];
  }, [values.category]);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [key]: v, ...(key === "category" ? { product: "" } : {}) }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Values;
        next[k] ??= issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Record<string, string> };
      if (data.fieldErrors) {
        setErrors(data.fieldErrors as Partial<Record<keyof Values, string>>);
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

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-6 border border-line bg-paper p-8 sm:p-12"
      >
        <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
        <h3 className="font-display text-4xl text-navy uppercase">Thank you.</h3>
        <p className="max-w-md text-graphite/80">Our team will contact you shortly.</p>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
          className="label text-navy underline underline-offset-4"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative" aria-describedby={`${uid}-note`}>
      <div className={cn("grid gap-x-8 gap-y-7", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
        <Field id={`${uid}-fullName`} label="Full name" required error={errors.fullName}>
          <input id={`${uid}-fullName`} name="fullName" autoComplete="name" className="field" value={values.fullName} onChange={set("fullName")} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? `${uid}-fullName-err` : undefined} />
        </Field>
        <Field id={`${uid}-company`} label="Company name" error={errors.company}>
          <input id={`${uid}-company`} name="company" autoComplete="organization" className="field" value={values.company} onChange={set("company")} />
        </Field>
        <Field id={`${uid}-phone`} label="Phone number" required error={errors.phone}>
          <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" className="field" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
        </Field>
        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input id={`${uid}-email`} name="email" type="email" inputMode="email" autoComplete="email" className="field" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
        </Field>
        <Field id={`${uid}-category`} label="Product category" required error={errors.category}>
          <select id={`${uid}-category`} name="category" className="field" value={values.category} onChange={set("category")} aria-invalid={!!errors.category} aria-describedby={errors.category ? `${uid}-category-err` : undefined}>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="Other / Not sure">Other / Not sure</option>
          </select>
        </Field>
        <Field id={`${uid}-product`} label="Product" error={errors.product}>
          {categoryProducts.length ? (
            <select id={`${uid}-product`} name="product" className="field" value={values.product} onChange={set("product")}>
              <option value="">Select a product (optional)</option>
              {categoryProducts.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          ) : (
            <input id={`${uid}-product`} name="product" className="field" placeholder="e.g. MS square pipe" value={values.product} onChange={set("product")} />
          )}
        </Field>
        <Field id={`${uid}-quantity`} label="Required quantity" required error={errors.quantity}>
          <input id={`${uid}-quantity`} name="quantity" className="field" placeholder="e.g. 12 tonnes / 200 pcs" value={values.quantity} onChange={set("quantity")} aria-invalid={!!errors.quantity} aria-describedby={errors.quantity ? `${uid}-quantity-err` : undefined} />
        </Field>
        <Field id={`${uid}-grade`} label="Required grade" error={errors.grade}>
          <input id={`${uid}-grade`} name="grade" className="field" placeholder="e.g. Fe 500D, E250, IS 1239 Medium" value={values.grade} onChange={set("grade")} />
        </Field>
        <Field id={`${uid}-size`} label="Size / dimensions" error={errors.size}>
          <input id={`${uid}-size`} name="size" className="field" placeholder="e.g. 50×50×5 mm, 25 NB" value={values.size} onChange={set("size")} />
        </Field>
        <Field id={`${uid}-location`} label="Delivery location" required error={errors.location}>
          <input id={`${uid}-location`} name="location" autoComplete="address-level2" className="field" placeholder="City / site" value={values.location} onChange={set("location")} aria-invalid={!!errors.location} aria-describedby={errors.location ? `${uid}-location-err` : undefined} />
        </Field>
        <Field id={`${uid}-deliveryDate`} label="Expected delivery date" error={errors.deliveryDate}>
          <input id={`${uid}-deliveryDate`} name="deliveryDate" type="date" className="field" value={values.deliveryDate} onChange={set("deliveryDate")} />
        </Field>
        <Field id={`${uid}-message`} label="Additional requirements" error={errors.message} className={compact ? "sm:col-span-2" : "sm:col-span-2 lg:col-span-3"}>
          <textarea id={`${uid}-message`} name="message" rows={3} className="field resize-y" placeholder="Brand preference, cutting, mixed sizes, timelines…" value={values.message} onChange={set("message")} />
        </Field>

        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${uid}-note`} className="max-w-sm text-xs leading-relaxed text-steel-dark">
          Fields marked <span className="text-gold">*</span> are required. We use your details only to respond to this enquiry.
        </p>
        <Button type="submit" variant="solid" disabled={status === "submitting"} arrow={status !== "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Submitting…
            </span>
          ) : (
            "Request a Quote"
          )}
        </Button>
      </div>

      <AnimatePresence>
        {(status === "error" || status === "fallback") && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 border border-danger/30 bg-danger/5 p-6"
          >
            <p className="flex items-center gap-2 font-semibold text-danger">
              <TriangleAlert className="size-4" aria-hidden="true" />
              {status === "fallback" ? "Online submission isn’t available right now." : "We couldn’t send your request."}
            </p>
            <p className="mt-2 text-sm text-graphite/80">
              Your details are ready — send them to us directly in one tap:
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={whatsappHref(waText)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 bg-navy px-5 text-[0.7rem] font-semibold tracking-[0.18em] text-paper uppercase">
                <MessageCircle className="size-4" aria-hidden="true" /> Send via WhatsApp
              </a>
              <a href={mailHref(`Quote request — ${values.fullName}`, summary)} className="inline-flex h-11 items-center gap-2 border border-navy px-5 text-[0.7rem] font-semibold tracking-[0.18em] text-navy uppercase">
                <Mail className="size-4" aria-hidden="true" /> Send via email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label block text-steel-dark">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
