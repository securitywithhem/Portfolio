import { z } from "zod";

/**
 * Typed, validated access to environment variables.
 *
 * Components and API routes must import `env` from this module instead of
 * reading `process.env` directly. Adding a variable means adding it to the
 * schema here AND to `.env.local.example` — never commit real values.
 *
 * Server-only keys (Phase 5: Resend, GitHub API) are optional until the
 * features that need them land; their schemas will be made required in the
 * API routes that consume them.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  /** Canonical site origin, used for absolute URLs in metadata/OG tags. */
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  /** Phase 5 — Resend API key for the contact form (server-only). */
  RESEND_API_KEY: z.string().min(1).optional(),
  /** Phase 5 — GitHub token for higher API rate limits (server-only). */
  GITHUB_TOKEN: z.string().min(1).optional(),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`,
  );
}

export const env: Env = parsed.data;

/** Exported for tests only — validates arbitrary input against the env contract. */
export { envSchema };
