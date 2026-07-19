"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavSection } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Below-xl navigation drawer. Radix Dialog (via Sheet) provides the focus
 * trap while open, focus restore to the trigger on close, and Escape/overlay
 * dismissal; open/close animation is the Sheet's CSS slide, which the global
 * reduced-motion rule flattens for users who opt out. Controlled `open` so a
 * link click closes the drawer before the smooth scroll runs.
 */
export function MobileNav({
  sections,
  activeId,
}: {
  sections: NavSection[];
  activeId: string | null;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label="Open navigation menu"
        >
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle className="text-sm text-muted-foreground">
            Navigation
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Primary" className="overflow-y-auto">
          <ul className="flex flex-col gap-1 px-4 pb-6">
            {sections.map(({ id, label }) => {
              const isActive = id === activeId;
              return (
                <li key={id}>
                  <Link
                    href={`/#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-base transition-colors",
                      isActive
                        ? "text-accent-foreground bg-accent font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
