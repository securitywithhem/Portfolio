import { profile } from "@/data/profile";
import { scenarioMetas } from "@/data/scenarios";
import { navLeaves, primaryNav } from "@/data/navigation";
import type { Profile, ScenarioMeta, NavLeaf } from "@/lib/types";
import type { PrimaryNavItem } from "@/data/navigation";

/** Data access layer. Thin accessors keep components decoupled from storage. */

export function getProfile(): Profile {
  return profile;
}

export function getScenarioMetas(): ScenarioMeta[] {
  return scenarioMetas;
}

export function getNavLeaves(): NavLeaf[] {
  return navLeaves;
}

export function getPrimaryNav(): PrimaryNavItem[] {
  return primaryNav;
}
