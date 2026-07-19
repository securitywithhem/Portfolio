import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/config";

/**
 * Robots.txt configuration. Allow search engines to crawl public pages,
 * disallow API routes and any admin paths. Point to the sitemap.
 *
 * Rendered at /robots.txt per Next.js convention.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/admin", "/.well-known"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
