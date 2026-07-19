"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CameraKeyframe } from "@/lib/types";
import { NODES, EDGES, nodeById } from "./architecture";
import { SceneLabel } from "../scene-label";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function world(x: number, y: number): THREE.Vector3 {
  return new THREE.Vector3((x - 50) / 9, (50 - y) / 13, 0);
}

const WORLD = new Map(NODES.map((n) => [n.id, world(n.x, n.y)]));

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

function ServiceNode({
  id,
  reached,
  focus,
  accent,
}: {
  id: string;
  reached: boolean;
  focus: boolean;
  accent: string;
}) {
  const pos = WORLD.get(id);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ring.current) ring.current.rotation.z = state.clock.elapsedTime * 0.6;
  });
  if (!pos) return null;
  return (
    <group position={pos}>
      <mesh scale={focus ? 1.15 : 1}>
        <boxGeometry args={[1.7, 0.85, 0.32]} />
        <meshStandardMaterial
          color={focus ? accent : "#15151a"}
          emissive={reached ? accent : "#26262c"}
          emissiveIntensity={reached ? (focus ? 2.2 : 1.0) : 0.2}
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>
      {focus && (
        <mesh ref={ring}>
          <torusGeometry args={[1.15, 0.03, 12, 40]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={2.4}
          />
        </mesh>
      )}
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

      {EDGES.map((e) => {
        const a = WORLD.get(e.from);
        const b = WORLD.get(e.to);
        const na = nodeById.get(e.from);
        const nb = nodeById.get(e.to);
        if (!a || !b || !na || !nb) return null;
        const reached = na.stage <= activeBeat && nb.stage <= activeBeat;
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
        <ServiceNode
          key={n.id}
          id={n.id}
          reached={n.stage <= activeBeat}
          focus={traced && Boolean(n.inspect)}
          accent={accent}
        />
      ))}

      {NODES.map((n) => {
        const pos = WORLD.get(n.id);
        if (!pos) return null;
        const focus = traced && Boolean(n.inspect);
        return (
          <SceneLabel
            key={`label-${n.id}`}
            position={pos}
            text={n.label}
            active={n.stage <= activeBeat || focus}
            accent={accent}
            offsetY={0}
          />
        );
      })}

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
 * Full-tier 3D environment for SC-04 — a cloud architecture graph. Procedural.
 * Camera scroll-scrubbed via GSAP; nodes/edges light per beat; the "inspect"
 * moment focuses the IAM node (scales it up with a rotating ring).
 */
export default function CloudScene({
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
