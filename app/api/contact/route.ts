import { NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { contactFormSchema } from "@/lib/validations/contact";
import { checkRateLimit, formatTimeUntilReset } from "@/lib/rate-limit";

/**
 * POST /api/contact
 *
 * Contact form submission endpoint. Server-side re-validates input,
 * sanitizes, checks rate limits, and sends via Resend.
 *
 * Returns JSON with explicit status: "success" | "error" | "validation_error" | "rate_limited"
 * so the client can branch on the outcome and show appropriate messaging.
 */

/**
 * Expected client payload. Note: honeypot and submittedAt are sent by the
 * client but NOT included in the validated contactFormSchema — they're
 * checked separately before validation.
 */
interface ContactRequest {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Should be empty; filled by bots
  submittedAt?: number; // Timestamp when form was submitted (client-side)
}

export async function POST(request: NextRequest) {
  // Extract client IP for rate limiting. Vercel provides x-forwarded-for.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 1. Check rate limit early (cheap operation, fail fast).
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

  // 2. Parse request body.
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

  // 3. Check honeypot (should be empty).
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    // Silently reject; don't leak that we detected a bot.
    return NextResponse.json(
      { status: "success", message: "Thank you! We'll be in touch soon." },
      { status: 200 },
    );
  }

  // 4. Check minimum time to submit (should take at least 1 second to fill the form).
  if (payload.submittedAt) {
    const submitTimeMs = Date.now() - payload.submittedAt;
    if (submitTimeMs < 1000) {
      // Likely a bot; silently reject.
      return NextResponse.json(
        { status: "success", message: "Thank you! We'll be in touch soon." },
        { status: 200 },
      );
    }
  }

  // 5. Validate input against the shared schema.
  const validationResult = contactFormSchema.safeParse({
    name: payload.name,
    email: payload.email,
    message: payload.message,
  });

  if (!validationResult.success) {
    return NextResponse.json(
      {
        status: "validation_error",
        errors: validationResult.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, message } = validationResult.data;

  // 6. Send via Resend.
  try {
    // Dynamic import to avoid loading Resend at module initialization time
    // (which fails during static generation if RESEND_API_KEY is not set).
    const { Resend: ResendClient } = await import("resend");
    const resend = new ResendClient(env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Use Resend's default sender; configure your domain for production.
      to: env.NEXT_PUBLIC_SITE_URL
        ? new URL("/", env.NEXT_PUBLIC_SITE_URL).hostname // Extract domain from site URL
        : "contact@example.com", // Fallback for development
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre>${escapeHtml(message)}</pre>
      `,
    });

    if (result.error) {
      console.error("Resend API error:", result.error);
      return NextResponse.json(
        {
          status: "error",
          error: "Failed to send email. Please try again later.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message:
          "Thank you! I've received your message and will get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        status: "error",
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}

/**
 * Escape HTML entities to prevent injection into the email body.
 * The schema validates against HTML tags client- and server-side, but
 * this adds a defense-in-depth layer for email safety.
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}
