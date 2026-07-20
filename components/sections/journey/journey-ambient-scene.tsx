"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const ACCENT = "#ff5a1f";

function Chain({ count }: { count: number }) {
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0;
      // Gentle serpentine drift so the chain reads as organic, not a ruler.
      const x = Math.sin(t * Math.PI * 1.6) * 0.55;
      const y = 4.6 - t * 9.2;
      arr.push(new THREE.Vector3(x, y, 0));
    }
    return arr;
  }, [count]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const pulseRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (pulseRef.current) {
      const t = (state.clock.elapsedTime * 0.08) % 1;
      pulseRef.current.position.copy(curve.getPoint(t));
    }
    if (groupRef.current) {
      // Barely-there ambient drift — atmosphere, not a focal animation.
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <Line
        points={points}
        color={ACCENT}
        lineWidth={1}
        transparent
        opacity={0.35}
      />
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.9}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}

/**
 * Ambient background scene for the Journey section — a soft glowing chain with
 * a light pulse traveling top-to-bottom (chronological progress), echoing the
 * Scenario 3D language without the full two-tier/GSAP-scrub apparatus (Journey
 * is not a Scenario). Autoplay-only (no ScrollTrigger), low bloom, low opacity
 * — atmosphere sitting behind readable text, never competing with it.
 */
export default function JourneyAmbientScene({ count }: { count: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      className="h-full w-full"
    >
      <ambientLight intensity={0.2} />
      <Chain count={count} />
      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
