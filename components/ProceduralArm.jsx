"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, useCursor } from "@react-three/drei";
import * as THREE from "three";

// Reusable parts to build complex geometry quickly
const MetalPart = ({ args, ...props }) => (
  <mesh {...props}>
    <boxGeometry args={args} />
    <meshStandardMaterial color="#222" roughness={0.2} metalness={0.8} />
  </mesh>
);

const JointCylinder = (props) => (
  <mesh rotation={[0, 0, Math.PI / 2]} {...props}>
    <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
    <meshStandardMaterial color="#111" roughness={0.3} metalness={0.9} />
  </mesh>
);

const PistonDetail = ({ position }) => (
  <group position={position}>
    <mesh position={[0, -0.5, 0]}>
      <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[0.04, 0.04, 2, 16]} />
      <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
    </mesh>
  </group>
);

const ComplexRobot = () => {
  const group = useRef();
  const baseRef = useRef();
  const arm1Ref = useRef();
  const arm2Ref = useRef();
  const wristRef = useRef();
  const clawRef = useRef();

  // Mouse interactivity state
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = state.mouse;

    // INTERACTIVITY: Arm follows mouse when hovered, otherwise idles
    const targetX = hovered ? mouse.x * 2 : Math.sin(t * 0.5) * 1.5;
    const targetY = hovered ? mouse.y * 1.5 : Math.sin(t * 0.3) * 0.5;

    // Smooth interpolation (Lerp) for heavy mechanical feel
    if (baseRef.current) {
      baseRef.current.rotation.y = THREE.MathUtils.lerp(baseRef.current.rotation.y, targetX, 0.05);
    }
    if (arm1Ref.current) {
      arm1Ref.current.rotation.z = THREE.MathUtils.lerp(arm1Ref.current.rotation.z, targetY * 0.5, 0.05);
    }
    if (arm2Ref.current) {
      // Counter-rotate elbow to keep head somewhat level
      arm2Ref.current.rotation.z = THREE.MathUtils.lerp(arm2Ref.current.rotation.z, -targetY * 0.8 - 0.5, 0.05);
    }
    if (wristRef.current) {
      wristRef.current.rotation.x += 0.02; // Constant scanning rotation
    }
    
    // Animate Claw "breathing"
    if (clawRef.current) {
        clawRef.current.rotation.z = 0.5 + Math.sin(t * 5) * 0.2;
    }
  });

  return (
    <group ref={group} position={[0, -2.5, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      
      {/* 1. HEAVY BASE */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 0.5, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.5} />
      </mesh>
      
      {/* 2. ROTATING TURRET */}
      <group ref={baseRef}>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.8, 1, 1, 32]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        
        {/* Detail: Cables */}
        <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, -0.2]}>
             <boxGeometry args={[0.2, 1.5, 0.2]} />
             <meshStandardMaterial color="#333" />
        </mesh>

        {/* 3. SHOULDER JOINT */}
        <group position={[0, 1.5, 0]}>
          <JointCylinder />
          
          {/* 4. MAIN ARM */}
          <group ref={arm1Ref}>
            {/* Main Beam */}
            <MetalPart position={[0, 1.5, 0]} args={[0.6, 3.5, 0.6]} color="#333" />
            {/* Decorative Shell (Lime branding) */}
            <mesh position={[0, 1.5, 0]}>
                 <boxGeometry args={[0.65, 2, 0.65]} />
                 <meshStandardMaterial color="#bef264" roughness={0.2} metalness={0.3} />
            </mesh>
            
            {/* Hydraulic Pistons details */}
            <PistonDetail position={[0.5, 1, 0.3]} />
            <PistonDetail position={[-0.5, 1, 0.3]} />

            {/* 5. ELBOW JOINT */}
            <group position={[0, 3.2, 0]}>
               <JointCylinder />
               
               {/* 6. FOREARM */}
               <group ref={arm2Ref}>
                 <MetalPart position={[0, 1.5, 0]} args={[0.4, 3, 0.4]} color="#eee" />
                 
                 {/* Wire details running along arm */}
                 <mesh position={[0.25, 1.5, 0]}>
                    <boxGeometry args={[0.05, 3, 0.1]} />
                    <meshStandardMaterial color="#bef264" emissive="#bef264" emissiveIntensity={0.5} />
                 </mesh>

                 {/* 7. WRIST */}
                 <group position={[0, 3, 0]}>
                    <JointCylinder rotation={[Math.PI/2, 0, 0]} /> {/* Vertical axis rotation */}
                    
                    <group ref={wristRef}>
                        {/* Camera/Sensor Head */}
                        <mesh position={[0, 0.4, 0]}>
                            <boxGeometry args={[0.5, 0.8, 0.5]} />
                            <meshStandardMaterial color="#222" />
                        </mesh>
                        {/* Lens Eye */}
                        <mesh position={[0, 0.4, 0.26]}>
                             <circleGeometry args={[0.15, 32]} />
                             <meshBasicMaterial color="#bef264" />
                        </mesh>
                        
                        {/* 8. GRIPPER CLAWS */}
                        <group position={[0, 0.8, 0]} ref={clawRef}>
                            <mesh position={[0.2, 0.3, 0]} rotation={[0, 0, -0.2]}>
                                <boxGeometry args={[0.1, 0.6, 0.4]} />
                                <meshStandardMaterial color="#444" />
                            </mesh>
                             <mesh position={[-0.2, 0.3, 0]} rotation={[0, 0, 0.2]}>
                                <boxGeometry args={[0.1, 0.6, 0.4]} />
                                <meshStandardMaterial color="#444" />
                            </mesh>
                        </group>
                    </group>
                 </group>
               </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default function ProceduralArm() {
  return (
    <div className="h-[600px] w-full relative bg-gradient-to-b from-gray-900 via-black to-black rounded-3xl overflow-hidden border border-gray-800">
      <Canvas shadows camera={{ position: [4, 4, 8], fov: 40 }}>
        {/* Dramatic Lighting for "Future Lab" feel */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 5]} angle={0.3} penumbra={1} intensity={150} castShadow color="#ffffff" />
        <pointLight position={[-5, 5, -5]} intensity={50} color="#bef264" />
        <pointLight position={[5, -5, 5]} intensity={50} color="#10b981" />
        
        <ComplexRobot />
        
        <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
        <ContactShadows opacity={0.6} scale={10} blur={2} far={1} />
        <gridHelper args={[20, 20, 0x222222, 0x111111]} position={[0, -2.5, 0]} />
      </Canvas>

      {/* Instructions Overlay */}
      <div className="absolute bottom-6 left-6 pointer-events-none">
         <div className="text-xs font-mono text-lime-400 bg-black/50 px-2 py-1 rounded border border-lime-900/50">
            SYSTEM: ACTIVE TRACKING
         </div>
      </div>
    </div>
  );
}
