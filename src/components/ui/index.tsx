'use client';

import { cn } from '@/lib/utils';
import React from 'react';

// Logo Component
interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'lg', className }) => {
  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-12 h-12 text-xl',
    lg: 'w-14 h-14 text-2xl',
    xl: 'w-20 h-20 text-4xl'
  };
  
  return (
    <div 
      className={cn(
        sizes[size],
        'rounded-2xl flex items-center justify-center font-bold gradient-btn',
        className
      )}
      style={{ boxShadow: '0 8px 32px rgba(216, 109, 203, 0.4)' }}
    >
      O
    </div>
  );
};

// GlowCard Component
interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = true 
}) => (
  <div 
    className={cn(
      'glass rounded-2xl',
      glow ? 'glow-border' : 'border border-white/10',
      hover ? 'stat-card' : '',
      className
    )}
  >
    {children}
  </div>
);

// GradientButton Component
interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary' 
}) => {
  const variants = {
    primary: 'gradient-btn text-white',
    secondary: 'bg-white/5 border border-white/20 text-white hover:bg-white/10',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5'
  };
  
  return (
    <button 
      onClick={onClick} 
      className={cn(
        'px-6 py-3 rounded-xl font-semibold transition-all',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

// TabButton Component
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: string;
}

export const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children, icon }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all whitespace-nowrap',
      active 
        ? 'gradient-btn text-white shadow-lg' 
        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
    )}
    style={active ? { boxShadow: '0 4px 20px rgba(216, 109, 203, 0.4)' } : {}}
  >
    {icon && <span className="text-lg">{icon}</span>}
    {children}
  </button>
);

// StatCard Component
interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  subvalue?: string;
  trend?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subvalue, trend }) => (
  <GlowCard className="p-5">
    <div className="flex items-center justify-between mb-3">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl gradient-btn">
        {icon}
      </div>
      {trend !== undefined && (
        <span className={cn(
          'text-sm font-medium',
          trend > 0 ? 'text-green-400' : 'text-red-400'
        )}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
    {subvalue && <p className="text-gray-500 text-xs mt-1">{subvalue}</p>}
  </GlowCard>
);
