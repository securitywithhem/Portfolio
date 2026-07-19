import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Industrial button. Sharp 2px radius, 1px hairline structure, accent fill for
 * primary intent. `buttonVariants` is exported so links (<a>/<Link>) can adopt
 * the same shape without an asChild/Slot dependency.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-on hover:brightness-110 active:brightness-95",
        outline:
          "border border-line-strong bg-transparent text-fg hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-fg-muted hover:bg-surface-2 hover:text-fg",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
