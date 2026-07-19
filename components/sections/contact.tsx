"use client";

import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/**
 * Contact form. Client validation is native (required / type / length) to keep
 * the client bundle light — the authoritative validation + sanitization lives
 * in the server route (lib/validations/contact via /api/contact). Field-level
 * server errors are surfaced back inline. Honeypot + timing trap deter bots.
 */
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const fieldClass =
  "w-full rounded-[2px] border border-line-strong bg-surface px-3 py-2.5 text-sm text-fg placeholder:text-fg-dim focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const mountedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "submitting" });
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          honeypot: honeypot.current?.value ?? "",
          submittedAt: mountedAt.current,
        }),
      });
      const body = (await res.json()) as {
        status: string;
        message?: string;
        error?: string;
        retryAfter?: string;
        errors?: Record<string, string[]>;
      };

      if (body.status === "success") {
        setStatus({
          kind: "success",
          message: body.message ?? "Thanks — your message is on its way.",
        });
        form.reset();
      } else if (body.status === "validation_error" && body.errors) {
        setErrors({
          name: body.errors.name?.[0],
          email: body.errors.email?.[0],
          message: body.errors.message?.[0],
        });
        setStatus({
          kind: "error",
          message: "Please fix the highlighted fields.",
        });
      } else if (body.status === "rate_limited") {
        setStatus({
          kind: "error",
          message: `${body.error} Try again in ${body.retryAfter}.`,
        });
      } else {
        setStatus({
          kind: "error",
          message: body.error ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-line py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="label-mono mb-3 flex items-center gap-3">
            <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
            CONTACT
          </p>
          <h2
            id="contact-title"
            className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl"
          >
            Let&apos;s build the guardrails.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
            Open to GRC and AI-security roles. Send a message, or reach me
            directly.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block text-sm text-fg transition-colors hover:text-accent"
          >
            {profile.email}
          </a>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono transition-colors hover:text-fg"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-5">
          {/* Honeypot — off-screen, hidden from assistive tech; bots fill it. */}
          <div aria-hidden className="absolute left-[-9999px]">
            <label>
              Leave this field empty
              <input
                ref={honeypot}
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div>
            <label htmlFor="name" className="label-mono mb-2 block">
              NAME
            </label>
            <input
              id="name"
              name="name"
              required
              minLength={2}
              maxLength={100}
              className={fieldClass}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="label-mono mb-2 block">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              className={fieldClass}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="label-mono mb-2 block">
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              className={cn(fieldClass, "resize-y")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-sm text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status.kind === "submitting"}
            className={cn(buttonVariants({ variant: "primary", size: "md" }))}
          >
            {status.kind === "submitting" ? "Sending…" : "Send message"}
          </button>

          <p
            aria-live="polite"
            className={cn(
              "text-sm",
              status.kind === "success" && "text-accent",
              status.kind === "error" && "text-destructive",
            )}
          >
            {status.kind === "success" || status.kind === "error"
              ? status.message
              : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
