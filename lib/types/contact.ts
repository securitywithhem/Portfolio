/**
 * Contact form payload (Backend Schema: Contact).
 * Validated at runtime by lib/validations/contact.ts before the Phase 5
 * API route forwards it to Resend/EmailJS — the schema is the security
 * boundary, so it lives with the other entity contracts.
 */
export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}
