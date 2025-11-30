'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface TowerUnitProps {
  position: [number, number, number];
  size: [number, number, number];
  status: 'available' | 'reserved' | 'sold';
  unitNumber: string;
  price: number;
  area: number;
  onUnitClick?: (unitNumber: string) => void;
}

const STATUS_COLORS = {
  available: '#10b981', // Green
  reserved: '#f59e0b', // Amber
  sold: '#ef4444',     // Red
};

export function TowerUnit({
  position,
  size,
  status,
  unitNumber,
  price,
  area,
  onUnitClick,
}: TowerUnitProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animate on hover
  useFrame(() => {
    if (!meshRef.current) return;

    const targetScale = hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(!clicked);
    onUnitClick?.(unitNumber);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={handleClick}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={STATUS_COLORS[status]}
          emissive={STATUS_COLORS[status]}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          transparent
          opacity={status === 'sold' ? 0.4 : 0.8}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Edges for definition */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
      </lineSegments>

      {/* Tooltip on hover */}
      {hovered && (
        <Html
          position={[0, size[1] / 2 + 0.5, 0]}
          center
          distanceFactor={10}
        >
          <div className="pointer-events-none rounded-lg bg-slate-900/95 px-4 py-2 text-sm text-white shadow-xl backdrop-blur-sm">
            <div className="font-bold">{unitNumber}</div>
            <div className="text-slate-300">{area} sqm</div>
            <div className="font-semibold text-emerald-400">
              ${price.toLocaleString()}
            </div>
            <div
              className={`mt-1 text-xs uppercase ${
                status === 'available'
                  ? 'text-emerald-400'
                  : status === 'reserved'
                  ? 'text-amber-400'
                  : 'text-red-400'
              }`}
            >
              {status}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
