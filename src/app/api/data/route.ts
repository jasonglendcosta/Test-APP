import { NextResponse } from 'next/server'

// Simulated live metrics data
function generateMetrics() {
  const baseMetrics = {
    totalRevenue: 2800000000,
    unitsAvailable: 847,
    occupancyRate: 94.2,
    customerSatisfaction: 4.8,
    projectsActive: 5,
    employeeCount: 342,
    marketShare: 12.5,
    leadConversion: 28.4,
  }

  // Add small random variations to simulate real-time updates
  return {
    totalRevenue: baseMetrics.totalRevenue + Math.floor(Math.random() * 10000000),
    unitsAvailable: baseMetrics.unitsAvailable + Math.floor(Math.random() * 10) - 5,
    occupancyRate: parseFloat((baseMetrics.occupancyRate + (Math.random() * 0.4 - 0.2)).toFixed(1)),
    customerSatisfaction: parseFloat((baseMetrics.customerSatisfaction + (Math.random() * 0.1 - 0.05)).toFixed(1)),
    projectsActive: baseMetrics.projectsActive,
    employeeCount: baseMetrics.employeeCount + Math.floor(Math.random() * 3),
    marketShare: parseFloat((baseMetrics.marketShare + (Math.random() * 0.2 - 0.1)).toFixed(1)),
    leadConversion: parseFloat((baseMetrics.leadConversion + (Math.random() * 0.5 - 0.25)).toFixed(1)),
    lastUpdated: new Date().toISOString(),
  }
}

function generateInitiativeProgress() {
  return [
    { id: 'ai-ops', name: 'AI Operations', progress: Math.min(100, 65 + Math.floor(Math.random() * 3)), status: 'on-track' },
    { id: 'proptech', name: 'PropTech Platform', progress: Math.min(100, 45 + Math.floor(Math.random() * 4)), status: 'on-track' },
    { id: 'cx', name: 'Customer Experience', progress: Math.min(100, 72 + Math.floor(Math.random() * 2)), status: 'ahead' },
    { id: 'sustainability', name: 'Sustainability Goals', progress: Math.min(100, 38 + Math.floor(Math.random() * 3)), status: 'on-track' },
    { id: 'expansion', name: 'Market Expansion', progress: Math.min(100, 25 + Math.floor(Math.random() * 5)), status: 'planning' },
  ]
}

function generateRecentActivity() {
  const activities = [
    { type: 'sale', message: 'New unit sold at Tower A - 3BR', time: '2 min ago' },
    { type: 'lead', message: 'New lead from website form', time: '5 min ago' },
    { type: 'milestone', message: 'Phase 2 construction 80% complete', time: '1 hour ago' },
    { type: 'meeting', message: 'Board meeting scheduled for tomorrow', time: '2 hours ago' },
    { type: 'report', message: 'Monthly analytics report generated', time: '3 hours ago' },
  ]

  return activities.slice(0, 3 + Math.floor(Math.random() * 2))
}

export async function GET() {
  const data = {
    metrics: generateMetrics(),
    initiatives: generateInitiativeProgress(),
    recentActivity: generateRecentActivity(),
    alerts: [
      { id: 1, type: 'info', message: 'Q4 targets on track', priority: 'low' },
      { id: 2, type: 'success', message: 'New partnership signed', priority: 'medium' },
    ],
  }

  return NextResponse.json(data)
}
