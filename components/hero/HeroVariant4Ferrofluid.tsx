"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FerrofluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Lowered from time * 2 to time * 1 (slower)
    // Lowered from * 0.1 to * 0.03 (less stretch)
    meshRef.current.scale.x = 1 + Math.sin(time * 1) * 0.03;
    meshRef.current.scale.y = 1 + Math.cos(time * 1) * 0.03;
    meshRef.current.scale.z = 1 + Math.sin(time * 1.2) * 0.03;
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshPhysicalMaterial 
        color="#1a0033"           // base tint — now matters because metalness is lower
        emissive="#51436251"        // THE FIX: injects purple that lighting can't wash out
        emissiveIntensity={0.4}   // tune 0.1–0.8 to taste
        metalness={0.05}          // was 0.8 — lowering this is what lets color survive
        roughness={0.8}
        envMapIntensity={0}     // bumped up slightly since metalness is lower
        clearcoat={0.05}
        clearcoatRoughness={0.05}
      />
    </Sphere>
  );
}

export function HeroVariant4Ferrofluid() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-90">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
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
