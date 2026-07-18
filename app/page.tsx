import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/shared/theme-toggle";

/**
 * TEMPORARY smoke-test page (Phase 1C) — exercises the full Phase 1 stack:
 * Next.js App Router + design tokens + shadcn primitives + dark mode.
 * Replaced by the real Hero/sections in Phase 2.
 */
export default function Home() {
  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center gap-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        Phase 1 smoke test — replaced in Phase 2
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Hem Gabhawala</h1>
      <p className="max-w-md text-base text-muted-foreground">
        Cybersecurity portfolio under construction. Design tokens, dark mode,
        and primitives are live — see /dev/tokens for the full reference.
      </p>
      <Separator className="max-w-48" />
      <ThemeToggle />
    </Container>
  );
}
