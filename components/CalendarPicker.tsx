import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CalendarPickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  onClose: () => void;
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// Hardcoded french holidays for demo
const HOLIDAYS = [
  '01-01', '05-01', '05-08', '07-14', '08-15', '11-01', '11-11', '12-25'
];

export const CalendarPicker: React.FC<CalendarPickerProps> = ({ startDate, endDate, onChange, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date(startDate || new Date()));
  const [selectingMode, setSelectingMode] = useState<'start' | 'end'>('start');
  const [internalStart, setInternalStart] = useState(startDate);
  const [internalEnd, setInternalEnd] = useState(endDate);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust for Monday start
  };

  const isHoliday = (d: number, m: number) => {
    const formatted = `${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return HOLIDAYS.includes(formatted);
  };

  const handleDayClick = (day: number) => {
    const selectedDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (selectingMode === 'start') {
      setInternalStart(selectedDateStr);
      setInternalEnd('');
      setSelectingMode('end');
    } else {
      if (new Date(selectedDateStr) < new Date(internalStart)) {
        setInternalStart(selectedDateStr);
        setInternalEnd('');
        setSelectingMode('end');
      } else {
        setInternalEnd(selectedDateStr);
        onChange(internalStart, selectedDateStr);
        // Don't close immediately to let user see selection
        setTimeout(onClose, 300);
      }
    }
  };

  const isSelected = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === internalStart || dateStr === internalEnd;
  };

  const isInRange = (day: number) => {
    if (!internalStart || !internalEnd) return false;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr > internalStart && dateStr < internalEnd;
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  return (
    <div className="absolute top-full left-0 z-50 mt-2 p-4 bg-brand-900 border border-brand-500 rounded-lg shadow-2xl w-80">
      <div className="flex justify-between items-center mb-4 text-brand-50">
        <button onClick={() => changeMonth(-1)} className="p-1 hover:text-brand-500"><ChevronLeft size={20} /></button>
        <span className="font-serif font-bold text-lg">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)} className="p-1 hover:text-brand-500"><ChevronRight size={20} /></button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-bold text-brand-400 uppercase tracking-wide">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
          const day = i + 1;
          const holiday = isHoliday(day, currentDate.getMonth());
          const selected = isSelected(day);
          const range = isInRange(day);
          
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`
                h-10 w-full flex flex-col items-center justify-center text-sm rounded-md transition-all relative
                ${selected ? 'bg-brand-500 text-brand-900 font-bold shadow-glow' : ''}
                ${range ? 'bg-brand-900/50 border border-brand-500/30 text-brand-100' : ''}
                ${!selected && !range ? 'hover:bg-brand-800 text-brand-50' : ''}
                ${holiday && !selected ? 'text-red-400' : ''}
              `}
            >
              <span>{day}</span>
              {holiday && <span className="w-1 h-1 bg-red-400 rounded-full absolute bottom-1"></span>}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-3 border-t border-brand-800 flex justify-between items-center">
         <p className="text-xs text-brand-300">
           {internalStart && !internalEnd ? 'Sélectionnez le retour' : 'Sélectionnez les dates'}
         </p>
         <button onClick={onClose} className="text-xs text-brand-500 hover:text-white uppercase font-bold tracking-wider">Fermer</button>
      </div>
    </div>
  );
};