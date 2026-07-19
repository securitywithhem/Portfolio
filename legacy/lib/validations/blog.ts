import { z } from "zod";
import type { BlogPost } from "@/lib/types";
import { isoDate, nonEmpty, slug, uniqueBy } from "./shared";

export const blogPostSchema = z.object({
  slug,
  title: nonEmpty,
  tags: z.array(nonEmpty),
  date: isoDate,
}) satisfies z.ZodType<BlogPost>;

export const blogPostsSchema = z
  .array(blogPostSchema)
  .superRefine(uniqueBy("slug"));
