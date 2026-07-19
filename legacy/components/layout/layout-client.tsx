"use client";

import { ReactNode } from "react";
import { useCursor } from "@/hooks/use-cursor";

export function LayoutClient({ children }: { children: ReactNode }) {
  useCursor();

  return <>{children}</>;
}
