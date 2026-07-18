import { useState, useCallback } from "react";
import { contactFormSchema } from "@/lib/validations/contact";
import type { ContactFormInput } from "@/lib/types";

/**
 * API response types — matches the server route's responses.
 */
export type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "rate_limited"
  | "validation_error";

export interface ApiResponse {
  status: SubmissionStatus;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  retryAfter?: string;
}

export interface UseContactFormReturn {
  status: SubmissionStatus;
  errors: Record<string, string[]>;
  message: string | null;
  isSubmitting: boolean;
  submit: (
    data: ContactFormInput & { honeypot?: string; submittedAt?: number },
  ) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for contact form logic: client-side validation,
 * submission, and state management.
 */
export function useContactForm(): UseContactFormReturn {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string | null>(null);

  const submit = useCallback(
    async (
      data: ContactFormInput & { honeypot?: string; submittedAt?: number },
    ) => {
      // Clear previous state.
      setErrors({});
      setMessage(null);
      setStatus("submitting");

      // Client-side validation (UX benefit; server will re-validate).
      const validationResult = contactFormSchema.safeParse({
        name: data.name,
        email: data.email,
        message: data.message,
      });

      if (!validationResult.success) {
        setErrors(validationResult.error.flatten().fieldErrors);
        setStatus("validation_error");
        return;
      }

      // Submit to server.
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            honeypot: data.honeypot,
            submittedAt: data.submittedAt,
          }),
        });

        const result = (await response.json()) as ApiResponse;

        if (result.status === "success") {
          setMessage(result.message || "Thank you! We'll be in touch soon.");
          setStatus("success");
        } else if (result.status === "rate_limited") {
          setMessage(
            `Too many submissions. Please try again ${result.retryAfter || "later"}.`,
          );
          setStatus("rate_limited");
        } else if (result.status === "validation_error") {
          setErrors(result.errors || {});
          setStatus("validation_error");
        } else {
          setMessage(result.error || "Something went wrong. Please try again.");
          setStatus("error");
        }
      } catch (error) {
        console.error("Contact form submission error:", error);
        setMessage("Network error. Please try again.");
        setStatus("error");
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setErrors({});
    setMessage(null);
  }, []);

  return {
    status,
    errors,
    message,
    isSubmitting: status === "submitting",
    submit,
    reset,
  };
}
