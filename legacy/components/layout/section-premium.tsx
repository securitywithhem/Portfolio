import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section wrapper — flat, high-contrast, editorial (Design System v2).
 *
 * Features:
 * - Consistent large vertical rhythm and ~1320px max-width container
 * - Flat surfaces only (no blur, no gradient washes, no glow)
 * - Optional hairline accent dividers
 */

interface SectionPremiumProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "surface";
  spacing?: "compact" | "normal" | "spacious";
  accentLine?: "top" | "bottom" | "both" | "none";
  className?: string;
}

export function SectionPremium({
  children,
  id,
  variant = "default",
  spacing = "normal",
  accentLine = "none",
  className,
}: SectionPremiumProps) {
  const spacingMap = {
    compact: "py-16 sm:py-24",
    normal: "py-24 sm:py-32",
    spacious: "py-28 sm:py-40",
  };

  // Flat backgrounds only — accent is never a background flood (v2 §1).
  const variants = {
    default: "bg-bg-base",
    surface: "bg-bg-surface",
  };

  const accentLineStyles = {
    top: "border-t border-border-subtle",
    bottom: "border-b border-border-subtle",
    both: "border-y border-border-subtle",
    none: "",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        spacingMap[spacing],
        variants[variant],
        accentLine !== "none" && accentLineStyles[accentLine],
        className,
      )}
    >
      <div className="relative mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

/**
 * Section header — flat editorial heading with an optional italic accent word
 * (v2 §3), preceded by a tracked-out eyebrow with an accent dot.
 */
interface SectionHeaderProps {
  eyebrow?: string;
  /** Section index marker, e.g. "02" (v2 §4 numbered markers). */
  index?: string;
  title: string;
  /** Optional trailing word rendered italic in the accent color. */
  titleAccent?: string;
  subtitle?: string;
  centered?: boolean;
  maxWidth?: "sm" | "md" | "lg";
}

const maxWidthMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
};

export function SectionHeader({
  eyebrow,
  index,
  title,
  titleAccent,
  subtitle,
  centered = true,
  maxWidth = "md",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        centered && "mx-auto text-center",
        maxWidthMap[maxWidth],
      )}
    >
      {(eyebrow || index) && (
        <div
          className={cn(
            "mb-4 flex items-center gap-2.5",
            centered && "justify-center",
          )}
        >
          {index && (
            <span className="font-mono text-xs font-medium tracking-[0.1em] text-accent">
              {index}
            </span>
          )}
          {eyebrow && (
            <>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-text-muted font-mono text-xs font-medium tracking-[0.12em] uppercase">
                {eyebrow}
              </span>
            </>
          )}
        </div>
      )}

      <h2 className="text-text-primary mb-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
        {title}
        {titleAccent && (
          <>
            {" "}
            <em className="font-normal text-accent italic">{titleAccent}</em>
          </>
        )}
      </h2>

      {subtitle && (
        <p className="text-text-secondary mx-auto max-w-3xl text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Section grid — consistent responsive grid layout.
 */
interface SectionGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "compact" | "normal" | "loose";
  className?: string;
}

export function SectionGrid({
  children,
  columns = 3,
  gap = "normal",
  className,
}: SectionGridProps) {
  const colMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapMap = {
    compact: "gap-4 sm:gap-6",
    normal: "gap-6 sm:gap-8",
    loose: "gap-8 sm:gap-12",
  };

  return (
    <div className={cn("grid", colMap[columns], gapMap[gap], className)}>
      {children}
    </div>
  );
}
