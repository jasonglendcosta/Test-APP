'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingLabelInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FloatingLabelInput({
  label,
  type = 'text',
  value,
  onChange,
  className = '',
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer w-full rounded-lg border-2 border-slate-300 bg-transparent px-4 pb-2 pt-6 text-slate-900 outline-none transition-all duration-200 focus:border-violet-500 dark:border-slate-700 dark:text-white dark:focus:border-violet-400"
      />

      <motion.label
        className="pointer-events-none absolute left-4 text-slate-500 dark:text-slate-400"
        animate={{
          y: isActive ? 8 : 20,
          fontSize: isActive ? '0.75rem' : '1rem',
          color: isFocused
            ? 'rgb(139, 92, 246)'
            : 'rgb(100, 116, 139)',
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>

      {/* Focus indicator line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
