"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";

const Globe = () => {
  const globeRef = useRef();
  const pointsRef = useRef();
  const arcsGroup = useRef();

  // 1. Generate Points (Talent Nodes)
  const { points, colors } = useMemo(() => {
    const p = new Float32Array(500 * 3);
    const c = new Float32Array(500 * 3);
    const lime = new THREE.Color("#bef264");
    const emerald = new THREE.Color("#10b981");
    const tempColor = new THREE.Color();

    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2; // Exact surface

      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = radius * Math.cos(phi);

      // Gradient mixing based on Y position (poles vs equator)
      tempColor.lerpColors(emerald, lime, Math.random());
      c[i * 3] = tempColor.r;
      c[i * 3 + 1] = tempColor.g;
      c[i * 3 + 2] = tempColor.b;
    }
    return { points: p, colors: c };
  }, []);

  // 2. Generate Data Arcs (Flying lines between random points)
  const arcs = useMemo(() => {
    return Array.from({ length: 15 }).map(() => {
      const startPhi = Math.acos(Math.random() * 2 - 1);
      const startTheta = Math.random() * Math.PI * 2;
      const endPhi = Math.acos(Math.random() * 2 - 1);
      const endTheta = Math.random() * Math.PI * 2;
      
      const start = new THREE.Vector3().setFromSphericalCoords(2, startPhi, startTheta);
      const end = new THREE.Vector3().setFromSphericalCoords(2, endPhi, endTheta);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.8); // Arc height

      return { start, end, mid };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.05;
    if (pointsRef.current) {
        pointsRef.current.rotation.y = t * 0.05;
        // Subtle breathing effect
        pointsRef.current.scale.setScalar(1 + Math.sin(t) * 0.005); 
    }
    if (arcsGroup.current) arcsGroup.current.rotation.y = t * 0.05;
  });

  return (
    <group>
      {/* A. The Dark Core sphere to block lines behind it */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* B. The Wireframe Globe */}
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[2, 24, 24]} />
          <meshBasicMaterial color="#064e3b" wireframe transparent opacity={0.15} />
        </mesh>
      </group>

      {/* C. The Talent Points */}
      <group ref={pointsRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={500} array={points} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={500} array={colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} sizeAttenuation map={null} />
        </points>
      </group>

      {/* D. Flying Data Arcs */}
      <group ref={arcsGroup}>
        {arcs.map((arc, i) => (
          <QuadraticBezierLine
            key={i}
            start={arc.start}
            end={arc.end}
            mid={arc.mid}
            color={i % 2 === 0 ? "#bef264" : "#10b981"}
            lineWidth={1}
            transparent
            opacity={0.4}
          />
        ))}
      </group>

      {/* E. Atmosphere Glow (Holographic feel) */}
      <mesh>
         <sphereGeometry args={[2.2, 32, 32]} />
         <meshBasicMaterial color="#bef264" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

export default function TalentGlobe() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] bg-gradient-to-b from-black via-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 relative shadow-2xl shadow-lime-900/10">
      
      {/* Overlay UI */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="text-[10px] font-mono text-lime-500 bg-black/50 px-2 py-1 rounded border border-lime-900 w-fit">
          LIVE NODES: 500+
        </div>
        <div className="text-[10px] font-mono text-emerald-500 bg-black/50 px-2 py-1 rounded border border-emerald-900 w-fit">
          STATUS: ONLINE
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <Globe />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
      </Canvas>
    </div>
  );
}
