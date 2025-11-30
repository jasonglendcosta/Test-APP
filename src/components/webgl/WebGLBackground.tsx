'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { GradientMesh } from './GradientMesh';
import { ParticleField } from './ParticleField';

interface WebGLBackgroundProps {
  theme?: 'light' | 'dark';
  interactive?: boolean;
  particles?: boolean;
  stars?: boolean;
}

export function WebGLBackground({
  theme = 'dark',
  interactive = true,
  particles = true,
  stars = false,
}: WebGLBackgroundProps) {
  const colors = {
    light: {
      gradient1: '#f093fb',
      gradient2: '#f5576c',
      particle: '#9333ea',
    },
    dark: {
      gradient1: '#667eea',
      gradient2: '#764ba2',
      particle: '#818cf8',
    },
  };

  const currentColors = colors[theme];

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* Main gradient mesh */}
          <GradientMesh
            position={[0, 0, -5]}
            color1={currentColors.gradient1}
            color2={currentColors.gradient2}
            speed={1.5}
            distort={0.4}
          />

          {/* Particle system */}
          {particles && (
            <ParticleField
              count={50}
              spread={20}
              color={currentColors.particle}
              connectionDistance={5}
            />
          )}

          {/* Stars for dark mode */}
          {stars && theme === 'dark' && (
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
          )}

          {/* Interactive controls (optional) */}
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Gradient overlay for better text readability */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/80'
            : 'bg-gradient-to-b from-white/30 via-transparent to-white/60'
        }`}
      />
    </div>
  );
}
