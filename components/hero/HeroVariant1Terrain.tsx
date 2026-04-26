"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function TerrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.x = -Math.PI / 3;
  });

  return (
    <mesh ref={meshRef} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <meshStandardMaterial 
        color="#7B2FFF" 
        wireframe={true} 
        emissive="#7B2FFF"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export function HeroVariant1Terrain() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <TerrainMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
