"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 1. The Dynamic Bar Chart
const LiveGraph = () => {
  const meshRef = useRef();
  const count = 15; // 15x15 grid
  const separation = 0.6;
  
  // Create a dummy object to handle matrix calculations (better performance than individual meshes)
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Color palette: Cyan to Purple gradient
  const color = new THREE.Color();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    let i = 0;

    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // 2. Math to create the "Predictive Wave" effect
        // Using Sine waves to simulate market volatility
        const xOffset = (x - count / 2) * separation;
        const zOffset = (z - count / 2) * separation;
        
        // Calculate height based on time and position
        const height = 
          Math.sin(x / 2 + t) + 
          Math.sin(z / 2 + t) + 
          Math.sin((x + z) / 2 + t) + 2; // +2 ensures positive height

        // Position
        dummy.position.set(xOffset, height / 2 - 2, zOffset);
        dummy.scale.set(0.5, height, 0.5);
        dummy.updateMatrix();

        // Apply to the instanced mesh
        meshRef.current.setMatrixAt(i, dummy.matrix);

        // Dynamic Coloring: Brighten the colors significantly
        const hue = 0.6 - (height * 0.1); // Blue to Cyan
        meshRef.current.setColorAt(i, color.setHSL(hue, 1, 0.7)); // Increased Lightness to 0.7
        
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count * count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        vertexColors 
        emissive="#000044" 
        emissiveIntensity={0.5} 
        roughness={0.2} 
        metalness={0.8} 
      />
    </instancedMesh>
  );
};

export default function DataViz3D() {
  return (
    <div className="h-full w-full min-h-[400px]">
      <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
        {/* Lights */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        
        <LiveGraph />
        
        {/* Helper grid for that "Technical Blueprint" look */}
        <gridHelper args={[20, 20, 0x444444, 0x222222]} position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
}
