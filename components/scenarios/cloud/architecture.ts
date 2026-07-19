/**
 * Shared cloud-architecture graph for SC-04 (Cloud & Infrastructure / AWS). Both
 * tiers render THIS data. `stage` ties a node to a beat (0 containerize · 1
 * deploy · 2 secure). The "inspect" interactive moment focuses the security node
 * and surfaces its detail. Coordinates normalized 0..100 (2D %).
 */
export interface CloudNode {
  id: string;
  label: string;
  x: number;
  y: number;
  stage: 0 | 1 | 2;
  /** The inspectable node (the interactive focus). */
  inspect?: boolean;
  detail?: string;
}

export interface CloudEdge {
  from: string;
  to: string;
}

export const NODES: CloudNode[] = [
  { id: "cf", label: "CloudFront", x: 12, y: 50, stage: 1 },
  { id: "alb", label: "ALB", x: 32, y: 50, stage: 1 },
  { id: "ecs", label: "ECS · Docker", x: 54, y: 28, stage: 0 },
  { id: "api", label: "FastAPI", x: 54, y: 72, stage: 0 },
  { id: "data", label: "RDS · S3", x: 76, y: 50, stage: 1 },
  {
    id: "iam",
    label: "IAM",
    x: 92,
    y: 50,
    stage: 2,
    inspect: true,
    detail: "Least-privilege roles · encryption at rest · private subnets",
  },
];

export const EDGES: CloudEdge[] = [
  { from: "cf", to: "alb" },
  { from: "alb", to: "ecs" },
  { from: "alb", to: "api" },
  { from: "ecs", to: "data" },
  { from: "api", to: "data" },
  { from: "data", to: "iam" },
];

export const nodeById = new Map(NODES.map((n) => [n.id, n]));

const focus = NODES.find((n) => n.inspect);
if (!focus) {
  throw new Error("cloud architecture must define an inspectable node");
}
/** The node the "inspect" moment focuses. */
export const inspectNode: CloudNode = focus;
