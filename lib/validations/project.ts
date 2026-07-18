import { z } from "zod";
import type { Project } from "@/lib/types";
import { httpUrl, nonEmpty, slug, uniqueBy } from "./shared";

export const projectSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  slug,
  description: nonEmpty.max(2000),
  techStack: z.array(nonEmpty).min(1),
  images: z.array(z.string().startsWith("/", "Image paths are /public paths")),
  github: httpUrl.nullable(),
  live: httpUrl.nullable(),
  featured: z.boolean(),
}) satisfies z.ZodType<Project>;

/** Validates the full collection — slug and id must be unique. */
export const projectsSchema = z
  .array(projectSchema)
  .superRefine(uniqueBy("slug"))
  .superRefine(uniqueBy("id"));
