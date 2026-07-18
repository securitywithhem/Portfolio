import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium Card Component Library
 * A flexible, premium card system with consistent styling and animations
 *
 * Features:
 * - Smooth hover states with elevation
 * - Accent border on hover
 * - Consistent padding and radius
 * - Optional background patterns
 * - Micro-interactions
 */

interface CardPremiumProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "glass";
  interactive?: boolean;
  accentBorder?: boolean;
}

export const CardPremium = forwardRef<HTMLDivElement, CardPremiumProps>(
  (
    {
      variant = "default",
      interactive = false,
      accentBorder = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = "rounded-xl border transition-all duration-300";

    const variants = {
      default:
        "p-6 sm:p-8 bg-gradient-to-br from-[rgba(19,20,23,0.6)] to-[rgba(15,17,23,0.4)] border-[rgba(94,234,212,0.15)] backdrop-blur-sm",
      elevated:
        "p-6 sm:p-8 bg-gradient-to-br from-[rgba(19,20,23,0.7)] to-[rgba(15,17,23,0.5)] border-[rgba(94,234,212,0.2)] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
      bordered:
        "p-6 sm:p-8 bg-gradient-to-br from-[rgba(94,234,212,0.05)] to-[rgba(94,234,212,0.02)] border-2 border-[rgba(94,234,212,0.3)] backdrop-blur-sm",
      glass:
        "p-6 sm:p-8 bg-gradient-to-br from-[rgba(19,20,23,0.5)] to-[rgba(15,17,23,0.3)] border-[rgba(94,234,212,0.2)] backdrop-blur-xl",
    };

    const interactiveStyles = interactive
      ? "cursor-pointer hover:border-[rgba(94,234,212,0.4)] hover:shadow-[0_0_30px_rgba(94,234,212,0.2)] hover:bg-gradient-to-br hover:from-[rgba(94,234,212,0.1)] hover:to-[rgba(94,234,212,0.05)] transform hover:scale-[1.02] hover:translate-y-[-4px]"
      : accentBorder
        ? "hover:border-[rgba(94,234,212,0.3)] hover:shadow-[0_0_20px_rgba(94,234,212,0.15)]"
        : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          interactiveStyles,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardPremium.displayName = "CardPremium";

/**
 * Card Header Component
 */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ withBorder = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2",
        withBorder && "border-b border-[rgba(255,255,255,0.08)] pb-4",
        className,
      )}
      {...props}
    />
  ),
);

CardHeader.displayName = "CardHeader";

/**
 * Card Title Component
 */
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: "h2" | "h3" | "h4";
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ level = "h3", className, ...props }, ref) => {
    const classes = cn(
      "text-lg font-semibold text-[#EDEDEE] transition-colors hover:text-[#5EEAD4]",
      className,
    );

    switch (level) {
      case "h2":
        return <h2 ref={ref} className={classes} {...props} />;
      case "h4":
        return <h4 ref={ref} className={classes} {...props} />;
      default:
        return <h3 ref={ref} className={classes} {...props} />;
    }
  },
);

CardTitle.displayName = "CardTitle";

/**
 * Card Content Component
 */
export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-relaxed text-[#8B8D92]", className)}
    {...props}
  />
));

CardContent.displayName = "CardContent";

/**
 * Card Footer Component
 */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ withBorder = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3 pt-4",
        withBorder && "border-t border-[rgba(255,255,255,0.08)]",
        className,
      )}
      {...props}
    />
  ),
);

CardFooter.displayName = "CardFooter";

/**
 * Stat Card Component - for displaying metrics
 */
interface StatCardProps {
  value: string | number;
  label: string;
  sublabel?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export function StatCard({
  value,
  label,
  sublabel,
  trend,
  icon,
}: StatCardProps) {
  return (
    <CardPremium variant="default" className="text-center">
      {icon && <div className="mb-3 text-2xl text-[#5EEAD4]">{icon}</div>}
      <div className="text-2xl font-bold text-[#EDEDEE] sm:text-3xl">
        {value}
      </div>
      <div className="mt-2 text-xs tracking-wider text-[#8B8D92] uppercase sm:text-sm">
        {label}
      </div>
      {sublabel && (
        <div className="mt-1 text-xs text-[#55575D]">{sublabel}</div>
      )}
      {trend && (
        <div
          className={cn(
            "mt-2 text-xs font-semibold",
            trend === "up" && "text-green-400",
            trend === "down" && "text-red-400",
            trend === "neutral" && "text-[#8B8D92]",
          )}
        >
          {trend === "up" && "↑ "} {trend === "down" && "↓ "}
        </div>
      )}
    </CardPremium>
  );
}

/**
 * Feature Card Component - for showcasing features
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: boolean;
}

export function FeatureCard({
  icon,
  title,
  description,
  accent = false,
}: FeatureCardProps) {
  return (
    <CardPremium
      variant={accent ? "glass" : "default"}
      accentBorder={!accent}
      className="h-full"
    >
      <div className="mb-3 text-3xl text-[#5EEAD4]">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-[#EDEDEE]">{title}</h3>
      <p className="text-sm leading-relaxed text-[#8B8D92]">{description}</p>
    </CardPremium>
  );
}
