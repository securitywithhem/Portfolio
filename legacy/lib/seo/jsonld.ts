import {
  SITE_NAME,
  SITE_URL,
  SOCIAL_URLS,
  getAbsoluteUrl,
  CONTACT_EMAIL,
} from "@/lib/seo/config";
import { profile } from "@/data/profile";
import type { Project, BlogPost } from "@/lib/types";

/**
 * JSON-LD structured data builders. Validate output against schema.org.
 * These are inserted into <script type="application/ld+json"> tags by the
 * root layout or per-page metadata functions.
 */

/** Person schema — site-wide identity. */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: profile.role,
    description: profile.bio,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    sameAs: SOCIAL_URLS,
  };
}

/** CreativeWork schema for a project. */
export function generateProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: getAbsoluteUrl(`/projects/${project.slug}`),
    mainEntity: {
      "@type": "SoftwareSourceCode",
      codeRepository: project.github || undefined,
      programmingLanguage: project.techStack,
    },
    ...(project.github && { repositoryUrl: project.github }),
    ...(project.live && { applicationUrl: project.live }),
  };
}

/** BlogPosting schema for a blog post. */
export function generateBlogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: getAbsoluteUrl(`/blog/${post.slug}`),
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    keywords: post.tags?.join(", "),
  };
}

/** BreadcrumbList for hierarchical pages (projects, blog posts). */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
