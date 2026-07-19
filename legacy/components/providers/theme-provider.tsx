"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Class-strategy dark mode. next-themes injects its standard inline
 * no-flash script (the one sanctioned exception to the CSP plan) and
 * persists the choice in localStorage.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
