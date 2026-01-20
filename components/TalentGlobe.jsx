"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Globe = () => {
  const globeRef = useRef();
  const pointsRef = useRef();
  
  // Create globe points (talent locations)
  const points = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    const colors = new Float32Array(300 * 3);
    const lime = new THREE.Color("#bef264");
    const emerald = new THREE.Color("#10b981");
    
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 0.1;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Mix lime and emerald colors
      const color = i % 2 === 0 ? lime : emerald;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      {/* Globe wireframe */}
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial
            color="#051a00"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Inner glow */}
        <mesh>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial
            color="#bef264"
            transparent
            opacity={0.05}
          />
        </mesh>
      </group>
      
      {/* Talent points */}
      <group ref={pointsRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={300}
              array={points.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={300}
              array={points.colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            vertexColors
            transparent
            opacity={0.8}
            sizeAttenuation={true}
          />
        </points>
      </group>
      
      {/* Connection lines between points */}
      <group ref={globeRef}>
        {Array.from({ length: 50 }).map((_, i) => {
          const theta1 = (i / 50) * Math.PI * 2;
          const phi1 = Math.acos((i / 50) * 2 - 1);
          const radius1 = 2;
          const x1 = radius1 * Math.sin(phi1) * Math.cos(theta1);
          const y1 = radius1 * Math.sin(phi1) * Math.sin(theta1);
          const z1 = radius1 * Math.cos(phi1);
          
          const theta2 = ((i + 5) / 50) * Math.PI * 2;
          const phi2 = Math.acos(((i + 5) / 50) * 2 - 1);
          const radius2 = 2;
          const x2 = radius2 * Math.sin(phi2) * Math.cos(theta2);
          const y2 = radius2 * Math.sin(phi2) * Math.sin(theta2);
          const z2 = radius2 * Math.cos(phi2);
          
          return (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([x1, y1, z1, x2, y2, z2])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color={i % 2 === 0 ? "#bef264" : "#10b981"}
                transparent
                opacity={0.2}
              />
            </line>
          );
        })}
      </group>
    </group>
  );
};

export default function TalentGlobe() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] bg-gradient-to-b from-black via-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 relative">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }} 
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#bef264" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#10b981" />
        <Globe />
      </Canvas>
    </div>
  );
}
