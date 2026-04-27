"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Environment } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

// ─── MOBILE SPHERE CONTROLS ──────────────────────────────────────────────────
// Three knobs — all mobile-only, desktop is never touched:
//
//   MOBILE_FOV    — higher = wider view = sphere appears smaller.
//                   Desktop FOV is 45. Raise to shrink, lower to grow.
//
//   MOBILE_SPHERE_Y — vertical position of the sphere in 3D scene units.
//                   0 = centred. Positive = moves sphere UP toward the top
//                   of the hero section. Negative = moves it down.
//                   Tune this to push the sphere into the upper portion of
//                   the mobile viewport.
//
//   Sphere args   — args={[radius, widthSegments, heightSegments]}
//                   Mobile uses [2, 32, 32]: same radius, half polygon count
//                   for faster GPU load. Lower the radius (first number) to
//                   make the sphere geometrically smaller.
const MOBILE_FOV      = 105; // ← sphere apparent size on mobile
const MOBILE_SPHERE_Y = 1.8; // ← sphere vertical offset (positive = up)
// ─────────────────────────────────────────────────────────────────────────────

const isMobileScreen = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

function FerrofluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mobile = isMobileScreen();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    meshRef.current.scale.x = 1 + Math.sin(time * 1) * 0.03;
    meshRef.current.scale.y = 1 + Math.cos(time * 1) * 0.03;
    meshRef.current.scale.z = 1 + Math.sin(time * 1.2) * 0.03;
  });

  // Mobile: 32×32 segments — half the polygon count → faster GPU load
  // Desktop: 64×64 segments — full quality
  // MOBILE_SPHERE_Y shifts the mesh upward so it sits in the top portion
  // of the hero section rather than dead-centre of the full wrapper.
  return (
    <Sphere ref={meshRef} args={mobile ? [2, 32, 32] : [2, 64, 64]} position={[0, mobile ? MOBILE_SPHERE_Y : 0, 0]}>
      <meshPhysicalMaterial
        color="#1a0033"
        emissive="#51436251"
        emissiveIntensity={0.4}
        metalness={0.05}
        roughness={0.8}
        envMapIntensity={0}
        clearcoat={0.05}
        clearcoatRoughness={0.05}
      />
    </Sphere>
  );
}

// Adjusts camera FOV dynamically based on viewport width so the sphere
// never appears cropped on narrow (mobile) screens.
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    camera.fov = size.width < 768 ? MOBILE_FOV : 45;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

// Derive the correct initial FOV before Canvas mounts so mobile never
// shows a one-frame pop with the wrong (desktop) field-of-view.
function getInitialFov() {
  return isMobileScreen() ? MOBILE_FOV : 45;
}

export function HeroVariant4Ferrofluid() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-90">
      <Canvas camera={{ position: [0, 0, 6], fov: getInitialFov() }}>
        <ResponsiveCamera />
        <Environment preset="dawn" />
        <ambientLight intensity={0.5} />
        {/* Main frontal light */}
        <directionalLight position={[0, 5, 5]} intensity={2} color="#ffffff" />

        {/* Dramatic Rim Lighting */}
        <spotLight position={[-4, 2, -4]} angle={0.5} penumbra={0.5} intensity={20} color="#ffffffff" />
        <spotLight position={[4, -2, -4]} angle={0.5} penumbra={0.5} intensity={20} color="#b560daff" />
        <spotLight position={[0, -4, -4]} angle={0.5} penumbra={0.5} intensity={20} color="#10cf16ff" />

        <FerrofluidMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}