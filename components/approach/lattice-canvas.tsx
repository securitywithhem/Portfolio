"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { buildLattice, MAX_DELAY } from "./lattice-geometry";

// The section is a full-bleed dark ink plate, so the lattice is drawn in paper
// rather than ink — light line-art on dark ground.
const STROKE = "#faf9f7";

/** Ease-out cubic — the resolve decelerates into place rather than snapping. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Lattice({ progress }: { progress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Geometries are built once and share a single position attribute, so one
  // needsUpdate per frame drives both the points and the edges.
  const { pointGeo, lineGeo, data, positions } = useMemo(() => {
    const d = buildLattice();
    const positions = new Float32Array(d.scatter);
    const attr = new THREE.BufferAttribute(positions, 3);
    attr.setUsage(THREE.DynamicDrawUsage);

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", attr);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", attr);
    lineGeo.setIndex(new THREE.BufferAttribute(d.edges, 1));

    return { pointGeo, lineGeo, data: d, positions };
  }, []);

  useEffect(() => {
    return () => {
      pointGeo.dispose();
      lineGeo.dispose();
    };
  }, [pointGeo, lineGeo]);

  useFrame((state) => {
    const p = Math.min(1, Math.max(0, progress.get()));
    const time = state.clock.elapsedTime;
    const attr = pointGeo.getAttribute("position") as THREE.BufferAttribute;
    const { scatter, lattice, delays } = data;
    const span = 1 - MAX_DELAY;

    for (let i = 0; i < delays.length; i++) {
      const t = easeOut(
        Math.min(1, Math.max(0, (p - (delays[i] ?? 0)) / span)),
      );
      const i3 = i * 3;

      // Unresolved points drift; the drift is scaled out as they settle, so the
      // lattice arrives perfectly still rather than jittering forever.
      const drift = (1 - t) * 0.28;

      for (let axis = 0; axis < 3; axis++) {
        const k = i3 + axis;
        const from = scatter[k] ?? 0;
        const to = lattice[k] ?? 0;
        const wobble = Math.sin(
          time * (0.6 - axis * 0.1) + i * (1 + axis * 0.3),
        );
        positions[k] = from + (to - from) * t + wobble * drift;
      }
    }
    attr.needsUpdate = true;

    if (groupRef.current) {
      // Slow yaw across the scroll plus a light cursor parallax — present, not
      // demanding. Lerped so pointer moves never snap.
      const targetY = -0.5 + p * 0.75 + pointer.x * 0.16;
      const targetX = pointer.y * -0.1 + 0.06;
      groupRef.current.rotation.y +=
        (targetY - groupRef.current.rotation.y) * 0.06;
      groupRef.current.rotation.x +=
        (targetX - groupRef.current.rotation.x) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeo}>
        {/* Light on dark reads heavier than dark on light at equal alpha, so
            both tiers sit lower than they did on paper — precise, not glowing. */}
        <lineBasicMaterial
          color={STROKE}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </lineSegments>
      <points geometry={pointGeo}>
        <pointsMaterial
          color={STROKE}
          size={0.075}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Full-tier set piece. Line-art only — no lights, no PBR materials, no
 * postprocessing — which is both the correct look on the ink plate and cheap
 * enough to hold 60fps on the mid-tier machines that pass capability detection.
 *
 * Only mounted when `lib/capability` reports the full tier, so `three` stays
 * out of the path for reduced-motion, small-viewport and no-WebGL2 visitors.
 */
export default function LatticeCanvas({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <Lattice progress={progress} />
    </Canvas>
  );
}
