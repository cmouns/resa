import React from 'react';
import { Car } from '../types';
import { Fuel, Gauge, Users, Star, Check } from 'lucide-react';

interface CarCardProps {
  car: Car;
  isSelected?: boolean;
  onSelect: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, isSelected, onSelect }) => {
  return (
    <div 
      className={`group relative bg-white overflow-hidden transition-all duration-300 border-l-4 shadow-sm hover:shadow-xl
        ${isSelected ? 'border-brand-500 ring-1 ring-brand-500 shadow-md' : 'border-transparent hover:border-brand-300'}
        flex flex-col md:flex-row h-auto md:h-56 mb-6 rounded-r-lg
      `}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/3 relative overflow-hidden bg-brand-900">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-0 left-0 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
          {car.category}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between relative bg-gradient-to-r from-white to-brand-50">
        {/* Background Watermark */}
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
           <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 17h2c.55 0 1 .45 1 1s-.45 1-1 1h-2v1c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-1H2c-.55 0-1-.45-1-1s.45-1 1-1h2v-5c0-3.87 3.13-7 7-7h1c1.86 0 3.54.74 4.79 1.94l.01.01.01.01c.36.38.7.79 1.01 1.22.46.64.84 1.33 1.11 2.06.02.06.05.12.07.18.23.68.39 1.41.46 2.16.01.12.02.25.02.37V17zM11 6c-3.31 0-6 2.69-6 6v5h14v-5c0-3.31-2.69-6-6-6zm-5 7h2v2H6v-2zm8 0h2v2h-2v-2z"/>
           </svg>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-serif font-bold text-brand-900 mb-1">{car.name}</h3>
              <div className="flex items-center space-x-1 text-brand-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < Math.floor(car.rating) ? "currentColor" : "none"} className={i < Math.floor(car.rating) ? "" : "text-brand-200"} />
                ))}
                <span className="text-xs text-gray-500 ml-2">({car.reviews} avis)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-serif font-bold text-brand-900">{car.pricePerDay}€</span>
              <span className="text-xs text-brand-600 uppercase tracking-wide">Par jour</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600 mt-3 border-t border-brand-100 pt-3">
            <div className="flex items-center" title="Places">
              <Users size={16} className="mr-2 text-brand-400" />
              <span>{car.seats} Places</span>
            </div>
            <div className="flex items-center" title="Transmission">
              <Gauge size={16} className="mr-2 text-brand-400" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center" title="Carburant">
              <Fuel size={16} className="mr-2 text-brand-400" />
              <span>{car.fuel}</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 mt-4 flex items-center justify-between">
           <div className="flex gap-2">
              {car.features.slice(0, 2).map((feat, idx) => (
                <span key={idx} className="text-[10px] bg-brand-100 text-brand-800 px-2 py-1 rounded border border-brand-200">{feat}</span>
              ))}
              {car.features.length > 2 && <span className="text-[10px] text-gray-400 py-1">+{car.features.length - 2}</span>}
           </div>

           <button 
            onClick={() => onSelect(car)}
            className={`
              px-8 py-3 rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-lg
              ${isSelected 
                ? 'bg-brand-900 text-white cursor-default' 
                : 'bg-brand-500 text-white hover:bg-brand-600 hover:shadow-brand-500/40'}
            `}
          >
            {isSelected ? (
              <span className="flex items-center"><Check size={14} className="mr-2" /> Sélectionné</span>
            ) : (
              "Réserver ce véhicule"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};