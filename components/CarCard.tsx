import React from 'react';
import { Car } from '../types';
import { Users, Fuel, Gauge, DoorClosed, Wind } from 'lucide-react';

interface CarCardProps {
  car: Car;
  totalPrice: number;
  onSelect: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, totalPrice, onSelect }) => {
  return (
    <div className="bg-white rounded-sm shadow-soft overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
      {/* Image Container */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-0 right-0 bg-brand-500 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
           {car.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
         <div className="mb-4">
           <h3 className="font-serif text-lg font-bold text-gray-900 uppercase">{car.name}</h3>
           <p className="text-xs text-gray-500 italic">ou similaire</p>
         </div>

         {/* Specs Grid */}
         <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600 mb-6 flex-1">
            <div className="flex items-center">
               <Users size={14} className="mr-2 text-brand-500" /> {car.seats} places
            </div>
            <div className="flex items-center">
               <Wind size={14} className="mr-2 text-brand-500" /> Climatisation
            </div>
            <div className="flex items-center">
               <Fuel size={14} className="mr-2 text-brand-500" /> {car.fuel}
            </div>
            <div className="flex items-center">
               <DoorClosed size={14} className="mr-2 text-brand-500" /> 5 portes
            </div>
            <div className="flex items-center col-span-2">
               <Gauge size={14} className="mr-2 text-brand-500" /> {car.transmission}
            </div>
         </div>

         <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-500 mb-2">Paiement en ligne</p>
            <button 
              onClick={() => onSelect(car)}
              className="w-full bg-black text-white py-3 px-4 font-bold text-sm uppercase tracking-wider hover:bg-brand-500 hover:text-black transition-colors rounded-sm flex justify-center items-center"
            >
              Réserver pour {totalPrice.toFixed(2)}€
            </button>
         </div>
      </div>
    </div>
  );
};