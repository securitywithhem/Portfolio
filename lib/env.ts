import { z } from "zod";

/**
 * Typed, validated access to environment variables. Import `env` from here
 * instead of reading process.env directly. Server-only keys are optional until
 * the features that consume them require them (checked at the call site).
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  /** Canonical site origin, for absolute URLs in metadata/OG tags. */
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  /** Resend API key for the contact form (server-only). */
  RESEND_API_KEY: z.string().min(1).optional(),
  /** GitHub token for higher API rate limits (server-only). */
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
export { envSchema };
