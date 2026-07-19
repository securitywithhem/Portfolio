import { ArrowUpRight } from "lucide-react";
import {
  tryHackMeSorted,
  tryHackMeStats,
  tryHackMeProfileUrl,
} from "@/data/tryhackme";
import { formatMonthYear } from "@/lib/format";

/** TryHackMe — headline stats + completed learning paths. Server-rendered. */
export function TryHackMe() {
  return (
    <section
      id="tryhackme"
      aria-labelledby="tryhackme-title"
      className="border-t border-line py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label-mono mb-3 flex items-center gap-3">
          <span aria-hidden className="h-4 w-1 rounded-[1px] bg-accent" />
          TRYHACKME
        </p>
        <h2
          id="tryhackme-title"
          className="max-w-3xl text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl"
        >
          175+ labs of learning how systems fail.
        </h2>

        {/* Headline stats */}
        <dl className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-3">
          {tryHackMeStats.map((stat) => (
            <div key={stat.label} className="bg-surface p-6">
              <dt className="label-mono">{stat.label}</dt>
              <dd className="mt-2 text-3xl font-extrabold tracking-tight text-accent">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Learning paths */}
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {tryHackMeSorted.map((path) => (
            <li
              key={path.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <span className="font-medium tracking-tight">{path.title}</span>
              <time
                dateTime={path.date}
                className="label-mono shrink-0 text-fg-muted"
              >
                {formatMonthYear(path.date)}
              </time>
            </li>
          ))}
        </ul>

        <a
          href={tryHackMeProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
        >
          View TryHackMe profile
          <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
    </section>
  );
}
