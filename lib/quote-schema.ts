import { z } from "zod";

/** Indian mobile/landline: optional +91 / 0 prefix, then 10 digits. Spaces and dashes allowed. */
const phoneRe = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$|^(?:\+?91[\s-]?|0)?\d{2,4}[\s-]?\d{6,8}$/;

const optionalText = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters`).optional().or(z.literal(""));

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  company: optionalText(120),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number")
    .refine((v) => phoneRe.test(v.replace(/[()]/g, "")), "Enter a valid 10-digit phone number"),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address")
    .optional(),
  category: z.string().trim().min(1, "Choose a product category"),
  product: optionalText(120),
  quantity: z.string().trim().min(1, "Tell us the approximate quantity").max(80),
  unit: optionalText(20),
  brand: optionalText(80),
  grade: optionalText(80),
  size: optionalText(160),
  location: z.string().trim().min(2, "Where should we deliver?").max(120),
  deliveryDate: optionalText(20),
  message: optionalText(2000),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const quoteFieldLabels: Record<keyof Omit<QuoteInput, "website">, string> = {
  fullName: "Full name",
  company: "Company",
  phone: "Phone",
  email: "Email",
  category: "Product category",
  product: "Product",
  quantity: "Required quantity",
  unit: "Unit",
  brand: "Brand preference",
  grade: "Required grade",
  size: "Size / dimensions",
  location: "Delivery location",
  deliveryDate: "Expected delivery date",
  message: "Additional requirements",
};

/** Plain-text summary used in emails and the WhatsApp / email fallbacks. */
export function quoteSummary(data: Partial<QuoteInput>) {
  return (Object.keys(quoteFieldLabels) as (keyof typeof quoteFieldLabels)[])
    .filter((k) => data[k] && k !== "unit")
    .map((k) => `${quoteFieldLabels[k]}: ${data[k]}${k === "quantity" && data.unit ? ` ${data.unit}` : ""}`)
    .join("\n");
}

/** Fields validated on each step of the enquiry builder. */
export const quoteSteps: (keyof QuoteInput)[][] = [
  ["category", "product"],
  ["quantity", "unit", "grade", "size", "brand", "message"],
  ["fullName", "company", "phone", "email", "location", "deliveryDate"],
];
