import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium Section Wrapper
 * Ensures consistent spacing, styling, and animations across all sections
 *
 * Features:
 * - Consistent padding (vertical + horizontal)
 * - Optional background patterns
 * - Consistent max-width container
 * - Optional gradient or accent borders
 * - Built-in scroll reveal animation support
 */

interface SectionPremiumProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "dark" | "glass" | "accent";
  spacing?: "compact" | "normal" | "spacious";
  accentLine?: "top" | "bottom" | "both" | "none";
  className?: string;
}

export function SectionPremium({
  children,
  id,
  variant = "default",
  spacing = "normal",
  accentLine = "top",
  className,
}: SectionPremiumProps) {
  const spacingMap = {
    compact: "py-16 sm:py-24",
    normal: "py-20 sm:py-32",
    spacious: "py-24 sm:py-40",
  };

  const variants = {
    default: "bg-gradient-to-b from-[#0B0C0E] to-[#0F1117]",
    dark: "bg-gradient-to-b from-[#0B0C0E] to-[#0F1117]",
    glass:
      "bg-gradient-to-br from-[rgba(19,20,23,0.4)] via-[#0B0C0E] to-[#0B0C0E] backdrop-blur-sm border-t border-[rgba(94,234,212,0.15)]",
    accent:
      "bg-gradient-to-br from-[rgba(94,234,212,0.08)] via-[#0B0C0E] to-[#0B0C0E] border-t border-[rgba(94,234,212,0.25)]",
  };

  const accentLineStyles = {
    top: "border-t border-[rgba(94,234,212,0.2)]",
    bottom: "border-b border-[rgba(94,234,212,0.2)]",
    both: "border-y border-[rgba(94,234,212,0.2)]",
    none: "",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full overflow-hidden",
        spacingMap[spacing],
        variants[variant],
        accentLine !== "none" && accentLineStyles[accentLine],
        className,
      )}
    >
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(94,234,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

/**
 * Section Header - consistent heading structure
 */
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
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
  title,
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
      {eyebrow && (
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(94,234,212,0.3)] bg-gradient-to-r from-[rgba(94,234,212,0.1)] to-[rgba(94,234,212,0.05)] px-4 py-2 backdrop-blur-sm"
          style={{
            boxShadow:
              "0 0 15px rgba(94,234,212,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-[#5EEAD4]"
            style={{
              boxShadow: "0 0 8px rgba(94,234,212,0.5)",
            }}
          />
          <span className="bg-gradient-to-r from-[#5EEAD4] to-[#7FFCE8] bg-clip-text font-mono text-xs tracking-widest text-transparent uppercase">
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className="sm:text-5xl mb-4 text-4xl font-black tracking-tight"
        style={{
          background:
            "linear-gradient(135deg, #EDEDEE 0%, #5EEAD4 60%, #7FFCE8 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#8B8D92]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Section Grid - consistent grid layout
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
