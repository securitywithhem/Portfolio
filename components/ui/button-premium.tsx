import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium Button Component Library
 * Variants: primary, secondary, ghost, accent
 * Sizes: sm, base, lg
 * States: default, hover, active, disabled
 *
 * Features:
 * - Smooth 200ms transitions
 * - Consistent spacing and typography
 * - Micro-interactions
 * - Accessibility-first design
 */

interface ButtonPremiumProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "base" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const ButtonPremium = forwardRef<HTMLButtonElement, ButtonPremiumProps>(
  (
    {
      variant = "primary",
      size = "base",
      isLoading = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C0E] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#EDEDEE] text-[#0B0C0E] hover:bg-[#5EEAD4] hover:text-[#04211C] hover:shadow-lg active:scale-95",
      secondary:
        "border border-[rgba(255,255,255,0.14)] text-[#EDEDEE] hover:border-[#5EEAD4] hover:text-[#5EEAD4] hover:bg-[rgba(94,234,212,0.05)]",
      ghost:
        "text-[#8B8D92] hover:text-[#5EEAD4] hover:bg-[rgba(94,234,212,0.05)]",
      accent:
        "bg-[#5EEAD4] text-[#04211C] hover:bg-[#7FFCE8] hover:shadow-[0_0_20px_rgba(94,234,212,0.2)] active:scale-95 font-bold",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md gap-1.5",
      base: "px-6 py-3 text-base rounded-lg gap-2",
      lg: "px-8 py-4 text-lg rounded-xl gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="mr-2 inline-block animate-spin">◐</span>
            {children}
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

ButtonPremium.displayName = "ButtonPremium";

/**
 * Button Group Component - for organizing related actions
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  vertical?: boolean;
  spacing?: "compact" | "normal" | "loose";
}

export function ButtonGroup({
  children,
  vertical = false,
  spacing = "normal",
}: ButtonGroupProps) {
  const gapMap = { compact: "gap-2", normal: "gap-3", loose: "gap-4" };

  return (
    <div
      className={cn(
        "flex",
        vertical ? "flex-col" : "flex-row flex-wrap items-center",
        gapMap[spacing],
      )}
    >
      {children}
    </div>
  );
}

/**
 * Icon Button Component - for compact icon-only actions
 */
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "base" | "lg";
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, variant = "secondary", size = "base", label, className, ...props },
    ref,
  ) => {
    const sizeMap = {
      sm: "w-8 h-8",
      base: "w-10 h-10",
      lg: "w-12 h-12",
    };

    const variantStyles = {
      primary: "bg-[#EDEDEE] text-[#0B0C0E] hover:bg-[#5EEAD4]",
      secondary:
        "border border-[rgba(255,255,255,0.14)] text-[#EDEDEE] hover:border-[#5EEAD4] hover:text-[#5EEAD4]",
      ghost:
        "text-[#8B8D92] hover:text-[#5EEAD4] hover:bg-[rgba(94,234,212,0.05)]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#5EEAD4] focus-visible:outline-none",
          sizeMap[size],
          variantStyles[variant],
          className,
        )}
        aria-label={label}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
