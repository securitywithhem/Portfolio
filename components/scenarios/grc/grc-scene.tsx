"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Edges } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraKeyframe } from "@/lib/types";
import { ENTRIES } from "./ledger";
import { SceneLabel } from "../scene-label";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOP_Y = 2.6;
const STEP_Y = 1.35;

function entryPos(index: number): THREE.Vector3 {
  return new THREE.Vector3(0, TOP_Y - index * STEP_Y, 0);
}

const WORLD = new Map(ENTRIES.map((e) => [e.id, entryPos(e.index)]));

function sampleCamera(keyframes: CameraKeyframe[], p: number) {
  const first = keyframes[0];
  if (!first) {
    return { pos: new THREE.Vector3(0, 0, 9), look: new THREE.Vector3() };
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

function LedgerBlock({
  id,
  reached,
  verified,
  accent,
}: {
  id: string;
  reached: boolean;
  verified: boolean;
  accent: string;
}) {
  const pos = WORLD.get(id);
  if (!pos) return null;
  // Surface stays dark always — state is signaled by the edge outline and a
  // low emissive tint, never by filling the block with the accent color
  // (that reads as a neon slab, not a technical panel).
  return (
    <mesh position={pos}>
      <boxGeometry args={[2.4, 0.8, 0.45]} />
      <meshStandardMaterial
        color="#111114"
        emissive={accent}
        emissiveIntensity={verified ? 0.22 : reached ? 0.08 : 0}
        roughness={0.6}
        metalness={0.05}
      />
      <Edges
        color={reached ? accent : "#3a3a42"}
        linewidth={verified ? 2 : 1}
      />
    </mesh>
  );
}

function VerifyPulse({ accent }: { accent: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const points = useMemo(
    () =>
      ENTRIES.map((e) => WORLD.get(e.id)).filter(Boolean) as THREE.Vector3[],
    [],
  );
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * 0.3) % 1;
    ref.current.position.copy(curve.getPoint(t));
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial
        color={accent}
        emissive={accent}
        emissiveIntensity={1.8}
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
    // Smoothly ease the look-at target too, so orientation doesn't snap.
    lookTarget.current.lerp(look, 0.12);
    camera.lookAt(lookTarget.current);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 4, 8]} intensity={40} />
      <pointLight position={[-5, -2, 4]} intensity={12} color={accent} />

      {ENTRIES.slice(1).map((e, i) => {
        const a = WORLD.get(ENTRIES[i]?.id ?? "");
        const b = WORLD.get(e.id);
        if (!a || !b) return null;
        const prev = ENTRIES[i];
        const reached =
          e.stage <= activeBeat || (prev ? prev.stage <= activeBeat : false);
        return (
          <Line
            key={`link-${e.id}`}
            points={[a, b]}
            color={reached ? accent : "#33333a"}
            lineWidth={reached ? 1.4 : 0.75}
            transparent
            opacity={reached ? 0.95 : 0.5}
          />
        );
      })}

      {ENTRIES.map((e) => (
        <LedgerBlock
          key={e.id}
          id={e.id}
          reached={e.stage <= activeBeat}
          verified={traced && e.stage <= activeBeat}
          accent={accent}
        />
      ))}

      {ENTRIES.map((e) => {
        const pos = WORLD.get(e.id);
        if (!pos) return null;
        return (
          <SceneLabel
            key={`label-${e.id}`}
            position={pos}
            text={e.short}
            active={e.stage <= activeBeat}
            accent={accent}
            offsetY={-0.65}
          />
        );
      })}

      {traced && <VerifyPulse accent={accent} />}

      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/**
 * Full-tier 3D environment for SC-02 — a descending hash-chained audit ledger.
 * Procedural. Camera scroll-scrubbed via GSAP; blocks light per beat; the
 * "trace" moment sends a verification pulse down the chain.
 */
export default function GrcScene({
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
      camera={{ position: [0, 0, 9], fov: 45 }}
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
