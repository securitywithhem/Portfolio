import { z } from "zod";
import type { Experience } from "@/lib/types";
import { isoMonth, nonEmpty } from "./shared";

export const experienceSchema = z.object({
  company: nonEmpty,
  role: nonEmpty,
  startDate: isoMonth,
  endDate: isoMonth.nullable(),
  achievements: z.array(nonEmpty).min(1),
}) satisfies z.ZodType<Experience>;

export const experiencesSchema = z.array(experienceSchema);
