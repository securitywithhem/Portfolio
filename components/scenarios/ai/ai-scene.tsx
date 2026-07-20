"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraKeyframe } from "@/lib/types";
import { FIELDS, gridCell } from "./vault";
import { SceneLabel } from "../scene-label";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COLS_X = [-1.7, 1.7];
const ROWS_Y = [2.1, 0, -2.1];

function panelPos(index: number): THREE.Vector3 {
  const { col, row } = gridCell(index);
  return new THREE.Vector3(COLS_X[col] ?? 0, ROWS_Y[row] ?? 0, 0);
}

const WORLD = FIELDS.map((f, i) => ({ field: f, pos: panelPos(i) }));

function sampleCamera(keyframes: CameraKeyframe[], p: number) {
  const first = keyframes[0];
  if (!first) {
    return { pos: new THREE.Vector3(0, 0, 8), look: new THREE.Vector3() };
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

function Panel({
  pos,
  reached,
  revealed,
  accent,
}: {
  pos: THREE.Vector3;
  reached: boolean;
  revealed: boolean;
  accent: string;
}) {
  // Surface stays dark always; state reads through the edge outline and a low
  // emissive tint. The lock/unlock story is carried by the label text itself
  // (cipher -> plaintext on reveal), not a separate glowing bar mesh.
  return (
    <group position={pos}>
      <mesh>
        <boxGeometry args={[2.8, 1.7, 0.16]} />
        <meshStandardMaterial
          color="#111114"
          emissive={accent}
          emissiveIntensity={revealed ? 0.22 : reached ? 0.08 : 0}
          roughness={0.6}
          metalness={0.05}
        />
        <Edges
          color={reached ? accent : "#3a3a42"}
          linewidth={revealed ? 2 : 1}
        />
      </mesh>
    </group>
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
      <pointLight position={[4, 4, 8]} intensity={40} />
      <pointLight position={[-4, -3, 5]} intensity={14} color={accent} />

      {WORLD.map(({ field, pos }) => {
        const reached = field.stage <= activeBeat;
        return (
          <Panel
            key={field.id}
            pos={pos}
            reached={reached}
            revealed={traced && reached}
            accent={accent}
          />
        );
      })}

      {WORLD.map(({ field, pos }) => {
        const reached = field.stage <= activeBeat;
        const revealed = traced && reached;
        return (
          <SceneLabel
            key={`label-${field.id}`}
            position={pos}
            text={revealed ? field.plain : field.label}
            active={reached}
            accent={accent}
            offsetY={-1.1}
          />
        );
      })}

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
 * Full-tier 3D environment for SC-03 — a grid of encrypted vault panels.
 * Procedural. Camera scroll-scrubbed via GSAP; panels light per beat; the
 * "reveal" moment unlocks reached panels (lock bar dims, panel brightens).
 */
export default function AiScene({
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
      scrub: 0.8,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, [targetRef]);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
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
