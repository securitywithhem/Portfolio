/**
 * Shared network-topology graph for SC-01 (Offensive Security). Both the 3D
 * scene and the 2D fallback render THIS data, so the environment is identical
 * across tiers. Coordinates are normalized 0..100 (2D %); the 3D scene maps
 * them into world space.
 *
 * `stage` ties a node to a narrative beat (0 recon · 1 exploit · 2 report) so
 * each tier can light the right nodes as beats activate. `killChain` is the
 * ordered path the "trace" interactive moment follows.
 */
export interface TopoNode {
  id: string;
  label: string;
  x: number;
  y: number;
  stage: 0 | 1 | 2;
}

export interface TopoEdge {
  from: string;
  to: string;
}

export const NODES: TopoNode[] = [
  { id: "gw", label: "GATEWAY", x: 10, y: 50, stage: 0 },
  { id: "web", label: "WEB", x: 30, y: 24, stage: 0 },
  { id: "auth", label: "AUTH", x: 30, y: 74, stage: 0 },
  { id: "api", label: "API", x: 54, y: 46, stage: 1 },
  { id: "svc", label: "SERVICE", x: 56, y: 82, stage: 1 },
  { id: "adm", label: "ADMIN", x: 78, y: 28, stage: 1 },
  { id: "rep", label: "REMEDIATION", x: 92, y: 58, stage: 2 },
];

export const EDGES: TopoEdge[] = [
  { from: "gw", to: "web" },
  { from: "gw", to: "auth" },
  { from: "web", to: "api" },
  { from: "auth", to: "api" },
  { from: "api", to: "svc" },
  { from: "api", to: "adm" },
  { from: "adm", to: "rep" },
  { from: "svc", to: "rep" },
];

/** Ordered kill-chain path: recon foothold → exploit → reported fix. */
export const KILL_CHAIN: string[] = ["gw", "auth", "api", "adm", "rep"];

export const nodeById = new Map(NODES.map((n) => [n.id, n]));

/** Edge ids (from-to) that make up the kill-chain path, for trace highlighting. */
export const KILL_CHAIN_EDGES = new Set(
  KILL_CHAIN.slice(0, -1).map((id, i) => `${id}-${KILL_CHAIN[i + 1]}`),
);

export function edgeKey(from: string, to: string): string {
  return `${from}-${to}`;
}
