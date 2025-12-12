import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="absolute top-full left-0 z-50 mt-2 p-6 bg-[#111111] border border-brand-500 rounded-sm shadow-2xl w-96 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-full text-brand-500 transition-colors"><ChevronLeft size={20} /></button>
        <span className="font-serif font-bold text-xl text-[#D4AF37] tracking-wider">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-full text-brand-500 transition-colors"><ChevronRight size={20} /></button>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">{d}</div>
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
                h-10 w-full flex flex-col items-center justify-center text-sm font-medium transition-all relative rounded-sm
                ${selected ? 'bg-[#D4AF37] text-black font-bold shadow-lg scale-105 z-10' : ''}
                ${range ? 'bg-white/10 text-brand-100' : ''}
                ${!selected && !range ? 'text-gray-300 hover:text-white hover:bg-white/5' : ''}
                ${holiday && !selected ? 'text-red-400' : ''}
              `}
            >
              <span>{day}</span>
              {holiday && <span className="w-1 h-1 bg-[#D4AF37] rounded-full absolute bottom-1.5 shadow-[0_0_5px_#D4AF37]"></span>}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
         <p className="text-xs text-gray-400 italic font-serif">
           {internalStart && !internalEnd ? 'Sélectionnez le retour...' : 'Votre séjour de rêve commence ici.'}
         </p>
         <button onClick={onClose} className="text-xs text-[#D4AF37] hover:text-white uppercase font-bold tracking-widest transition-colors">Fermer</button>
      </div>
    </div>
  );
};