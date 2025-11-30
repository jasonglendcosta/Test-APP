'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface GradientMeshProps {
  position?: [number, number, number];
  color1?: string;
  color2?: string;
  speed?: number;
  distort?: number;
}

export function GradientMesh({
  position = [0, 0, -5],
  color1 = '#667eea',
  color2 = '#764ba2',
  speed = 1,
  distort = 0.4,
}: GradientMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Create gradient texture
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [color1, color2]);

  // Animate mesh based on mouse and time
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate slowly
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.y = Math.cos(time * 0.2) * 0.2;

    // Follow mouse slightly
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.x * 2,
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouse.y * 2,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} position={position} scale={4}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        map={gradientTexture}
        distort={distort}
        speed={speed}
        roughness={0.4}
        metalness={0.8}
      />
    </mesh>
  );
}
