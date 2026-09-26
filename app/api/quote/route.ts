import { NextResponse } from "next/server";
import { quoteSchema, quoteSummary, type QuoteInput } from "@/lib/quote-schema";
import { site } from "@/lib/site";

/**
 * Quote request endpoint.
 *
 * Delivery providers, tried in order (configure via environment variables):
 *   1. Resend    — RESEND_API_KEY, QUOTE_FROM_EMAIL (verified sender), QUOTE_TO_EMAIL (defaults to the business email)
 *   2. Formspree — FORMSPREE_ENDPOINT (e.g. https://formspree.io/f/xxxxxxx)
 *
 * With neither configured the endpoint responds 503 { error: "not_configured" },
 * and the form offers WhatsApp / email hand-off so no enquiry is lost.
 */

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendWithResend(data: QuoteInput) {
  const to = process.env.QUOTE_TO_EMAIL || site.email;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!from) throw new Error("QUOTE_FROM_EMAIL is not set");
  const text = quoteSummary(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email || undefined,
      subject: `Quote request — ${data.category}${data.product ? ` / ${data.product}` : ""} — ${data.fullName}`,
      text,
      html: `<h2 style="font-family:Georgia,serif">New quote request</h2><pre style="font:14px/1.6 system-ui,sans-serif;white-space:pre-wrap">${escape(text)}</pre>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

async function sendWithFormspree(data: QuoteInput) {
  const res = await fetch(process.env.FORMSPREE_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...data, _subject: `Quote request — ${data.fullName}` }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ error: "validation", fieldErrors }, { status: 422 });
  }

  const data = parsed.data;
  // Silently accept honeypot submissions without sending anything.
  if (data.website) return NextResponse.json({ ok: true });

  try {
    if (process.env.RESEND_API_KEY) {
      await sendWithResend(data);
    } else if (process.env.FORMSPREE_ENDPOINT) {
      await sendWithFormspree(data);
    } else {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
  } catch (err) {
    console.error("[quote] delivery failed:", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
