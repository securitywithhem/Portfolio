import { describe, expect, it } from "vitest";
import { envSchema } from "@/lib/env";

describe("env schema", () => {
  it("accepts a valid environment", () => {
    const result = envSchema.safeParse({
      NODE_ENV: "test",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a malformed site URL", () => {
    const result = envSchema.safeParse({
      NODE_ENV: "test",
      NEXT_PUBLIC_SITE_URL: "not-a-url",
    });
    expect(result.success).toBe(false);
  });
});
