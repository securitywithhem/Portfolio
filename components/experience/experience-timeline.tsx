import {
  SectionPremium,
  SectionHeader,
} from "@/components/layout/section-premium";
import {
  NumberedDetailList,
  type DetailListItem,
} from "@/components/shared/numbered-detail-list";
import { getExperience } from "@/lib/data";

export function ExperienceTimeline() {
  const experiences = getExperience();

  const items: DetailListItem[] = experiences.map((exp) => {
    const isOngoing = exp.endDate === null;
    const end = isOngoing ? "Present" : formatMonthYear(exp.endDate as string);
    return {
      id: `${exp.company}-${exp.startDate}`,
      title: exp.role,
      meta: `${exp.company} · ${formatMonthYear(exp.startDate)} — ${end}`,
      tag: isOngoing ? "Present" : exp.company,
      tagHighlight: isOngoing,
      bullets: exp.achievements,
    };
  });

  return (
    <SectionPremium id="experience" spacing="normal" accentLine="top">
      <SectionHeader
        eyebrow="Experience"
        index="04"
        title="The offensive foundation"
        titleAccent="everything else is built on."
        subtitle="The hands-on VAPT work that grounds the GRC and AI Security direction."
      />
      <NumberedDetailList items={items} ariaLabel="Work experience" />
    </SectionPremium>
  );
}

/** `YYYY-MM` → "May 2025" */
function formatMonthYear(date: string): string {
  const [year, month] = date.split("-").map(Number);
  if (!year || !month) return date;
  const formatted = new Date(Date.UTC(year, month - 1, 1));
  return formatted.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
