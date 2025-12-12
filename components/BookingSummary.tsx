import React from 'react';
import { BookingState } from '../types';
import { EXTRA_OPTIONS } from '../constants';
import { Calendar, MapPin, Check, Car as CarIcon, User as UserIcon } from 'lucide-react';

// Simple date formatter
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
};

const getDays = (start: string, end: string) => {
  if (!start || !end) return 1;
  const s = new Date(start);
  const e = new Date(end);
  const diffTime = Math.abs(e.getTime() - s.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays || 1;
};

interface BookingSummaryProps {
  booking: BookingState;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ booking }) => {
  if (!booking.selectedCar) return (
    <div className="bg-brand-900 rounded-lg p-6 border border-brand-800 text-center">
       <CarIcon className="mx-auto text-brand-700 mb-2 opacity-50" size={32} />
       <p className="text-brand-400 text-sm italic">Sélectionnez un véhicule pour voir le détail.</p>
    </div>
  );

  const days = getDays(booking.searchParams.startDate, booking.searchParams.endDate);
  const carTotal = booking.selectedCar.pricePerDay * days;
  
  const selectedExtrasList = EXTRA_OPTIONS.filter(opt => booking.selectedExtras.includes(opt.id));
  const extrasTotal = selectedExtrasList.reduce((acc, opt) => acc + (opt.price * days), 0);
  
  const total = carTotal + extrasTotal;

  return (
    <div className="bg-white rounded-lg p-6 border border-brand-200 shadow-xl relative overflow-hidden sticky top-24">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400"></div>
      
      <h3 className="font-serif font-bold text-xl text-brand-900 mb-6 flex justify-between items-end">
        <span>Récapitulatif</span>
        <span className="text-xs font-sans font-normal text-gray-400 uppercase tracking-widest">Devis</span>
      </h3>
      
      {/* Car Info */}
      <div className="flex items-start mb-6 pb-6 border-b border-dashed border-gray-200">
        <div className="w-20 h-14 bg-gray-100 rounded overflow-hidden mr-4 border border-gray-200">
            <img src={booking.selectedCar.image} alt={booking.selectedCar.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-brand-900 leading-tight">{booking.selectedCar.name}</h4>
          <p className="text-xs text-brand-600 uppercase tracking-wide font-bold mt-1">{booking.selectedCar.category}</p>
        </div>
      </div>

      {/* Dates & Loc */}
      <div className="space-y-3 mb-6 pb-6 border-b border-dashed border-gray-200">
        <div className="flex items-start">
           <MapPin size={14} className="text-brand-500 mt-0.5 mr-2 shrink-0" />
           <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Lieu de prise en charge</p>
              <p className="text-sm font-medium text-gray-800">{booking.searchParams.location || "Non défini"}</p>
           </div>
        </div>
        <div className="flex items-start">
           <Calendar size={14} className="text-brand-500 mt-0.5 mr-2 shrink-0" />
           <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Période de location</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(booking.searchParams.startDate)} - {formatDate(booking.searchParams.endDate)}
              </p>
              <p className="text-xs text-brand-600 mt-0.5">{days} jours • {booking.searchParams.startTime} à {booking.searchParams.endTime}</p>
           </div>
        </div>
      </div>

      {/* Driver Info if Present */}
      {booking.driverDetails && (
        <div className="mb-6 pb-6 border-b border-dashed border-gray-200 animate-fade-in">
           <div className="flex items-start">
             <UserIcon size={14} className="text-brand-500 mt-0.5 mr-2 shrink-0" />
             <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Conducteur Principal</p>
                <p className="text-sm font-medium text-brand-900">{booking.driverDetails.firstName} {booking.driverDetails.lastName}</p>
                <p className="text-xs text-gray-500">{booking.driverDetails.email}</p>
             </div>
           </div>
        </div>
      )}

      {/* Pricing Breakdown */}
      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Location de base</span>
          <span className="font-medium text-gray-900">{carTotal.toFixed(2)}€</span>
        </div>
        
        {selectedExtrasList.map(extra => (
          <div key={extra.id} className="flex justify-between text-sm animate-fade-in">
            <span className="text-gray-600 flex items-center">
              <Check size={12} className="mr-1 text-brand-500" /> {extra.name}
            </span>
            <span className="font-medium text-gray-900">{(extra.price * days).toFixed(2)}€</span>
          </div>
        ))}
        
        <div className="flex justify-between text-sm pt-2">
           <span className="text-gray-500">Taxes et frais de service</span>
           <span className="text-brand-600 font-medium text-xs bg-brand-50 px-2 py-0.5 rounded border border-brand-100">Offerts</span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-brand-900">
        <div className="flex justify-between items-end">
          <span className="font-serif font-bold text-brand-900 text-lg">Total TTC</span>
          <span className="font-serif font-bold text-2xl text-brand-600">{total.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};