import type { BlogPost } from "@/lib/types";

/**
 * Blog post front-matter. Post bodies arrive with the Blog feature phase;
 * this metadata drives listings until then.
 */
export const blogPosts = [
  {
    slug: "api-pentesting-owasp-top-10",
    title: "Testing REST APIs Against the OWASP API Security Top 10",
    tags: ["api-security", "pentesting", "owasp"],
    date: "2026-05-12",
  },
  {
    slug: "client-side-encryption-lessons-from-vaultiq",
    title: "Client-Side Encryption: Lessons from Building VaultIQ",
    tags: ["cryptography", "web-security"],
    date: "2026-06-28",
  },
] satisfies BlogPost[];
