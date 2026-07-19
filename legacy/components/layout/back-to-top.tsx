"use client";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * The only interactive piece of the Footer — isolated so the rest stays a
 * Server Component. A real labeled button (not a bare icon): the visible
 * label is `sr-only` so sighted users get the compact icon affordance while
 * screen readers get the same "Back to top" text as everyone else reading
 * the DOM. `scrollTo` (not an anchor) avoids adding a history entry.
 */
export function BackToTop() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp aria-hidden />
      Back to top
    </Button>
  );
}
