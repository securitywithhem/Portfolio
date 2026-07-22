"use client";

import { useRef } from "react";
import { profile } from "@/data/profile";
import { timeline } from "@/data/timeline";
import { formatMonthYear } from "@/lib/format";
import { LatticeFigure } from "@/components/approach/lattice-figure";

/**
 * Three beats, cut down from the original six-paragraph About. Each is one
 * idea; the lattice beside them resolves from scattered to structured as they
 * are read, so the figure argues the same thing the copy does.
 */
const BEATS = [
  {
    label: "Break",
    body: "I started in offensive security. A VAPT internship at HackersVilla Cybersecurity — live vulnerability assessments, penetration testing and network reconnaissance against real systems, with remediation reports engineering teams acted on. Alongside it, 175+ TryHackMe labs through privilege escalation, Active Directory and OWASP web exploitation, to the top 2% globally.",
  },
  {
    label: "Understand",
    body: "That work trains a specific instinct: not just where a vulnerability is, but why it matters and what it costs. Most people entering GRC or AI security arrive from compliance frameworks or machine learning. I arrived from watching systems actually fail.",
  },
  {
    label: "Build",
    body: "So I build the other side of it. Dharma treats compliance as an engineering problem — evidence mapped to controls by a local AI model that never sends data off-site, hash-chained so no record can be quietly edited. VaultIQ starts from the position that AI security is architecture, not filters: files are encrypted in the browser, and the model that scans them for AI-generated content is one I trained and measured at 98.3% accuracy.",
  },
];

/** Only the two dated facts a recruiter verifies — role and degree. */
const RECORD = timeline.filter(
  (t) => t.category === "experience" || t.category === "education",
);

/**
 * Plate 2 — ink, full-bleed. The hard cut.
 *
 * Scrolling from the paper hero straight into black is the page's strongest
 * separation, and it is doing the work a row of hairlines used to fail at. The
 * lattice inverts to light-on-dark here and gains the drama it never had on
 * paper.
 *
 * Note the text ramp: this plate uses --on-ink / --on-ink-muted, not the ink
 * ramp, and the accent switches to --accent-on-dark. The paper accent measures
 * 2.98:1 against this ground and is unusable.
 */
export function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="approach"
      className="bg-ink px-6 py-28 text-on-ink md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="type-plate max-w-[18ch]">
          Offensive instinct, turned into preventive design.
        </h2>

        <div
          ref={sectionRef}
          className="mt-20 grid gap-14 md:mt-28 md:grid-cols-[1fr_1.05fr] md:gap-20"
        >
          <div className="order-2 flex flex-col gap-20 md:order-1 md:gap-36">
            {BEATS.map((beat) => (
              <div key={beat.label}>
                <p className="type-figure text-[1.6rem] leading-none text-accent-on-dark">
                  {beat.label}
                </p>
                <p className="type-body mt-5 text-on-ink-muted">{beat.body}</p>
              </div>
            ))}
          </div>

          <div className="order-1 md:order-2">
            <LatticeFigure sectionRef={sectionRef} />
          </div>
        </div>

        {/*
          Was a left-bordered pull quote. A thick coloured side-stripe is
          decoration standing in for emphasis — here the scale and the ground
          do it instead.
        */}
        <blockquote className="mt-24 md:mt-36">
          <p className="type-sub max-w-[24ch]">{profile.aboutPullQuote}</p>
        </blockquote>

        <dl className="mt-24 grid gap-x-12 gap-y-10 border-t border-rule-on-ink pt-8 sm:grid-cols-2 md:mt-36">
          {RECORD.map((item) => (
            <div key={item.id}>
              <dt className="type-data text-on-ink-muted">
                {formatMonthYear(item.date)}
              </dt>
              <dd className="mt-2 text-[1rem] font-medium">{item.title}</dd>
              <p className="type-body mt-2 text-[0.95rem] text-on-ink-muted">
                {item.description}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
