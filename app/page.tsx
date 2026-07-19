/**
 * Phase 1 skeleton page — proves the Design System v3 foundation renders and
 * builds. The real Hero / Navbar / Footer land in Phase 2; the four Scenarios
 * in Phase 2.5 (gate) and Phase 4. This is intentionally minimal and will be
 * replaced — it is not the launch home page.
 */

const SCENARIOS = [
  {
    unit: "SC-01",
    title: "Offensive Security",
    accent: "var(--accent-red-amber)",
  },
  { unit: "SC-02", title: "GRC & Compliance", accent: "var(--accent-blue)" },
  {
    unit: "SC-03",
    title: "AI-Secured Systems",
    accent: "var(--accent-violet)",
  },
  {
    unit: "SC-04",
    title: "Cloud & Infrastructure",
    accent: "var(--accent-teal)",
  },
] as const;

export default function Home() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden">
      <div
        aria-hidden
        className="precision-grid pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-between px-6 py-10">
        <header className="flex items-center justify-between border-b border-line pb-4">
          <span className="label-mono">HEM.GABHAWALA / PORTFOLIO</span>
          <span className="label-mono">REV 3.0 · BUILD SKELETON</span>
        </header>

        <section className="py-16">
          <p className="label-mono mb-6 text-accent">
            [ SYSTEM · INITIALIZED ]
          </p>
          <h1 className="max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-[-0.03em] text-balance sm:text-7xl">
            Cybersecurity work,
            <br />
            rendered as <span className="text-accent">scenarios</span>.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-fg-muted">
            Design foundation online. Dark industrial substrate, two-typeface
            telemetry, per-scenario accents. Hero, navigation, and the four
            immersive scenarios build on top of this in the phases ahead.
          </p>
        </section>

        <section
          aria-label="Scenario index"
          className="border-t border-line pt-6"
        >
          <p className="label-mono mb-4">SCENARIO INDEX / 04 UNITS</p>
          <ul className="grid gap-px overflow-hidden rounded-[2px] border border-line bg-line sm:grid-cols-2">
            {SCENARIOS.map((s) => (
              <li
                key={s.unit}
                className="flex items-center gap-4 bg-surface px-5 py-4"
              >
                <span
                  aria-hidden
                  className="h-8 w-1 shrink-0 rounded-[1px]"
                  style={{ backgroundColor: s.accent }}
                />
                <span className="label-mono shrink-0 text-fg-dim">
                  {s.unit}
                </span>
                <span className="font-medium tracking-tight">{s.title}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 flex items-center justify-between border-t border-line pt-4">
          <span className="label-mono text-fg-dim">
            STATUS · PHASE 1 COMPLETE
          </span>
          <span className="label-mono text-fg-dim">UNIT / D-01</span>
        </footer>
      </div>
    </main>
  );
}
