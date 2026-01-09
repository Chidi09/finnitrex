"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LiveGraph = () => {
  const meshRef = useRef();
  const count = 20; // Increased resolution for better look
  const separation = 0.5;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = new THREE.Color();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    let i = 0;

    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const xOffset = (x - count / 2) * separation;
        const zOffset = (z - count / 2) * separation;
        
        // More complex wave math for a "liquid market" look
        const height = 
          Math.sin(x * 0.3 + t) * 1.5 + 
          Math.sin(z * 0.5 + t * 0.5) * 1.5 + 
          Math.sin((x + z) * 0.2 + t) * 0.5 + 2.5;

        dummy.position.set(xOffset, height * 0.3 - 2, zOffset);
        dummy.scale.set(0.4, height, 0.4);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);

        // SLIME LIME COLOR LOGIC
        // Low = Lime (#bef264), High = Emerald (#10b981)
        // We use lerp to blend between two specific glowing colors
        const intensity = Math.max(0, Math.min(1, (height - 1) / 4));
        const hue = 0.25 + (intensity * 0.05); // 0.25 is Green/Lime ish in HSL
        color.setHSL(hue, 1, 0.5);
        
        meshRef.current.setColorAt(i, color);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count * count]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* High emissive intensity makes it glow even in dark scenes */}
      <meshStandardMaterial vertexColors roughness={0.1} metalness={0.8} emissiveIntensity={0.5} />
    </instancedMesh>
  );
};

export default function DataViz3D() {
  return (
    <div className="h-full w-full min-h-[400px] bg-gray-900/50 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#bef264" />
        <pointLight position={[-10, -5, -10]} intensity={2} color="#ffffff" />
        
        <LiveGraph />
        
        {/* Animated floor grid for depth */}
        <gridHelper args={[20, 20, 0x333333, 0x111111]} position={[0, -2.5, 0]} />
      </Canvas>
    </div>
  );
}
