"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Icosahedron } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FractureMesh() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <group ref={meshRef}>
      <Icosahedron args={[2, 0]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0A0A0F" wireframe={true} emissive="#C84BFF" emissiveIntensity={0.5} />
      </Icosahedron>
      <Icosahedron args={[2.5, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7B2FFF" wireframe={true} transparent opacity={0.3} />
      </Icosahedron>
    </group>
  );
}

export function HeroVariant3Fracture() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <FractureMesh />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
