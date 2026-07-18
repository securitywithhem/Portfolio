import { z } from "zod";
import { nonEmpty, slug, uniqueBy } from "./shared";

export const navSectionSchema = z.object({
  id: slug,
  label: nonEmpty,
});

/** All nav sections; anchor ids must be unique (they become DOM ids). */
export const navSectionsSchema = z
  .array(navSectionSchema)
  .min(1)
  .superRefine(uniqueBy("id"));
