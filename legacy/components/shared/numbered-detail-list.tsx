"use client";

import { AnimatePresence, motion } from "motion/react";

import { transitionBase } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * One entry in a NumberedDetailList. Plain serializable data so it can be
 * built server-side and passed into this client component.
 */
export interface DetailListItem {
  id: string;
  title: string;
  /** Supporting line under the title (date range, company, category…). */
  meta?: string;
  /** Small badge shown in the detail panel (e.g. category, "Present"). */
  tag?: string;
  /** Render the tag in the accent color (e.g. an ongoing role). */
  tagHighlight?: boolean;
  description?: string;
  /** Bullet points shown in the detail panel (e.g. achievements). */
  bullets?: string[];
}

/**
 * Numbered vertical list with an active-item detail panel (Design System v2
 * §6 — the "01–06" pattern used for Journey and Experience).
 *
 * Desktop: two columns — a numbered list on the left, a sticky detail panel
 * on the right that reflects the hovered/focused/clicked row. Mobile: the
 * list becomes an accordion, expanding the active item's detail inline.
 *
 * Flat editorial styling: mono numerals, hairline dividers, accent as the
 * active signal only — never a background flood.
 */
export function NumberedDetailList({
  items,
  ariaLabel,
}: {
  items: DetailListItem[];
  ariaLabel: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
      <ol aria-label={ariaLabel} className="list-none">
        {items.map((item, i) => {
          const isActive = item.id === active?.id;
          return (
            <li
              key={item.id}
              className="border-border-subtle border-b last:border-b-0"
            >
              <button
                type="button"
                aria-current={isActive}
                aria-expanded={isActive}
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                className="group flex w-full items-baseline gap-4 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums transition-colors duration-200",
                    isActive ? "text-accent" : "text-text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="flex-1">
                  <span
                    className={cn(
                      "block text-lg font-semibold tracking-tight transition-colors duration-200 sm:text-xl",
                      isActive
                        ? "text-text-primary"
                        : "text-text-secondary group-hover:text-text-primary",
                    )}
                  >
                    {item.title}
                  </span>
                  {item.meta && (
                    <span className="text-text-muted mt-1 block text-sm">
                      {item.meta}
                    </span>
                  )}
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "mt-1 hidden shrink-0 text-accent transition-all duration-200 lg:inline-block",
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0",
                  )}
                >
                  →
                </span>
              </button>

              {/* Mobile: inline detail for the active row */}
              <div className="lg:hidden">
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <DetailBody item={item} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: sticky detail panel */}
      <div className="hidden lg:block">
        <div className="border-border-subtle sticky top-24 border-l pl-10">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transitionBase}
              >
                <DetailBody item={active} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DetailBody({ item }: { item: DetailListItem }) {
  return (
    <div>
      {item.tag && (
        <span
          className={cn(
            "mb-4 inline-block font-mono text-xs font-medium tracking-[0.12em] uppercase",
            item.tagHighlight ? "text-accent" : "text-text-muted",
          )}
        >
          {item.tag}
        </span>
      )}
      <h3 className="text-text-primary text-2xl font-bold tracking-tight">
        {item.title}
      </h3>
      {item.meta && <p className="text-text-muted mt-1 text-sm">{item.meta}</p>}
      {item.description && (
        <p className="text-text-secondary mt-4 text-base leading-relaxed">
          {item.description}
        </p>
      )}
      {item.bullets && item.bullets.length > 0 && (
        <ul className="mt-5 space-y-3">
          {item.bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="text-text-secondary flex gap-3 text-sm leading-relaxed sm:text-base"
            >
              <span
                aria-hidden
                className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
