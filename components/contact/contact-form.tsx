"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { contactFormSchema } from "@/lib/validations/contact";
import { useContactForm } from "./use-contact-form";
import type { ContactFormInput } from "@/lib/types";

/**
 * Contact form with client-side validation via React Hook Form + Zod.
 * Submission is handled by the custom hook, which posts to /api/contact.
 *
 * Includes:
 * - Honeypot field (hidden from real users, filled by bots)
 * - Submitted timestamp for minimum-time-to-submit check
 * - Inline validation errors
 * - Loading/disabled state on submit
 * - Success/error messaging
 * - Full keyboard and screen-reader accessibility
 */
export function ContactForm() {
  const { submit, status, message, reset } = useContactForm();
  const [submittedAt] = useState(Date.now());
  const [honeypot, setHoneypot] = useState("");

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  const onSubmit = async (data: ContactFormInput) => {
    await submit({
      ...data,
      submittedAt,
      honeypot,
    });
  };

  // Reset form on successful submission.
  if (isSuccess) {
    resetForm();
    setHoneypot("");
  }

  return (
    <div className="space-y-6">
      {/* Success message */}
      {isSuccess && (
        <div
          className="rounded-lg border border-green-600/50 bg-green-50/10 p-4 text-sm text-green-700 dark:text-green-400"
          role="alert"
          aria-live="polite"
        >
          ✓ {message}
        </div>
      )}

      {/* Error message (rate limit or network) */}
      {status === "error" || status === "rate_limited" ? (
        <div
          className="rounded-lg border border-red-600/50 bg-red-50/10 p-4 text-sm text-red-700 dark:text-red-400"
          role="alert"
          aria-live="polite"
        >
          ✕ {message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field — hidden from real users, filled by bots. */}
        <input
          type="text"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        {/* Name field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            disabled={isSubmitting || isSuccess}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-sm font-medium text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            disabled={isSubmitting || isSuccess}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-sm font-medium text-destructive"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message field */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Tell me about your project, opportunity, or question..."
            disabled={isSubmitting || isSuccess}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "message-error" : "message-description"
            }
            rows={5}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...register("message")}
          />
          <p id="message-description" className="text-xs text-muted-foreground">
            2000 character limit
          </p>
          {errors.message && (
            <p
              id="message-error"
              className="text-sm font-medium text-destructive"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full sm:w-auto"
        >
          {isSubmitting
            ? "Sending..."
            : isSuccess
              ? "Message sent"
              : "Send message"}
        </Button>

        {/* Reset button (only show after success) */}
        {isSuccess && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              reset();
            }}
            className="ml-2"
          >
            Send another message
          </Button>
        )}
      </form>
    </div>
  );
}
