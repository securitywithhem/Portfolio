import { z } from "zod";
import type { SkillCategory, SkillItem } from "@/lib/types";
import { nonEmpty, slug, uniqueBy } from "./shared";

export const skillItemSchema = z.object({
  name: nonEmpty,
}) satisfies z.ZodType<SkillItem>;

export const skillCategorySchema = z.object({
  id: slug,
  title: nonEmpty,
  items: z.array(skillItemSchema).min(1),
}) satisfies z.ZodType<SkillCategory>;

export const skillCategoriesSchema = z
  .array(skillCategorySchema)
  .min(1)
  .superRefine(uniqueBy("id"));
