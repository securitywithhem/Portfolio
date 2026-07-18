"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { fadeIn, fadeUp, staggerChildren, subtleHover } from "@/lib/motion";

/**
 * Design-tokens showcase (Phase 0.2 review artifact).
 * Dev-only reference page — never linked from production navigation.
 * Every color, type size, spacing step, radius, motion preset, and the
 * glass utility is rendered here for review against Docs/03_UI_UX.md.
 */

const colorPairs = [
  {
    name: "background / foreground",
    bg: "bg-background",
    fg: "text-foreground",
    border: true,
  },
  {
    name: "card / card-foreground",
    bg: "bg-card",
    fg: "text-card-foreground",
    border: true,
  },
  {
    name: "popover / popover-foreground",
    bg: "bg-popover",
    fg: "text-popover-foreground",
    border: true,
  },
  {
    name: "primary / primary-foreground",
    bg: "bg-primary",
    fg: "text-primary-foreground",
  },
  {
    name: "secondary / secondary-foreground",
    bg: "bg-secondary",
    fg: "text-secondary-foreground",
  },
  {
    name: "muted / muted-foreground",
    bg: "bg-muted",
    fg: "text-muted-foreground",
  },
  {
    name: "accent / accent-foreground",
    bg: "bg-accent",
    fg: "text-accent-foreground",
  },
  {
    name: "destructive / destructive-foreground",
    bg: "bg-destructive",
    fg: "text-destructive-foreground",
  },
] as const;

const typeScale = [
  { cls: "text-xs", label: "text-xs — captions, badges" },
  { cls: "text-sm", label: "text-sm — secondary UI text" },
  { cls: "text-base", label: "text-base — body copy" },
  { cls: "text-lg", label: "text-lg — lead paragraph" },
  { cls: "text-xl", label: "text-xl — card titles" },
  { cls: "text-2xl", label: "text-2xl — section subheading" },
  { cls: "text-3xl", label: "text-3xl — section heading" },
  { cls: "text-4xl", label: "text-4xl — page heading" },
  { cls: "text-6xl", label: "text-6xl — hero display" },
] as const;

const spacingSteps = [
  "w-1",
  "w-2",
  "w-4",
  "w-6",
  "w-8",
  "w-12",
  "w-16",
  "w-24",
] as const;

const radiusSteps = [
  { cls: "rounded-sm", label: "sm" },
  { cls: "rounded-md", label: "md" },
  { cls: "rounded-lg", label: "lg" },
  { cls: "rounded-xl", label: "xl" },
] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function TokensPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Phase 0.2 — dev only</p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Design tokens
          </h1>
          <p className="text-base text-muted-foreground">
            Reference sheet for every token. Ratios documented in
            styles/CONTRAST.md; enforced by lib/design/contrast.test.ts.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Semantic colors">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colorPairs.map((pair) => (
            <div
              key={pair.name}
              className={`${pair.bg} ${"border" in pair ? "border" : ""} rounded-lg p-4`}
            >
              <p className={`${pair.fg} text-sm font-medium`}>Aa</p>
              <p className={`${pair.fg} text-xs`}>{pair.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type scale (Geist Sans / Geist Mono)">
        <div className="space-y-3">
          {typeScale.map((t) => (
            <p key={t.cls} className={t.cls}>
              {t.label}
            </p>
          ))}
          <p className="font-mono text-sm text-muted-foreground">
            font-mono — Geist Mono for technical accents
          </p>
        </div>
      </Section>

      <Section title="Spacing scale (4px base)">
        <div className="space-y-2">
          {spacingSteps.map((w) => (
            <div key={w} className="flex items-center gap-3">
              <div className={`${w} h-3 rounded-sm bg-primary`} />
              <span className="font-mono text-xs text-muted-foreground">
                {w}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radius scale">
        <div className="flex flex-wrap gap-4">
          {radiusSteps.map((r) => (
            <div
              key={r.cls}
              className={`${r.cls} flex size-20 items-center justify-center border bg-card`}
            >
              <span className="font-mono text-xs text-muted-foreground">
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Primitives (shadcn/ui, themed)">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Themed dialog</DialogTitle>
                <DialogDescription>
                  Surface, border, and focus ring all come from tokens.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Themed sheet</SheetTitle>
                <SheetDescription>
                  Used for mobile navigation in Phase 2.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="max-w-sm">
          <Input placeholder="Input — focus to see the ring token" />
        </div>
      </Section>

      <Section title="Motion presets (respect prefers-reduced-motion)">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <motion.div variants={fadeUp}>
            <Card>
              <CardHeader>
                <CardTitle>fadeUp</CardTitle>
                <CardDescription>Entrance for sections</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle>fadeIn</CardTitle>
                <CardDescription>Opacity-only entrance</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp} whileHover={subtleHover}>
            <Card>
              <CardHeader>
                <CardTitle>subtleHover</CardTitle>
                <CardDescription>Hover me — 1.02 scale</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </Section>

      <Section title="Glassmorphism utility">
        <div className="relative overflow-hidden rounded-xl border">
          <div className="grid grid-cols-6">
            {colorPairs.map((pair) => (
              <div key={pair.name} className={`${pair.bg} h-28`} />
            ))}
            <div className="h-28 bg-primary" />
            <div className="h-28 bg-accent" />
            <div className="h-28 bg-secondary" />
            <div className="h-28 bg-muted" />
          </div>
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 rounded-lg glass p-4">
            <p className="text-sm font-medium">.glass</p>
            <p className="text-xs text-muted-foreground">
              Translucent card surface + backdrop blur + soft border. Reserved
              for floating surfaces (navbar, overlays) — not every card.
            </p>
          </div>
        </div>
      </Section>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Rules: no hardcoded colors, sizes, or durations outside
            styles/globals.css and lib/motion.ts. Later phases extend this
            system — they never reinvent it.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
