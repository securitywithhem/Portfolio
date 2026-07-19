"use client";

import dynamic from "next/dynamic";
import type { ComponentType, RefObject } from "react";
import type { CameraKeyframe } from "@/lib/types";
import { OffensiveFallback } from "./offensive/offensive-fallback";
import { GrcFallback } from "./grc/grc-fallback";
import { AiFallback } from "./ai/ai-fallback";

/** Uniform props every scenario's 2D fallback visual accepts. */
export interface ScenarioVisualProps {
  activeBeat: number;
  traced: boolean;
}

/** Uniform props every scenario's 3D scene accepts. */
export interface ScenarioSceneProps {
  targetRef: RefObject<HTMLElement | null>;
  keyframes: CameraKeyframe[];
  activeBeat: number;
  traced: boolean;
  accent: string;
}

interface VisualEntry {
  Fallback: ComponentType<ScenarioVisualProps>;
  /** Dynamically imported (ssr:false) so each 3D chunk stays code-split. */
  Scene: ComponentType<ScenarioSceneProps>;
}

/**
 * Per-scenario visual registry. Fallbacks are static (lightweight SVG, needed
 * immediately / as the Suspense fallback); scenes are dynamic so a visitor only
 * downloads the 3D chunk for scenarios they actually reach on the full tier.
 */
export const scenarioVisuals: Record<string, VisualEntry> = {
  "scenario-offensive": {
    Fallback: OffensiveFallback,
    Scene: dynamic(() => import("./offensive/offensive-scene"), { ssr: false }),
  },
  "scenario-grc": {
    Fallback: GrcFallback,
    Scene: dynamic(() => import("./grc/grc-scene"), { ssr: false }),
  },
  "scenario-ai": {
    Fallback: AiFallback,
    Scene: dynamic(() => import("./ai/ai-scene"), { ssr: false }),
  },
};
