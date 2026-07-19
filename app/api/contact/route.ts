import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { profile } from "@/data/profile";
import { contactFormSchema } from "@/lib/validations/contact";
import { checkRateLimit, formatTimeUntilReset } from "@/lib/rate-limit";

/**
 * POST /api/contact — server-side re-validation, sanitization, bot traps, IP
 * rate limiting, then Resend delivery. Returns a typed status the client
 * branches on. Never trusts client-side validation.
 */
interface ContactRequest {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  submittedAt?: number;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 1. Rate limit first (cheap, fail fast).
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        status: "rate_limited",
        error: "Too many submissions. Please try again later.",
        retryAfter: formatTimeUntilReset(rateLimit.resetAt),
      },
      { status: 429 },
    );
  }

  // 2. Parse body.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", error: "Invalid request body" },
      { status: 400 },
    );
  }
  const payload = body as ContactRequest;

  // 3. Honeypot — silently accept (don't reveal detection).
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return NextResponse.json({ status: "success" }, { status: 200 });
  }

  // 4. Timing trap — forms filled in <1s are almost certainly bots.
  if (payload.submittedAt && Date.now() - payload.submittedAt < 1000) {
    return NextResponse.json({ status: "success" }, { status: 200 });
  }

  // 5. Validate against the shared strict schema.
  const result = contactFormSchema.safeParse({
    name: payload.name,
    email: payload.email,
    message: payload.message,
  });
  if (!result.success) {
    return NextResponse.json(
      {
        status: "validation_error",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const { name, email, message } = result.data;

  // 6. Delivery. If Resend isn't configured, fail clearly (don't pretend).
  if (!env.RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { status: "error", error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  try {
    // Dynamic import so the module isn't loaded during static generation.
    const { Resend } = await import("resend");
    const resend = new Resend(env.RESEND_API_KEY);
    const sent = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: profile.email,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre>${escapeHtml(message)}</pre>
      `,
    });

    if (sent.error) {
      console.error("Resend API error:", sent.error);
      return NextResponse.json(
        { status: "error", error: "Failed to send. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Thanks — your message is on its way. I'll reply soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { status: "error", error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

/** Escape HTML entities — defense-in-depth for the outbound email body. */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char);
}
