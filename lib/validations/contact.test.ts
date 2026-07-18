import { describe, expect, it } from "vitest";
import { contactFormSchema } from "@/lib/validations";

/**
 * Security tests for the contact form schema — the exact schema Phase 5's
 * form and rate-limited API route consume. Covers the cases required by
 * Phase 0.3: valid input, invalid email, oversized message, and injection
 * attempts.
 */
const valid = {
  name: "Jane Recruiter",
  email: "jane@example.com",
  message: "Hi Hem, I'd like to talk about a security engineering role.",
};

describe("contactFormSchema", () => {
  it("accepts valid input", () => {
    const result = contactFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = contactFormSchema.parse({
      ...valid,
      name: "  Jane Recruiter  ",
    });
    expect(result.name).toBe("Jane Recruiter");
  });

  it.each(["not-an-email", "a@b", "jane@", "@example.com", ""])(
    "rejects invalid email %j",
    (email) => {
      expect(contactFormSchema.safeParse({ ...valid, email }).success).toBe(
        false,
      );
    },
  );

  it("rejects an oversized message (>2000 chars)", () => {
    const message = "a".repeat(2001);
    expect(contactFormSchema.safeParse({ ...valid, message }).success).toBe(
      false,
    );
  });

  it("rejects a too-short message", () => {
    expect(
      contactFormSchema.safeParse({ ...valid, message: "hi" }).success,
    ).toBe(false);
  });

  it.each([
    "<script>alert(1)</script>",
    "Hello <img src=x onerror=alert(1)> there, nice site you have",
    "Interested in your work <a href='https://evil.example'>click</a> thanks",
    "<svg/onload=alert(1)> plus some padding text to pass min length",
  ])("rejects HTML/script injection in message: %j", (message) => {
    expect(contactFormSchema.safeParse({ ...valid, message }).success).toBe(
      false,
    );
  });

  it("rejects HTML injection in name", () => {
    expect(
      contactFormSchema.safeParse({ ...valid, name: "<b>Jane</b>" }).success,
    ).toBe(false);
  });

  it("rejects control characters (header-injection style)", () => {
    expect(
      contactFormSchema.safeParse({
        ...valid,
        message: "legit looking message\u0000with a null byte inside",
      }).success,
    ).toBe(false);
  });

  it("allows plain multi-line messages", () => {
    expect(
      contactFormSchema.safeParse({
        ...valid,
        message: "Line one of the message.\nLine two, still plain text.",
      }).success,
    ).toBe(true);
  });
});
