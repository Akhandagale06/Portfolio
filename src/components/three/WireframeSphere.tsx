import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -t * 0.1;
      wireframeRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group scale={1.6}>
      {/* Outer Wireframe Icosahedron - Reduced polygon count */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner Distorted Glowing Sphere - Reduced segment count for 60 FPS */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <MeshDistortMaterial
          color="#06B6D4"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

export const WireframeSphere: React.FC = () => {
  return (
    <div className="w-full h-[280px] sm:h-[350px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#A855F7" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#06B6D4" />
        <FloatingMesh />
      </Canvas>
    </div>
  );
};
