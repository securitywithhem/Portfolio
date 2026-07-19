/**
 * In-memory IP rate limiting for the contact form. Sufficient for a low-traffic
 * portfolio on Vercel; the window resets on cold-start (acceptable here). Swap
 * for Upstash Redis if persistent limiting is ever needed.
 *
 * Limit: 3 submissions per IP per hour.
 */
const RATE_LIMIT_WINDOW = 3600; // seconds
const MAX_REQUESTS_PER_WINDOW = 3;

interface RequestRecord {
  count: number;
  firstRequestAt: number;
}

const requestLog = new Map<string, RequestRecord>();

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now() / 1000;
  const record = requestLog.get(ip);

  if (!record) {
    requestLog.set(ip, { count: 1, firstRequestAt: now });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: 0,
    };
  }

  if (now - record.firstRequestAt > RATE_LIMIT_WINDOW) {
    requestLog.set(ip, { count: 1, firstRequestAt: now });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: 0,
    };
  }

  record.count += 1;
  const remaining = MAX_REQUESTS_PER_WINDOW - record.count;
  const resetAt = record.firstRequestAt + RATE_LIMIT_WINDOW;

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt };
  }
  return { allowed: true, remaining, resetAt };
}

export function formatTimeUntilReset(resetAtSeconds: number): string {
  const secondsUntilReset = Math.max(0, resetAtSeconds - Date.now() / 1000);
  if (secondsUntilReset < 60) return `${Math.ceil(secondsUntilReset)} seconds`;
  if (secondsUntilReset < 3600)
    return `${Math.ceil(secondsUntilReset / 60)} minutes`;
  return `${Math.ceil(secondsUntilReset / 3600)} hours`;
}
