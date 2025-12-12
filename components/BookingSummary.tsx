import React from 'react';
import { BookingState } from '../types';
import { Calendar, MapPin, Clock } from 'lucide-react';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(d);
};

const getDays = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  const diffTime = Math.abs(e.getTime() - s.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays || 1;
};

interface BookingSummaryProps {
  booking: BookingState;
  showTotal?: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ booking, showTotal = true }) => {
  const days = getDays(booking.searchParams.startDate, booking.searchParams.endDate);
  
  // Calculate total
  let total = 0;
  if (booking.selectedCar) {
    total += booking.selectedCar.pricePerDay * days;
  }
  // Add extras calculation logic here if needed for total display
  
  return (
    <div className="bg-white p-6 shadow-soft rounded-sm border border-gray-100">
      <h3 className="font-serif text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">Récapitulatif de votre réservation</h3>
      
      <div className="space-y-8 relative">
        {/* Connector Line */}
        <div className="absolute left-[7px] top-8 bottom-8 w-[1px] bg-gray-200 z-0"></div>

        {/* DEPART */}
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white mr-3 shadow-sm"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Départ</span>
          </div>
          <div className="ml-7">
             <div className="flex items-center text-sm font-bold text-gray-900 mb-1">
               <MapPin size={14} className="mr-2 text-brand-500" />
               Agence : {booking.searchParams.location}
             </div>
             <div className="flex items-center text-sm text-gray-600">
               <Calendar size={14} className="mr-2 text-gray-400" />
               Le {formatDate(booking.searchParams.startDate)} à {booking.searchParams.startTime}
             </div>
          </div>
        </div>

        {/* RETOUR */}
        <div className="relative z-10">
          <div className="flex items-center mb-2">
             <div className="w-4 h-4 rounded-full bg-black border-2 border-white mr-3 shadow-sm"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Retour</span>
          </div>
          <div className="ml-7">
             <div className="flex items-center text-sm font-bold text-gray-900 mb-1">
               <MapPin size={14} className="mr-2 text-brand-500" />
               Agence : {booking.searchParams.location}
             </div>
             <div className="flex items-center text-sm text-gray-600">
               <Calendar size={14} className="mr-2 text-gray-400" />
               Le {formatDate(booking.searchParams.endDate)} à {booking.searchParams.endTime}
             </div>
          </div>
        </div>
      </div>

      {booking.selectedCar && showTotal && (
        <div className="mt-8 pt-6 border-t border-gray-100 animate-fade-in">
           <button className="w-full bg-black text-white text-sm font-bold py-3 uppercase tracking-widest hover:bg-brand-500 hover:text-black transition-colors rounded-sm">
             Modifier
           </button>
        </div>
      )}
    </div>
  );
};