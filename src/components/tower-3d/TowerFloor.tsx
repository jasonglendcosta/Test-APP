'use client';

import { TowerUnit } from './TowerUnit';

interface Unit {
  id: string;
  number: string;
  status: 'available' | 'reserved' | 'sold';
  price: number;
  area: number;
}

interface TowerFloorProps {
  floorNumber: number;
  height: number;
  units: Unit[];
  unitsPerFloor: number;
  towerRadius: number;
  onUnitClick?: (unitNumber: string) => void;
}

export function TowerFloor({
  floorNumber,
  height,
  units,
  unitsPerFloor,
  towerRadius,
  onUnitClick,
}: TowerFloorProps) {
  const unitSize: [number, number, number] = [1.5, 0.8, 1];
  const angleStep = (Math.PI * 2) / unitsPerFloor;

  return (
    <group position={[0, height, 0]}>
      {/* Floor platform */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[towerRadius, towerRadius, 0.1, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          transparent
          opacity={0.3}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Floor number label */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Units arranged in a circle */}
      {units.map((unit, index) => {
        const angle = index * angleStep;
        const x = Math.cos(angle) * towerRadius;
        const z = Math.sin(angle) * towerRadius;

        return (
          <TowerUnit
            key={unit.id}
            position={[x, 0, z]}
            size={unitSize}
            status={unit.status}
            unitNumber={unit.number}
            price={unit.price}
            area={unit.area}
            onUnitClick={onUnitClick}
          />
        );
      })}
    </group>
  );
}
