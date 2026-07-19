import { z } from "zod";
import type { Certificate } from "@/lib/types";
import { httpUrl, isoDate, nonEmpty, uniqueBy } from "./shared";

export const certificateSchema = z.object({
  id: nonEmpty,
  title: nonEmpty,
  issuer: nonEmpty,
  date: isoDate,
  credentialUrl: httpUrl.nullable(),
}) satisfies z.ZodType<Certificate>;

export const certificatesSchema = z
  .array(certificateSchema)
  .superRefine(uniqueBy("id"));
