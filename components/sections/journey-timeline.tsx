import { Reveal } from "@/components/shared/reveal";
import { timelineSorted } from "@/data/timeline";
import type { TimelineEvent } from "@/lib/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: string): string {
  const [year, month] = date.split("-");
  const idx = Number(month) - 1;
  const label = MONTHS[idx];
  return label ? `${label} ${year}` : (year ?? date);
}

const CATEGORY_LABEL: Record<TimelineEvent["category"], string> = {
  education: "EDUCATION",
  experience: "EXPERIENCE",
  milestone: "MILESTONE",
};

/** Journey — the VAPT → GRC & AI Security arc as a vertical timeline. */
export function JourneyTimeline() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="border-t border-line py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-3 flex items-center gap-3">
          <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
          JOURNEY
        </p>
        <h2
          id="journey-title"
          className="max-w-3xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl"
        >
          From breaking systems to building the guardrails.
        </h2>

        <ol className="mt-14 border-l border-line">
          {timelineSorted.map((event, i) => (
            <li key={event.id} className="relative pb-12 pl-8 last:pb-0">
              {/* Node marker on the rail */}
              <span
                aria-hidden
                className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent bg-bg"
              />
              <Reveal delay={i * 0.05}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <time
                    dateTime={event.date}
                    className="label-mono text-accent"
                  >
                    {formatDate(event.date)}
                  </time>
                  <span className="label-mono">
                    {CATEGORY_LABEL[event.category]}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {event.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
                  {event.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
