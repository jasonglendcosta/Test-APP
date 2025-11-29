'use client';

import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { UNIT_TYPES, STRATEGIC_PILLARS } from '@/data/project-data';

// Tooltip Style
const tooltipStyle = {
  contentStyle: {
    background: 'rgba(26, 26, 36, 0.95)',
    border: '1px solid rgba(216, 109, 203, 0.3)',
    borderRadius: '12px'
  },
  itemStyle: { color: '#fff' }
};

// Unit Mix Pie Chart
export const UnitMixChart: React.FC = () => {
  const data = UNIT_TYPES.filter(u => u.type !== 'Retail').map(u => ({
    name: u.type.replace('-Bedroom', 'BR').replace('Simplex', 'S').replace('Duplex', 'D'),
    value: u.units,
    color: u.color
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative" style={{ height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-3xl font-bold text-white">{total}</div>
        <div className="text-gray-400 text-xs">Units</div>
      </div>
    </div>
  );
};

// Revenue Chart
export const RevenueChart: React.FC = () => {
  const data = UNIT_TYPES.filter(u => u.type !== 'Retail').map(u => ({
    name: u.type.split('-')[0],
    units: u.units,
    revenue: (u.units * u.avgPrice) / 1000000,
    color: u.color
  }));

  return (
    <div style={{ height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <Tooltip {...tooltipStyle} />
          <Bar yAxisId="left" dataKey="units" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="#D86DCB"
            strokeWidth={3}
            dot={{ fill: '#D86DCB', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

// Strategic Radar Chart
export const StrategicRadar: React.FC = () => {
  const data = STRATEGIC_PILLARS.map(p => ({
    subject: p.name.split(' ')[0],
    value: p.value,
    fullMark: 100
  }));

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(216, 109, 203, 0.2)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#666', fontSize: 10 }} />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#D86DCB"
            fill="#D86DCB"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
