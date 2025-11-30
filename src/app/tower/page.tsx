'use client';

import { useState } from 'react';
import { Tower3DScene } from '@/components/tower-3d';
import { alReemTowerData, demoTowerData } from '@/data/sample-tower-data';
import { motion, AnimatePresence } from 'framer-motion';

export default function TowerPage() {
  const [dayMode, setDayMode] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [useDemoData, setUseDemoData] = useState(false);

  const towerData = useDemoData ? demoTowerData : alReemTowerData;

  const handleUnitClick = (unitNumber: string) => {
    setSelectedUnit(unitNumber);
    const unit = towerData.units.find(u => u.number === unitNumber);
    if (unit) {
      console.log('Unit clicked:', unit);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Al Reem Tower
            </h1>
            <p className="text-sm text-slate-400">
              Interactive 3D Visualization
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Demo toggle */}
            <button
              onClick={() => setUseDemoData(!useDemoData)}
              className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {useDemoData ? '20 Floors Demo' : '40 Floors Full'}
            </button>

            {/* Day/Night toggle */}
            <button
              onClick={() => setDayMode(!dayMode)}
              className="group relative flex h-12 w-24 items-center rounded-full bg-slate-800 p-1 transition-all hover:bg-slate-700"
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg"
                animate={{
                  x: dayMode ? 48 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {dayMode ? (
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </motion.div>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {dayMode ? 'Day' : 'Night'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Tower Scene */}
      <Tower3DScene
        data={towerData}
        dayMode={dayMode}
        onUnitClick={handleUnitClick}
      />

      {/* Unit Details Popup */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 z-20 w-96 -translate-x-1/2"
          >
            <div className="rounded-xl border border-white/10 bg-black/80 p-6 shadow-2xl backdrop-blur-lg">
              {(() => {
                const unit = towerData.units.find(u => u.number === selectedUnit);
                if (!unit) return null;

                return (
                  <>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Unit {unit.number}
                        </h3>
                        <p className="text-sm text-slate-400">
                          Floor {unit.floorNumber}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedUnit(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Status</span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                            unit.status === 'available'
                              ? 'bg-green-500/20 text-green-400'
                              : unit.status === 'reserved'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {unit.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Area</span>
                        <span className="font-semibold text-white">
                          {unit.area.toLocaleString()} sqft
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Price</span>
                        <span className="text-xl font-bold text-white">
                          AED {unit.price.toLocaleString()}
                        </span>
                      </div>

                      {unit.status === 'available' && (
                        <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-3 font-semibold text-white transition-all hover:from-violet-500 hover:to-purple-500">
                          Schedule Viewing
                        </button>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-lg bg-black/50 px-4 py-3 backdrop-blur-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Controls
        </p>
        <ul className="space-y-1 text-xs text-slate-300">
          <li>• Drag to rotate</li>
          <li>• Scroll to zoom</li>
          <li>• Click units for details</li>
          <li>• Right-drag to pan</li>
        </ul>
      </div>
    </div>
  );
}
