"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";

// A reusable component for arm segments to keep code clean
const ArmSegment = ({ position, rotation, args, color, children }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} />
      </mesh>
      {children}
    </group>
  );
};

const Joint = ({ position, rotation, children }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {children}
    </group>
  );
};

const Robot = () => {
  const baseRef = useRef();
  const shoulderRef = useRef();
  const elbowRef = useRef();
  const wristRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Procedural Animation (Forward Kinematics)
    // 1. Rotate base slowly
    if (baseRef.current) baseRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
    
    // 2. Move shoulder up and down
    if (shoulderRef.current) shoulderRef.current.rotation.z = Math.sin(t) * 0.5;
    
    // 3. Move elbow opposing the shoulder
    if (elbowRef.current) elbowRef.current.rotation.z = Math.sin(t * 1.5) * 0.7; // Faster

    // 4. Rotate wrist continuously
    if (wristRef.current) wristRef.current.rotation.x += 0.05;
  });

  return (
    <group position={[0, -2, 0]}>
      {/* 1. Base */}
      <mesh ref={baseRef}>
        <cylinderGeometry args={[1, 1.5, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
        
        {/* 2. Shoulder Joint */}
        <Joint position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
          
          {/* 3. Lower Arm (Shoulder ref applied here to rotate this whole group) */}
          <group ref={shoulderRef}>
            <ArmSegment position={[0, 1.5, 0]} args={[0.5, 3, 0.5]} color="#00bcd4"> {/* Cyan Arm */}
              
              {/* 4. Elbow Joint */}
              <Joint position={[0, 1.8, 0]}>
                
                {/* 5. Upper Arm */}
                <group ref={elbowRef}>
                  <ArmSegment position={[0, 1.5, 0]} args={[0.4, 3, 0.4]} color="#ffffff">
                     
                     {/* 6. Wrist/Claw */}
                     <group ref={wristRef} position={[0, 1.8, 0]}>
                        <mesh>
                          <torusGeometry args={[0.3, 0.05, 16, 100]} />
                          <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={2} />
                        </mesh>
                     </group>

                  </ArmSegment>
                </group>

              </Joint>
            </ArmSegment>
          </group>
        </Joint>
      </mesh>
    </group>
  );
};

export default function ProceduralArm() {
  return (
    <div className="h-[500px] w-full lg:h-full min-h-[500px] relative">
      {/* Add a fallback background in case WebGL fails */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black -z-10" />
      
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
        {/* REPLACED <Stage> WITH MANUAL LIGHTS TO FIX CRASH */}
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={100} color="#00ffff" />
        
        <Robot />
        
        <OrbitControls enableZoom={false} />
        <ContactShadows opacity={0.5} scale={10} blur={1.5} far={0.8} />
      </Canvas>
    </div>
  );
}
