// Project Data Constants
export const PROJECT_DATA = {
  name: "One Residence",
  developer: "One Development",
  consultant: "Terra PMC",
  masterDeveloper: "ADGM",
  location: "Al Reem Island, Abu Dhabi",
  plotNo: "C31-32",
  sector: 3,
  zone: "RT",
  landArea: { sqm: 4809.77, sqft: 51772.36 },
  totalBUA: { sqm: 44779, sqft: 482000 },
  totalGFA: { sqm: 28413, sqft: 305837.53 },
  totalSellable: { sqft: 290076 },
  height: "124m",
  floors: "G+3P+27+R",
  totalFloors: 31,
  parking: 244,
  totalUnits: 196,
  completionDate: "December 2028",
  totalRevenue: 452228756,
  brokerCommission: "5%"
};

export const UNIT_TYPES = [
  { type: "1-Bedroom Simplex", units: 63, store: "Store", parking: 1, sizeRange: "875 - 1300", avgSize: 985, priceRange: "1.4M - 2.1M", avgPrice: 1580000, color: "#6366f1", psfRange: "1544 - 1674", avgPsf: 1601 },
  { type: "1-Bedroom Duplex", units: 13, store: "Store", parking: 1, sizeRange: "968 - 1309", avgSize: 994, priceRange: "1.6M - 2.3M", avgPrice: 1760000, color: "#8b5cf6", psfRange: "1681 - 1847", avgPsf: 1766 },
  { type: "2-Bedroom Simplex", units: 74, store: "Maid's + Store", parking: 1, sizeRange: "1371 - 1867", avgSize: 1497, priceRange: "1.9M - 2.7M", avgPrice: 2230000, color: "#06b6d4", psfRange: "1384 - 1581", avgPsf: 1491 },
  { type: "2-Bedroom Duplex", units: 11, store: "Maid's + Store", parking: 1, sizeRange: "1935 - 2421", avgSize: 2038, priceRange: "3.0M - 3.9M", avgPrice: 3260000, color: "#0ea5e9", psfRange: "1549 - 1668", avgPsf: 1601 },
  { type: "3-Bedroom Simplex", units: 20, store: "Maid's + Store", parking: 2, sizeRange: "1926 - 2485", avgSize: 2233, priceRange: "2.8M - 3.6M", avgPrice: 3330000, color: "#10b981", psfRange: "1421 - 1549", avgPsf: 1490 },
  { type: "3-Bedroom Duplex", units: 12, store: "Maid's + Store", parking: 2, sizeRange: "2275 - 2786", avgSize: 2362, priceRange: "3.2M - 4.5M", avgPrice: 3650000, color: "#14b8a6", psfRange: "1426 - 1664", avgPsf: 1544 },
  { type: "4-Bedroom Duplex", units: 2, store: "Maid's + Store", parking: 2, sizeRange: "3196 - 3352", avgSize: 3274, priceRange: "5.6M - 5.8M", avgPrice: 5780000, color: "#f59e0b", psfRange: "1753 - 1777", avgPsf: 1765 },
  { type: "Retail", units: 1, store: "N/A", parking: 15, sizeRange: "2,368", avgSize: 2368, priceRange: "7.2M", avgPrice: 7190000, color: "#ef4444", psfRange: "3,035", avgPsf: 3035 }
];

export const FLOOR_DATA = [
  { floor: "GF", type: "Ground", total: 1, price: 7187111, units: { retail: 1 } },
  { floor: "L1", type: "Loft", total: 8, price: 24070888, units: { "1BR-D": 1, "2BR-D": 7 } },
  { floor: "3-8", type: "Typical T1", total: 60, price: 98627660, units: { "1BR-S": 54, "2BR-S": 6 } },
  { floor: "L2", type: "Loft", total: 15, price: 32879665, units: { "1BR-D": 11, "2BR-D": 4 } },
  { floor: "11-13", type: "Typical T2", total: 27, price: 54045997, units: { "1BR-S": 9, "2BR-S": 18 } },
  { floor: "14-16", type: "Typical T3", total: 21, price: 51765331, units: { "2BR-S": 15, "3BR-S": 6 } },
  { floor: "L3", type: "Loft", total: 8, price: 29052888, units: { "1BR-D": 1, "3BR-D": 7 } },
  { floor: "19-25", type: "Typical T3", total: 49, price: 126464439, units: { "2BR-S": 35, "3BR-S": 14 } },
  { floor: "L4", type: "Loft", total: 7, price: 28134777, units: { "3BR-D": 5, "4BR-D": 2 } }
];

export const AMENITIES = [
  { name: "Hyperbaric Oxygen Therapy", icon: "🫁", category: "Premium" },
  { name: "Swimming Pool & Kids Pool", icon: "🏊", category: "Recreation" },
  { name: "Indoor & Outdoor Gym", icon: "💪", category: "Fitness" },
  { name: "Yoga/Pilates Studio", icon: "🧘", category: "Wellness" },
  { name: "Wellness Spa", icon: "🧖", category: "Wellness" },
  { name: "Mini-Golf Course", icon: "⛳", category: "Recreation" },
  { name: "Outdoor Theatre", icon: "🎬", category: "Entertainment" },
  { name: "Family BBQ Area", icon: "🍖", category: "Social" }
];

export const STRATEGIC_PILLARS = [
  { name: "Digital Transformation", icon: "🚀", value: 92, color: "#D86DCB", description: "AI-Powered Operations & Smart Buildings" },
  { name: "Market Innovation", icon: "💎", value: 88, color: "#A02B93", description: "Premium Positioning & Unique Offerings" },
  { name: "Customer Excellence", icon: "🎯", value: 95, color: "#6366f1", description: "World-Class Experience & Service" },
  { name: "Sustainable Growth", icon: "🌱", value: 85, color: "#10b981", description: "ESG Leadership & Green Development" }
];

export const INITIATIVES = [
  { name: "AI Property Intelligence", status: "active", progress: 78, budget: "2.5M", roi: "+340%" },
  { name: "Smart Building IoT", status: "active", progress: 65, budget: "1.8M", roi: "+220%" },
  { name: "Digital Sales Platform", status: "active", progress: 92, budget: "1.2M", roi: "+450%" },
  { name: "Blockchain Transactions", status: "planning", progress: 25, budget: "800K", roi: "+180%" },
  { name: "VR Property Tours", status: "active", progress: 88, budget: "600K", roi: "+280%" },
  { name: "Predictive Analytics", status: "active", progress: 72, budget: "1.5M", roi: "+310%" }
];

export const FLOOR_TYPES_COLORS: Record<string, string> = {
  "Ground": "#6366f1",
  "Podium": "#64748b",
  "Loft": "#8b5cf6",
  "Typical T1": "#06b6d4",
  "Typical T2": "#10b981",
  "Typical T3": "#f59e0b",
  "Roof": "#374151"
};
