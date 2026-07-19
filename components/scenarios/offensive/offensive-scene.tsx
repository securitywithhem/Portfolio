"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraKeyframe } from "@/lib/types";
import {
  NODES,
  EDGES,
  KILL_CHAIN,
  nodeById,
  edgeKey,
  KILL_CHAIN_EDGES,
} from "./topology";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Map a normalized topology node (0..100) into world space. */
function world(x: number, y: number, i: number): [number, number, number] {
  return [(x - 50) / 9, (48 - y) / 11, ((i % 3) - 1) * 0.5];
}

const WORLD = new Map(
  NODES.map((n, i) => [n.id, new THREE.Vector3(...world(n.x, n.y, i))]),
);

function sampleCamera(keyframes: CameraKeyframe[], p: number) {
  const first = keyframes[0];
  if (!first) {
    return { pos: new THREE.Vector3(0, 1.5, 9), look: new THREE.Vector3() };
  }
  let a = first;
  let b = keyframes[keyframes.length - 1] ?? first;
  for (let i = 0; i < keyframes.length - 1; i++) {
    const k = keyframes[i];
    const n = keyframes[i + 1];
    if (k && n && p >= k.progress && p <= n.progress) {
      a = k;
      b = n;
      break;
    }
  }
  const span = b.progress - a.progress || 1;
  const t = THREE.MathUtils.clamp((p - a.progress) / span, 0, 1);
  const pos = new THREE.Vector3(...a.position).lerp(
    new THREE.Vector3(...b.position),
    t,
  );
  const look = new THREE.Vector3(...a.lookAt).lerp(
    new THREE.Vector3(...b.lookAt),
    t,
  );
  return { pos, look };
}

function Node({
  id,
  reached,
  highlight,
  accent,
}: {
  id: string;
  reached: boolean;
  highlight: boolean;
  accent: string;
}) {
  const pos = WORLD.get(id);
  if (!pos) return null;
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.18, 24, 24]} />
      <meshStandardMaterial
        color={highlight ? accent : "#15151a"}
        emissive={reached ? accent : "#26262c"}
        emissiveIntensity={reached ? (highlight ? 2.4 : 1.3) : 0.25}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

function TraceMarker({ accent }: { accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const points = useMemo(
    () =>
      KILL_CHAIN.map((id) => WORLD.get(id)).filter(Boolean) as THREE.Vector3[],
    [],
  );
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * 0.25) % 1;
    ref.current.position.copy(curve.getPoint(t));
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={accent}
        emissive={accent}
        emissiveIntensity={3}
      />
    </mesh>
  );
}

function SceneContent({
  progressRef,
  keyframes,
  activeBeat,
  traced,
  accent,
}: {
  progressRef: RefObject<number>;
  keyframes: CameraKeyframe[];
  activeBeat: number;
  traced: boolean;
  accent: string;
}) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  useFrame(() => {
    const { pos, look } = sampleCamera(keyframes, progressRef.current);
    camera.position.lerp(pos, 0.12);
    lookTarget.current.lerp(look, 0.12);
    camera.lookAt(lookTarget.current);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 6, 8]} intensity={40} />
      <pointLight position={[-6, -3, 4]} intensity={12} color={accent} />

      {EDGES.map((e) => {
        const a = WORLD.get(e.from);
        const b = WORLD.get(e.to);
        const na = nodeById.get(e.from);
        const nb = nodeById.get(e.to);
        if (!a || !b || !na || !nb) return null;
        const isKill = KILL_CHAIN_EDGES.has(edgeKey(e.from, e.to));
        const reached =
          isKill && (na.stage <= activeBeat || nb.stage <= activeBeat);
        return (
          <Line
            key={`${e.from}-${e.to}`}
            points={[a, b]}
            color={reached ? accent : "#33333a"}
            lineWidth={reached ? 1.4 : 0.75}
            transparent
            opacity={reached ? 0.95 : 0.5}
          />
        );
      })}

      {NODES.map((n) => (
        <Node
          key={n.id}
          id={n.id}
          reached={n.stage <= activeBeat}
          highlight={traced && KILL_CHAIN.includes(n.id)}
          accent={accent}
        />
      ))}

      {traced && <TraceMarker accent={accent} />}

      <EffectComposer>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/**
 * Full-tier 3D environment for SC-01. Procedural (no .glb) — keeps the Phase 2.5
 * bundle honest while proving the pattern. Camera is scroll-scrubbed via GSAP
 * ScrollTrigger (bound to the scenario section); node/edge state follows the
 * active beat; the "trace" moment sends a marker along the kill chain.
 */
export default function OffensiveScene({
  targetRef,
  keyframes,
  activeBeat,
  traced,
  accent,
}: {
  targetRef: RefObject<HTMLElement | null>;
  keyframes: CameraKeyframe[];
  activeBeat: number;
  traced: boolean;
  accent: string;
}) {
  const progressRef = useRef(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      // Numeric scrub adds ~0.8s inertial catch-up → smoother than direct.
      scrub: 0.8,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, [targetRef]);

  return (
    <Canvas
      camera={{ position: [0, 1.5, 9], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="h-full w-full"
    >
      <SceneContent
        progressRef={progressRef}
        keyframes={keyframes}
        activeBeat={activeBeat}
        traced={traced}
        accent={accent}
      />
    </Canvas>
  );
}
