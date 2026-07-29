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
  /**
   * Set automatically by Vercel to the project's stable production domain
   * (host only, no scheme). Used as the fallback origin so deployments get
   * correct absolute URLs without any dashboard configuration.
   */
  VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`,
  );
}

export const env: Env = parsed.data;
export { envSchema };
