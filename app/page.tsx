import { Container } from "@/components/layout/container";
import { getNavSections, getProfile } from "@/lib/data";

/**
 * TEMPORARY section scaffold (Phase 2.1) — one full-height placeholder per
 * anchor in the nav contract (data/navigation.ts), so the navbar's smooth
 * scroll and active-section highlight are exercisable end to end before the
 * real sections exist. Each placeholder is replaced in Phases 2.2+; the
 * anchor ids must not change.
 */
export default function Home() {
  const sections = getNavSections();
  const { name, role } = getProfile();

  return (
    <main id="main">
      {sections.map(({ id, label }, index) => (
        <section
          key={id}
          id={id}
          className="flex min-h-dvh flex-col items-center justify-center border-b"
        >
          <Container className="text-center">
            {index === 0 ? (
              <h1 className="text-4xl font-semibold tracking-tight">
                {name} — {role}
              </h1>
            ) : (
              <h2 className="text-2xl font-semibold tracking-tight">{label}</h2>
            )}
            <p className="mt-3 font-mono text-sm text-muted-foreground">
              {label} placeholder — replaced in Phase 2.2+
            </p>
          </Container>
        </section>
      ))}
    </main>
  );
}
