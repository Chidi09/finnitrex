"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, Line } from "@react-three/drei";
import * as THREE from "three";

// 1. The Central Core (The Database/Back-end)
const Core = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial 
          color="#00ffff" 
          roughness={0} 
          metalness={0.8} 
          transmission={0.6} 
          thickness={2} 
          emissive="#0044aa"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh scale={[1.1, 1.1, 1.1]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.3} />
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
              <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
            </mesh>
            <mesh scale={[1.05, 1.05, 1.05]}>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.5} />
            </mesh>
            
            {/* B. Text Label */}
            <Text
              position={[0, 1.2, 0]}
              fontSize={0.25}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Bold.ttf" // Falls back if not found, standard sans
            >
              {mod.label}
            </Text>
          </Float>

          {/* C. Connection Line to Center (Computed relative to group rotation in world space normally, 
              but since we rotate the group, the local relationship stays static, simplifying the math) 
          */}
          <Line
            points={[[0, 0, 0], [-mod.x, -mod.y, -mod.z]]} // Line points back to 0,0,0 (Center)
            color={i % 2 === 0 ? "#00ffff" : "#a855f7"}
            transparent
            opacity={0.3}
            lineWidth={1}
          />
        </group>
      ))}
    </group>
  );
};

export default function LMSStructure() {
  return (
    <div className="h-[600px] w-full bg-gradient-to-b from-gray-900 via-black to-black rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative">
      
      {/* Overlay Text */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="text-xs font-mono text-cyan-500 mb-1">SYSTEM ARCHITECTURE_</div>
        <div className="text-white font-bold text-xl">Modular LMS Stack</div>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={1} color="#a855f7" />
        
        <Core />
        <Modules />
        
        {/* Animated Particles in background */}
        <gridHelper args={[20, 20, 0x222222, 0x111111]} position={[0, -3, 0]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
