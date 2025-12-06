'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  color?: string;
  connectionDistance?: number;
}

export function ParticleField({
  count = 50,
  spread = 20,
  color = '#667eea',
  connectionDistance = 5,
}: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, size } = useThree();

  // Generate particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return pos;
  }, [count, spread]);

  // Particle velocities for movement
  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return vel;
  }, [count]);

  // Animate particles
  useFrame(() => {
    if (!particlesRef.current || !linesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];

    // Update particle positions and create connections
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Move particles
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Bounce off boundaries
      if (Math.abs(positions[i3]) > spread / 2) velocities[i3] *= -1;
      if (Math.abs(positions[i3 + 1]) > spread / 2) velocities[i3 + 1] *= -1;
      if (Math.abs(positions[i3 + 2]) > spread / 2) velocities[i3 + 2] *= -1;

      // Mouse repulsion
      const dx = (mouse.x * size.width) / 100 - positions[i3];
      const dy = (mouse.y * size.height) / 100 - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        positions[i3] -= dx * 0.01;
        positions[i3 + 1] -= dy * 0.01;
      }

      // Create connections to nearby particles
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < connectionDistance) {
          linePositions.push(
            positions[i3],
            positions[i3 + 1],
            positions[i3 + 2],
            positions[j3],
            positions[j3 + 1],
            positions[j3 + 2]
          );
        }
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Update line connections
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesRef.current.geometry.dispose();
    linesRef.current.geometry = lineGeometry;
  });

  return (
    <group>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.2}
        />
      </lineSegments>
    </group>
  );
}
