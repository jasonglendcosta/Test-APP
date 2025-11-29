'use client';

import React from 'react';
import { GlowCard } from '@/components/ui';
import { FLOOR_TYPES_COLORS } from '@/data/project-data';

interface Floor {
  level: string;
  type: string;
  units: number;
  unitMix: Record<string, number>;
  revenue?: number;
}

interface TowerVisualizationProps {
  selectedFloor: Floor | null;
  onFloorSelect: (floor: Floor) => void;
}

export const TowerVisualization: React.FC<TowerVisualizationProps> = ({
  selectedFloor,
  onFloorSelect
}) => {
  const floors: Floor[] = [
    { level: 'R', type: 'Roof', units: 0, unitMix: {} },
    { level: 'L4', type: 'Loft', units: 7, unitMix: { '3BR Duplex': 5, '4BR Duplex': 2 }, revenue: 28134777 },
    ...Array.from({ length: 7 }, (_, i) => ({
      level: `${25 - i}`,
      type: 'Typical T3',
      units: 7,
      unitMix: { '2BR Simplex': 5, '3BR Simplex': 2 },
      revenue: 18066348
    })),
    { level: 'L3', type: 'Loft', units: 8, unitMix: { '1BR Duplex': 1, '3BR Duplex': 7 }, revenue: 29052888 },
    ...Array.from({ length: 3 }, (_, i) => ({
      level: `${16 - i}`,
      type: 'Typical T3',
      units: 7,
      unitMix: { '2BR Simplex': 5, '3BR Simplex': 2 },
      revenue: 17255110
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      level: `${13 - i}`,
      type: 'Typical T2',
      units: 9,
      unitMix: { '1BR Simplex': 3, '2BR Simplex': 6 },
      revenue: 18015332
    })),
    { level: 'L2', type: 'Loft', units: 15, unitMix: { '1BR Duplex': 11, '2BR Duplex': 4 }, revenue: 32879665 },
    ...Array.from({ length: 6 }, (_, i) => ({
      level: `${8 - i}`,
      type: 'Typical T1',
      units: 10,
      unitMix: { '1BR Simplex': 9, '2BR Simplex': 1 },
      revenue: 16437943
    })),
    { level: 'L1', type: 'Loft', units: 8, unitMix: { '1BR Duplex': 1, '2BR Duplex': 7 }, revenue: 24070888 },
    { level: 'P3', type: 'Podium', units: 0, unitMix: {} },
    { level: 'P2', type: 'Podium', units: 0, unitMix: {} },
    { level: 'P1', type: 'Podium', units: 0, unitMix: {} },
    { level: 'GF', type: 'Ground', units: 1, unitMix: { 'Retail': 1 }, revenue: 7187111 }
  ];

  return (
    <div className="flex gap-8">
      <div className="flex flex-col-reverse gap-0.5">
        {floors.map((floor) => {
          const isSelected = selectedFloor?.level === floor.level;
          const isPodium = floor.type === 'Podium' || floor.type === 'Ground';
          const color = FLOOR_TYPES_COLORS[floor.type] || '#374151';

          return (
            <div
              key={floor.level}
              onClick={() => floor.units > 0 && onFloorSelect(floor)}
              className={`relative transition-all duration-300 ${
                floor.units > 0 ? 'cursor-pointer hover:scale-105' : ''
              }`}
              style={{
                width: isPodium ? '220px' : '160px',
                height: floor.type === 'Loft' ? '28px' : '18px',
                marginLeft: isPodium ? '0' : '30px',
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                borderRadius: '3px',
                boxShadow: isSelected ? `0 0 20px ${color}` : 'none',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                zIndex: isSelected ? 10 : 1
              }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-3 text-[10px] text-white/90">
                <span className="font-bold">{floor.level}</span>
                {floor.units > 0 && <span>{floor.units}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <GlowCard className="p-4 h-fit">
        <p className="text-gray-400 text-xs mb-3 font-medium">Floor Types</p>
        {Object.entries(FLOOR_TYPES_COLORS)
          .filter(([type]) => type !== 'Roof')
          .map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 text-xs text-gray-300 mb-2">
              <div className="w-4 h-4 rounded" style={{ background: color }} />
              {type}
            </div>
          ))}
      </GlowCard>
    </div>
  );
};

export type { Floor };
