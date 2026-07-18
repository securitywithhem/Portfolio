import { z } from "zod";
import type { ContactFormInput } from "@/lib/types";

/**
 * Contact form validation — the exact schema Phase 5's form and rate-limited
 * API route will consume. Deliberately strict: this is a security boundary
 * for user-supplied input that ends up in an outbound email.
 */

/** Any HTML tag-like sequence: blocks `<script>`, `<img onerror=...>`, etc. */
const HTML_TAG = /<[^>]*>/;

/** C0 control characters except \n and \t (blocks header-injection tricks). */
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const safeText = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `Must be at least ${min} characters`)
    .max(max, `Must be at most ${max} characters`)
    .refine((v) => !HTML_TAG.test(v), {
      message: "HTML is not allowed",
    })
    .refine((v) => !CONTROL_CHARS.test(v), {
      message: "Invalid characters",
    });

export const contactFormSchema = z.object({
  name: safeText(2, 100),
  email: z.email("Enter a valid email address").max(254),
  message: safeText(10, 2000),
}) satisfies z.ZodType<ContactFormInput>;
