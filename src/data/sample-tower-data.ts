// Sample data for Al Reem Tower demonstration
// This represents a realistic 40-floor luxury residential tower in Dubai

export interface UnitData {
  id: string;
  floorNumber: number;
  number: string;
  status: 'available' | 'reserved' | 'sold';
  price: number;
  area: number;
}

export interface TowerData {
  floors: number;
  unitsPerFloor: number;
  units: UnitData[];
}

// Generate realistic units for each floor
function generateFloorUnits(
  floorNumber: number,
  unitsPerFloor: number
): UnitData[] {
  const units: UnitData[] = [];
  const statuses: Array<'available' | 'reserved' | 'sold'> = [
    'available',
    'reserved',
    'sold',
  ];

  // Base price increases with floor height (penthouse premium)
  const basePrice = 1200000; // AED 1.2M base
  const floorPremium = floorNumber * 15000; // AED 15K per floor
  const totalBasePrice = basePrice + floorPremium;

  for (let i = 0; i < unitsPerFloor; i++) {
    const unitNumber = String.fromCharCode(65 + i); // A, B, C, D, E, F
    const area = 900 + Math.floor(Math.random() * 600); // 900-1500 sqft

    // Price varies by area and position
    const areaPremium = area * 800; // AED 800 per sqft
    const cornerPremium = i === 0 || i === unitsPerFloor - 1 ? 100000 : 0;
    const price = totalBasePrice + areaPremium + cornerPremium;

    // Realistic distribution: lower floors more sold, higher floors more available
    let status: 'available' | 'reserved' | 'sold';
    if (floorNumber <= 15) {
      // Lower floors: 60% sold, 30% reserved, 10% available
      const rand = Math.random();
      status = rand < 0.6 ? 'sold' : rand < 0.9 ? 'reserved' : 'available';
    } else if (floorNumber <= 30) {
      // Mid floors: 40% sold, 40% reserved, 20% available
      const rand = Math.random();
      status = rand < 0.4 ? 'sold' : rand < 0.8 ? 'reserved' : 'available';
    } else {
      // Upper floors: 20% sold, 30% reserved, 50% available
      const rand = Math.random();
      status = rand < 0.2 ? 'sold' : rand < 0.5 ? 'reserved' : 'available';
    }

    units.push({
      id: `unit-${floorNumber}-${unitNumber}`,
      floorNumber,
      number: `${floorNumber}${unitNumber}`,
      status,
      price: Math.round(price),
      area,
    });
  }

  return units;
}

// Generate complete tower data
export function generateTowerData(
  floors: number = 40,
  unitsPerFloor: number = 6
): TowerData {
  const units: UnitData[] = [];

  for (let floor = 1; floor <= floors; floor++) {
    units.push(...generateFloorUnits(floor, unitsPerFloor));
  }

  return {
    floors,
    unitsPerFloor,
    units,
  };
}

// Pre-generated sample data for Al Reem Tower
export const alReemTowerData: TowerData = generateTowerData(40, 6);

// Smaller demo tower for testing
export const demoTowerData: TowerData = generateTowerData(20, 4);