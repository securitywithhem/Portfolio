import { z } from "zod";

/** `YYYY-MM-DD` (certificates, blog posts). */
export const isoDate = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
    message: "Expected ISO date (YYYY-MM-DD)",
  });

/** `YYYY-MM` (experience ranges — month granularity). */
export const isoMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, {
  message: "Expected ISO month (YYYY-MM)",
});

/** Lowercase kebab-case URL segment. */
export const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
  message: "Expected lowercase kebab-case slug",
});

/** Non-empty trimmed string. */
export const nonEmpty = z.string().trim().min(1);

/** Absolute http(s) URL. */
export const httpUrl = z.url({ protocol: /^https?$/ });

/**
 * Refinement asserting a field is unique across an array — used to enforce
 * slug/id uniqueness at the validation layer rather than by convention.
 */
export function uniqueBy<T>(key: keyof T & string) {
  return (items: T[], ctx: z.RefinementCtx) => {
    const seen = new Map<unknown, number>();
    items.forEach((item, index) => {
      const value = item[key];
      const first = seen.get(value);
      if (first !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: [index, key],
          message: `Duplicate ${key} "${String(value)}" (first used at index ${first})`,
        });
      } else {
        seen.set(value, index);
      }
    });
  };
}
