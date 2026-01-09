"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, Line } from "@react-three/drei";
import * as THREE from "three";

// 1. The Central Core (The Database/Back-end)
const Core = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Outer Glow Cage */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#bef264" wireframe transparent opacity={0.3} />
      </mesh>
      {/* Inner Solid Core - Self Emissive so it's never black */}
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#bef264" wireframe={false} transparent opacity={0.9} />
      </mesh>
    </Float>
  );
};

// 2. The Orbiting Modules (Features: Auth, Video, Analytics, etc.)
const Modules = ({ count = 6, radius = 3.5 }) => {
  const group = useRef();
  
  // Create static positions for the modules in a circle
  const modules = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 2, // Random height variation
        z: Math.sin(angle) * radius,
        label: ["AUTH", "DATA", "VIDEO", "UI/UX", "API", "CLOUD"][i]
      };
    });
  }, [count, radius]);

  useFrame((state) => {
    // Rotate the whole system slowly
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group}>
      {modules.map((mod, i) => (
        <group key={i} position={[mod.x, mod.y, mod.z]}>
          
          {/* A. The Module Box */}
          <Float speed={4} rotationIntensity={1} floatIntensity={1}>
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              {/* Visible Material */}
              <meshBasicMaterial color="#222" wireframe /> 
            </mesh>
            <mesh scale={[1.05, 1.05, 1.05]}>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#bef264" : "#10b981"} wireframe />
            </mesh>
            <Text
              position={[0, 1.2, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {mod.label}
            </Text>
          </Float>

          {/* C. Connection Line to Center */}
          <Line
            points={[[0, 0, 0], [-mod.x, -mod.y, -mod.z]]}
            color={i % 2 === 0 ? "#bef264" : "#10b981"}
            transparent
            opacity={0.5}
            lineWidth={1}
          />
        </group>
      ))}
    </group>
  );
};

export default function LMSStructure() {
  return (
    <div className="h-[500px] w-full bg-gray-900/20 rounded-xl overflow-hidden border border-gray-800 relative">
      
      {/* Overlay Text */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="text-xs font-mono text-lime-400 mb-1">SYSTEM ARCHITECTURE_</div>
        <div className="text-white font-bold text-xl">Modular LMS Stack</div>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={2} /> {/* Increased light */}
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Core />
        <Modules />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
