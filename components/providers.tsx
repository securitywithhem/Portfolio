"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";

/**
 * App-wide providers: class-strategy dark mode (persisted by next-themes,
 * no flash of wrong theme) and global `prefers-reduced-motion` support for
 * every Framer Motion preset.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
