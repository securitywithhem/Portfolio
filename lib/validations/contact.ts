import { z } from "zod";
import type { ContactFormInput } from "@/lib/types";

/**
 * Contact-form validation — a security boundary for user input that ends up in
 * an outbound email. Deliberately strict.
 */

/** Any HTML tag-like sequence: blocks <script>, <img onerror=...>, etc. */
const HTML_TAG = /<[^>]*>/;
/**
 * C0 control chars except \n and \t (blocks header-injection tricks). Built
 * from an escaped string so the source stays free of literal control bytes
 * (which also keeps the no-control-regex lint rule happy).
 */
const CONTROL_CHARS = new RegExp(
  "[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]",
);

const safeText = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, `Must be at least ${min} characters`)
    .max(max, `Must be at most ${max} characters`)
    .refine((v) => !HTML_TAG.test(v), { message: "HTML is not allowed" })
    .refine((v) => !CONTROL_CHARS.test(v), { message: "Invalid characters" });

export const contactFormSchema = z.object({
  name: safeText(2, 100),
  email: z.string().email("Enter a valid email address").max(254),
  message: safeText(10, 2000),
}) satisfies z.ZodType<ContactFormInput>;
