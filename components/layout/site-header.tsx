"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { accentVar } from "@/lib/accents";
import { navLeaves, primaryNav, scenarioAnchorIds } from "@/data/navigation";
import { scenarioMetas } from "@/data/scenarios";
import { profile } from "@/data/profile";

// Stable id list for the scroll-spy (module scope — never re-created).
const LEAF_IDS = navLeaves.map((l) => l.id);

export function SiteHeader() {
  const active = useActiveSection(LEAF_IDS);
  const [open, setOpen] = useState(false);

  const activeScenario =
    active && scenarioAnchorIds.has(active)
      ? scenarioMetas.find((s) => s.id === active)
      : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6"
      >
        {/* Wordmark */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 rounded-[2px]"
          aria-label={`${profile.name} — home`}
        >
          <span
            aria-hidden
            className="h-5 w-1.5 rounded-[1px] transition-colors"
            style={{
              backgroundColor: activeScenario
                ? accentVar(activeScenario.accent)
                : "var(--accent)",
            }}
          />
          <span className="font-mono text-sm font-medium tracking-tight text-fg">
            HEM<span className="text-fg-dim">.</span>GABHAWALA
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => {
            const isActive = item.scenarioGroup
              ? active !== null && scenarioAnchorIds.has(active)
              : active === item.target;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.target}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "label-mono flex items-center gap-2 rounded-[2px] px-3 py-2 transition-colors hover:text-fg",
                    isActive && "text-fg",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-1 w-1 rounded-full transition-colors",
                      isActive ? "bg-accent" : "bg-transparent",
                    )}
                    style={
                      isActive && activeScenario
                        ? { backgroundColor: accentVar(activeScenario.accent) }
                        : undefined
                    }
                  />
                  {item.label}
                  {item.scenarioGroup && activeScenario && (
                    <span
                      className="tabular-nums"
                      style={{ color: accentVar(activeScenario.accent) }}
                    >
                      {activeScenario.unit}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            download
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Resume
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] text-fg-muted hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div id="mobile-nav" className="border-t border-line bg-bg md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {navLeaves
              .filter((l) => l.id !== "hero")
              .map((leaf) => {
                const isActive = active === leaf.id;
                const scenarioAccent = leaf.scenario
                  ? accentVar(leaf.scenario.accent)
                  : undefined;
                return (
                  <li key={leaf.id}>
                    <a
                      href={`#${leaf.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-[2px] px-2 py-3 text-sm transition-colors",
                        isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {leaf.scenario && (
                        <span
                          className="label-mono w-12 shrink-0"
                          style={{ color: scenarioAccent }}
                        >
                          {leaf.scenario.unit}
                        </span>
                      )}
                      <span>{leaf.label}</span>
                    </a>
                  </li>
                );
              })}
            <li className="mt-2 border-t border-line pt-3">
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "w-full",
                )}
              >
                Download resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
