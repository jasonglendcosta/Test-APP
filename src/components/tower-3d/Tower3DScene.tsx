'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Sky } from '@react-three/drei';
import { Tower3D } from './Tower3D';
import { CameraController } from './CameraController';
import * as THREE from 'three';

interface Tower3DSceneProps {
  data: {
    floors: number;
    unitsPerFloor: number;
    units: Array<{
      id: string;
      floorNumber: number;
      number: string;
      status: 'available' | 'reserved' | 'sold';
      price: number;
      area: number;
    }>;
  };
  dayMode?: boolean;
  onUnitClick?: (unitNumber: string) => void;
}

function SceneLighting({ dayMode }: { dayMode: boolean }) {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={dayMode ? 0.8 : 0.3} />

      {/* Main directional light (sun) */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={dayMode ? 1.5 : 0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light */}
      <directionalLight
        position={[-10, 10, -10]}
        intensity={dayMode ? 0.5 : 0.3}
        color={dayMode ? '#ffffff' : '#4a5568'}
      />

      {/* Rim light for drama */}
      <spotLight
        position={[0, 30, 0]}
        angle={0.3}
        penumbra={1}
        intensity={dayMode ? 0.5 : 1}
        color={dayMode ? '#fef3c7' : '#818cf8'}
        castShadow
      />

      {/* Night mode accent lights */}
      {!dayMode && (
        <>
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#a78bfa" />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ec4899" />
        </>
      )}
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
        <p className="text-sm text-slate-400">Loading 3D Tower...</p>
      </div>
    </div>
  );
}

export function Tower3DScene({ data, dayMode = false, onUnitClick }: Tower3DSceneProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedUnitData, setSelectedUnitData] = useState<{
    floorNumber: number;
    position: [number, number, number];
  } | null>(null);
  const orbitControlsRef = useRef<any>(null);

  const handleUnitClick = (unitNumber: string) => {
    // Pause auto-rotation when a unit is selected
    setAutoRotate(false);

    // Find the unit and calculate its position
    const unit = data.units.find(u => u.number === unitNumber);
    if (unit) {
      const towerRadius = 4;
      const floorHeight = 1.5;
      const unitsPerFloor = data.unitsPerFloor;
      const unitIndex = data.units.filter(u => u.floorNumber === unit.floorNumber).findIndex(u => u.id === unit.id);

      const angleStep = (Math.PI * 2) / unitsPerFloor;
      const angle = unitIndex * angleStep;
      const x = Math.cos(angle) * towerRadius;
      const z = Math.sin(angle) * towerRadius;
      const y = (unit.floorNumber - 1) * floorHeight;

      setSelectedUnitData({
        floorNumber: unit.floorNumber,
        position: [x, y, z],
      });

      // Disable OrbitControls during camera animation
      if (orbitControlsRef.current) {
        orbitControlsRef.current.enabled = false;
      }
    }

    onUnitClick?.(unitNumber);
  };

  const handleCameraAnimationComplete = () => {
    // Re-enable OrbitControls after animation
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = true;
    }
  };

  const handleResetView = () => {
    setSelectedUnitData(null);
    setAutoRotate(true);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = false;
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />

          {/* Camera Controller for smooth transitions */}
          <CameraController
            targetUnit={selectedUnitData}
            onAnimationComplete={handleCameraAnimationComplete}
          />

          {/* Environment & Sky */}
          {dayMode ? (
            <Sky
              distance={450000}
              sunPosition={[10, 20, 10]}
              inclination={0.6}
              azimuth={0.25}
            />
          ) : (
            <color attach="background" args={['#0a0a0f']} />
          )}

          <Environment preset={dayMode ? 'sunset' : 'night'} />

          {/* Lighting */}
          <SceneLighting dayMode={dayMode} />

          {/* Tower */}
          <Tower3D data={data} autoRotate={autoRotate} onUnitClick={handleUnitClick} />

          {/* Controls */}
          <OrbitControls
            ref={orbitControlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={10}
            maxDistance={50}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Controls UI */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="rounded-lg bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-black/70"
        >
          {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
        </button>
        {selectedUnitData && (
          <button
            onClick={handleResetView}
            className="rounded-lg bg-violet-600/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-violet-600"
          >
            Reset View
          </button>
        )}
      </div>

      {/* Stats overlay */}
      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2">
        <div className="rounded-lg bg-black/50 px-4 py-2 backdrop-blur-sm">
          <p className="text-xs text-slate-400">Total Floors</p>
          <p className="text-2xl font-bold text-white">{data.floors}</p>
        </div>
        <div className="rounded-lg bg-black/50 px-4 py-2 backdrop-blur-sm">
          <p className="text-xs text-slate-400">Total Units</p>
          <p className="text-2xl font-bold text-white">{data.units.length}</p>
        </div>
        <div className="flex gap-2">
          <div className="rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-xs text-white">
                {data.units.filter(u => u.status === 'available').length}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-xs text-white">
                {data.units.filter(u => u.status === 'reserved').length}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-black/50 px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-xs text-white">
                {data.units.filter(u => u.status === 'sold').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
