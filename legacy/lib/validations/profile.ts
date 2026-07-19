import { z } from "zod";
import type { Profile, SocialLink } from "@/lib/types";
import { httpUrl, nonEmpty } from "./shared";

export const socialLinkSchema = z.object({
  label: nonEmpty,
  url: httpUrl,
}) satisfies z.ZodType<SocialLink>;

export const profileSchema = z.object({
  name: nonEmpty,
  role: nonEmpty,
  bio: nonEmpty.max(1000),
  socials: z.array(socialLinkSchema).min(1),
  resumeUrl: z.string().regex(/^\/\S+$/, {
    message: "Expected site-relative path (e.g. /resume.pdf)",
  }),
  aboutBio: z.array(nonEmpty.max(600)).min(1),
  focusAreas: z.array(nonEmpty).min(1).max(6),
}) satisfies z.ZodType<Profile>;
