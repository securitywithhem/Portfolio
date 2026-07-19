/**
 * Simple IP-based rate limiting for the contact form.
 *
 * Design rationale: This is a low-traffic personal portfolio on Vercel.
 * An in-memory store with a sliding window is simple, sufficient, and has
 * no external dependencies. The window resets on cold-start (acceptable for
 * a portfolio where abuse attempts are unlikely). For higher traffic or
 * stricter requirements, upgrade to Upstash Redis or similar persistent store.
 *
 * Rate limit: 3 submissions per IP per 1 hour (3600s).
 * Tuned for a realistic recruiter journey (not spam-like rapid-fire).
 */

const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds
const MAX_REQUESTS_PER_WINDOW = 3;

interface RequestRecord {
  count: number;
  firstRequestAt: number;
}

// In-memory store: IP → request records
const requestLog = new Map<string, RequestRecord>();

/**
 * Check if an IP has exceeded its rate limit.
 * Returns { allowed, remaining, resetAt } so the caller can inform the user
 * how long they must wait before retrying.
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now() / 1000; // Unix timestamp in seconds
  const record = requestLog.get(ip);

  // No prior requests from this IP — allowed.
  if (!record) {
    requestLog.set(ip, { count: 1, firstRequestAt: now });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: 0,
    };
  }

  // Request is outside the window — reset and allow.
  const windowElapsed = now - record.firstRequestAt;
  if (windowElapsed > RATE_LIMIT_WINDOW) {
    requestLog.set(ip, { count: 1, firstRequestAt: now });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: 0,
    };
  }

  // Within window: increment and check limit.
  record.count += 1;
  const remaining = MAX_REQUESTS_PER_WINDOW - record.count;
  const resetAt = record.firstRequestAt + RATE_LIMIT_WINDOW;

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt };
  }

  return { allowed: true, remaining, resetAt };
}

/**
 * Format a Unix timestamp for user-facing messaging.
 * Example: 1718818234 → "in 5 minutes"
 */
export function formatTimeUntilReset(resetAtSeconds: number): string {
  const secondsUntilReset = Math.max(0, resetAtSeconds - Date.now() / 1000);

  if (secondsUntilReset < 60) {
    return `${Math.ceil(secondsUntilReset)} seconds`;
  }
  if (secondsUntilReset < 3600) {
    return `${Math.ceil(secondsUntilReset / 60)} minutes`;
  }
  return `${Math.ceil(secondsUntilReset / 3600)} hours`;
}
