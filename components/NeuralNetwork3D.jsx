"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleNetwork = ({ count = 100, radius = 20 }) => {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Pre-allocate the maximum possible line buffer (count*(count-1)/2 segments × 2 endpoints × 3 floats)
  // Reused every frame to avoid GC pressure from repeated new Float32Array allocations.
  const maxSegments = (count * (count - 1)) / 2;
  const lineBuffer = useRef(new Float32Array(maxSegments * 6));

  // 1. Initialize Particles with random positions and velocities
  const { positions, velocities, colors } = useMemo(() => {
    // Simple seeded random function
    let seed = 9012;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const lime = new THREE.Color("#bef264");
    const emerald = new THREE.Color("#10b981");
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Random Position
      pos[i * 3] = (random() - 0.5) * radius;
      pos[i * 3 + 1] = (random() - 0.5) * radius;
      pos[i * 3 + 2] = (random() - 0.5) * radius;

      // Random Velocity (Drifting)
      vel[i * 3] = (random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (random() - 0.5) * 0.02;

      // Color Mix
      tempColor.lerpColors(emerald, lime, random());
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, [count, radius]);

  useFrame((state) => {
    // 2. Update Particle Positions
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const positionsArray = posAttribute.array;

    for (let i = 0; i < count; i++) {
      // Add velocity
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Boundary Check (Bounce back if too far)
      if (Math.abs(positionsArray[i * 3]) > radius / 2) velocities[i * 3] *= -1;
      if (Math.abs(positionsArray[i * 3 + 1]) > radius / 2) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positionsArray[i * 3 + 2]) > radius / 2) velocities[i * 3 + 2] *= -1;
    }
    posAttribute.needsUpdate = true;

    // 3. Dynamic Line Connections (The Plexus Effect)
    // Write directly into the pre-allocated buffer — zero GC allocations per frame.
    const buf = lineBuffer.current;
    let segCount = 0;
    const connectDistance = 3.5;
    const connectDistSq = connectDistance * connectDistance;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        // Avoid sqrt — compare squared distances
        if (dx * dx + dy * dy + dz * dz < connectDistSq) {
          const off = segCount * 6;
          buf[off]     = positionsArray[i * 3];
          buf[off + 1] = positionsArray[i * 3 + 1];
          buf[off + 2] = positionsArray[i * 3 + 2];
          buf[off + 3] = positionsArray[j * 3];
          buf[off + 4] = positionsArray[j * 3 + 1];
          buf[off + 5] = positionsArray[j * 3 + 2];
          segCount++;
        }
      }
    }

    // Update Line Geometry — reuse existing attribute, just swap the typed array slice
    const lineGeo = linesRef.current.geometry;
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(buf.subarray(0, segCount * 6), 3)
    );
  });

  return (
    <group>
      {/* The Dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* The Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#bef264"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

const MouseRotator = ({ children }) => {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      // Gentle rotation
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;

      // Mouse interaction (Parallax)
      const x = state.mouse.x * 0.2;
      const y = state.mouse.y * 0.2;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y, 0.1);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, x, 0.1);
    }
  });
  return <group ref={group}>{children}</group>;
};

export default function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-black">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <MouseRotator>
          <ParticleNetwork count={70} radius={18} />
        </MouseRotator>
      </Canvas>

      {/* Overlay Gradient for seamless text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
}
