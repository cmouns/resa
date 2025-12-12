import React from 'react';
import { Clock, ChevronDown } from 'lucide-react';

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, placeholder = "Heure" }) => {
  // Generate times in 30 min intervals
  const times = [];
  for (let i = 6; i < 23; i++) { // From 06:00 to 22:30
    const hour = i.toString().padStart(2, '0');
    times.push(`${hour}:00`);
    times.push(`${hour}:30`);
  }

  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <Clock size={16} />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 text-gray-700 pl-11 pr-8 py-4 rounded-sm text-sm font-medium appearance-none focus:border-brand-500 focus:ring-0 outline-none transition-all cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {times.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <ChevronDown size={14} />
      </div>
    </div>
  );
};