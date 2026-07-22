"use client";

import { useEffect, useState } from "react";
import { primaryNav, navLeaves } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/lib/hooks/use-active-section";

const SECTION_IDS = navLeaves.map((l) => l.id);

/**
 * The wash the header wears over each dark plate.
 *
 * It is not enough to know a plate is dark — the wash has to be tinted from
 * that plate's own ground. A neutral `bg-ink/80` over the warm oxblood closing
 * plate composites to #1f1618, which sits 0.075 below the plate in OKLCH
 * lightness and reads as a desaturated bar laid on top of it rather than as
 * the same surface, dimmed.
 *
 * Plates not listed here are light and get the paper wash.
 */
const DARK_PLATE_WASH: Record<string, string> = {
  approach: "border-rule-on-ink bg-ink/80 backdrop-blur-md",
  contact: "border-rule-on-close bg-close/85 backdrop-blur-md",
};

/**
 * Sticky header. Transparent over the hero, gaining a rule and a wash only once
 * the page has scrolled, so the first screen stays clean.
 *
 * Mobile shows the wordmark and a single "Email" action rather than a drawer:
 * five anchors do not justify a menu, and the one thing a recruiter needs on a
 * phone is the way to make contact.
 */
export function SiteHeader() {
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const darkWash = active !== null ? DARK_PLATE_WASH[active] : undefined;
  const onDark = darkWash !== undefined;

  const shell = !scrolled
    ? "border-transparent"
    : (darkWash ?? "border-rule bg-paper/85 backdrop-blur-md");

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 border-b transition-colors duration-500 motion-reduce:transition-none ${shell} ${
        onDark ? "text-on-ink" : "text-ink"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <a
          href="#hero"
          className="text-[0.92rem] font-semibold tracking-[-0.01em]"
          style={{ fontVariationSettings: '"wdth" 92' }}
        >
          Hem Gabhawala
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.target}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`type-data transition-opacity ${
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="link-underline text-[0.85rem] md:hidden"
        >
          Email
        </a>
      </div>
    </header>
  );
}
