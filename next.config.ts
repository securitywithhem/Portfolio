import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 *
 * - `unsafe-eval` is dropped in production (three.js/R3F/GSAP don't need it);
 *   kept in dev only for Turbopack HMR.
 * - `unsafe-inline` remains on script-src because Next's statically-rendered
 *   pages emit inline hydration/bootstrap scripts (and we inline JSON-LD).
 *   Eliminating it entirely requires nonce-based CSP, which forces dynamic
 *   rendering — a perf tradeoff we deliberately avoid for a static portfolio
 *   with no third-party scripts or user-generated HTML. Documented, not blanket.
 * - style-src allows inline styles (accent-scope CSS vars, Framer Motion).
 * - dev also needs ws: for HMR websockets.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    // Enforcing in production; Report-Only in dev so tooling can't be blocked.
    key: isDev
      ? "Content-Security-Policy-Report-Only"
      : "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // A stray lockfile in the home directory otherwise makes Next infer the
  // wrong workspace root for file tracing.
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
