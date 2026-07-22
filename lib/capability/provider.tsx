"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  detectCapability,
  DEFAULT_CAPABILITY,
  type CapabilityResult,
} from "./detect";

/**
 * Session cache — the tier decision is made once and reused for the whole
 * session, even across route changes / provider remounts (App Flow: "decision
 * is made once, cached for the session").
 */
let cachedResult: CapabilityResult | null = null;

interface CapabilityState {
  capability: CapabilityResult;
  /** False until client detection has run — visual tiers wait for this. */
  detected: boolean;
}

const CapabilityContext = createContext<CapabilityState>({
  capability: DEFAULT_CAPABILITY,
  detected: false,
});

export function CapabilityProvider({ children }: { children: ReactNode }) {
  // Initializer runs identically on server and first client render (cachedResult
  // is null there) → fallback default → no hydration mismatch.
  const [state, setState] = useState<CapabilityState>(() =>
    cachedResult
      ? { capability: cachedResult, detected: true }
      : { capability: DEFAULT_CAPABILITY, detected: false },
  );

  useEffect(() => {
    if (cachedResult) return;
    cachedResult = detectCapability();
    setState({ capability: cachedResult, detected: true });
  }, []);

  return (
    <CapabilityContext.Provider value={state}>
      {children}
    </CapabilityContext.Provider>
  );
}

export function useCapability(): CapabilityState {
  return useContext(CapabilityContext);
}
