'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TowerFloor } from './TowerFloor';
import * as THREE from 'three';

interface TowerData {
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
}

interface Tower3DProps {
  data: TowerData;
  autoRotate?: boolean;
  onUnitClick?: (unitNumber: string) => void;
}

export function Tower3D({ data, autoRotate = true, onUnitClick }: Tower3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const towerRadius = 4;
  const floorHeight = 1.5;

  // Auto-rotate the tower
  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Group units by floor
  const unitsByFloor = data.units.reduce((acc, unit) => {
    if (!acc[unit.floorNumber]) {
      acc[unit.floorNumber] = [];
    }
    acc[unit.floorNumber].push(unit);
    return acc;
  }, {} as Record<number, typeof data.units>);

  return (
    <group ref={groupRef}>
      {/* Central core/column */}
      <mesh position={[0, (data.floors * floorHeight) / 2, 0]}>
        <cylinderGeometry
          args={[0.3, 0.5, data.floors * floorHeight, 16]}
        />
        <meshStandardMaterial
          color="#334155"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Generate floors */}
      {Array.from({ length: data.floors }, (_, i) => {
        const floorNumber = i + 1;
        const floorUnits = unitsByFloor[floorNumber] || [];

        return (
          <TowerFloor
            key={floorNumber}
            floorNumber={floorNumber}
            height={i * floorHeight}
            units={floorUnits}
            unitsPerFloor={data.unitsPerFloor}
            towerRadius={towerRadius}
            onUnitClick={onUnitClick}
          />
        );
      })}

      {/* Base platform */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[towerRadius + 1, towerRadius + 1, 0.3, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Ground grid */}
      <gridHelper args={[30, 30, '#1e293b', '#0f172a']} position={[0, -0.65, 0]} />
    </group>
  );
}
