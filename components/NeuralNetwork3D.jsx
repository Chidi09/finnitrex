"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NeuralNodes = () => {
  const groupRef = useRef();
  const nodes = useRef([]);
  
  // Create random nodes
  if (nodes.current.length === 0) {
    for (let i = 0; i < 50; i++) {
      nodes.current.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        color: Math.random() > 0.5 ? "#bef264" : "#10b981",
      });
    }
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.current.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Connections */}
      {nodes.current.slice(0, 20).map((node, i) => {
        if (i % 2 === 0 && nodes.current[i + 1]) {
          const nextNode = nodes.current[i + 1];
          return (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    node.position.x,
                    node.position.y,
                    node.position.z,
                    nextNode.position.x,
                    nextNode.position.y,
                    nextNode.position.z,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#bef264" transparent opacity={0.2} />
            </line>
          );
        }
        return null;
      })}
    </group>
  );
};

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <NeuralNodes />
      </Canvas>
    </div>
  );
}
