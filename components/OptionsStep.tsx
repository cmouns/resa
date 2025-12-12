import React, { useState, useRef } from 'react';
import { Car } from '../types';
import { INSURANCE_OPTIONS, MILEAGE_OPTIONS, EXTRA_OPTIONS } from '../constants';
import { Check, Users, Fuel, Gauge, Wind, DoorClosed, GripVertical } from 'lucide-react';

interface OptionsStepProps {
  selectedCar: Car;
  totalCarPrice: number;
  selectedInsurance: string;
  selectedMileage: string;
  selectedExtras: string[];
  onSetInsurance: (id: string) => void;
  onSetMileage: (id: string) => void;
  onToggleExtra: (id: string) => void;
  onNext: () => void;
}

export const OptionsStep: React.FC<OptionsStepProps> = ({ 
  selectedCar, 
  totalCarPrice,
  selectedInsurance,
  selectedMileage,
  selectedExtras,
  onSetInsurance,
  onSetMileage,
  onToggleExtra,
  onNext
}) => {
  // Local state for drag and drop reordering
  const [orderedExtras, setOrderedExtras] = useState(EXTRA_OPTIONS);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    const _items = [...orderedExtras];
    const draggedItemContent = _items.splice(dragItem.current, 1)[0];
    _items.splice(dragOverItem.current, 0, draggedItemContent);
    
    dragItem.current = null;
    dragOverItem.current = null;
    setOrderedExtras(_items);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* 1. Votre sélection (Top Card) */}
      <div className="bg-white border border-gray-200 p-0 rounded-sm overflow-hidden">
         <div className="bg-black text-white px-6 py-2 text-sm font-bold uppercase tracking-widest">
            Votre sélection
         </div>
         <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-48 h-32 bg-gray-100 rounded-sm overflow-hidden shrink-0">
               <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 w-full">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900">{selectedCar.name}</h3>
                    <p className="text-sm text-gray-500 italic">ou similaire</p>
                  </div>
                  <div className="border border-gray-300 rounded px-4 py-2 text-lg font-bold text-gray-900">
                     {totalCarPrice.toFixed(2)}€
                  </div>
               </div>
               
               <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
                  <span className="flex items-center"><Users size={14} className="mr-1" /> {selectedCar.seats} places</span>
                  <span className="flex items-center"><Wind size={14} className="mr-1" /> Climatisation</span>
                  <span className="flex items-center"><Fuel size={14} className="mr-1" /> {selectedCar.fuel}</span>
                  <span className="flex items-center"><DoorClosed size={14} className="mr-1" /> 5 portes</span>
                  <span className="flex items-center"><Gauge size={14} className="mr-1" /> {selectedCar.transmission}</span>
               </div>
               
               <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                 Limousine premium élégante et raffinée, plus de 400 ch, boîte automatique avec double écran tactile, Bluetooth, Apple CarPlay & Android Auto ; finition AMG Line.
               </p>
            </div>
         </div>
      </div>

      {/* 2. Franchise (Insurance) */}
      <div className="bg-white p-6 border border-gray-200 rounded-sm">
         <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-serif text-gray-900">Assurance & Franchise</h4>
            <span className="bg-brand-50 text-brand-900 text-[10px] font-bold px-2 py-1 uppercase tracking-widest border border-brand-200">Recommandé</span>
         </div>
         <div className="space-y-3">
            {INSURANCE_OPTIONS.map(opt => (
               <div 
                 key={opt.id} 
                 onClick={() => onSetInsurance(opt.id)}
                 className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all duration-200 ${
                    selectedInsurance === opt.id 
                    ? 'border-brand-500 bg-brand-50/50 shadow-md ring-1 ring-brand-500' 
                    : 'border-gray-200 bg-white hover:border-brand-300'
                 }`}
               >
                  <div className="flex-1">
                     <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900">{opt.name}</p>
                        {selectedInsurance === opt.id && <Check size={16} className="text-brand-500" />}
                     </div>
                     <p className="text-sm text-gray-600 mt-1">{opt.description}</p>
                  </div>
                  <div className="text-right pl-4">
                     <p className="text-lg font-bold text-brand-900">{opt.price === 0 ? 'Inclus' : `+${opt.price}€`}<span className="text-xs font-normal text-gray-400">/j</span></p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 3. Kilométrage */}
      <div>
         <h4 className="text-xl font-serif text-gray-900 mb-4">Sélectionnez le kilométrage</h4>
         <div className="space-y-3">
            {MILEAGE_OPTIONS.map(opt => (
               <div 
                 key={opt.id} 
                 onClick={() => onSetMileage(opt.id)}
                 className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${
                    selectedMileage === opt.id ? 'border-brand-500 bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
                 }`}
               >
                  <div>
                     <p className="font-bold text-gray-900">{opt.name}</p>
                     <p className="text-sm text-gray-500">{opt.description}</p>
                     <p className="text-xs text-gray-400 mt-1">{opt.price === 0 ? 'Au total: 0.00€' : `+${opt.price}€`}</p>
                  </div>
                  <button className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${
                     selectedMileage === opt.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                  }`}>
                     {selectedMileage === opt.id ? <span className="flex items-center"><Check size={12} className="mr-1" /> Sélectionné</span> : 'Sélectionner'}
                  </button>
               </div>
            ))}
         </div>
      </div>

      {/* 4. Options (Draggable) */}
      <div>
         <div className="flex justify-between items-end mb-4">
            <h4 className="text-xl font-serif text-gray-900">Options supplémentaires</h4>
            <span className="text-xs text-gray-400 italic">Glissez pour réorganiser</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orderedExtras.map((opt, index) => {
               const isSelected = selectedExtras.includes(opt.id);
               return (
                  <div 
                    key={opt.id} 
                    draggable
                    onDragStart={() => (dragItem.current = index)}
                    onDragEnter={() => (dragOverItem.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => onToggleExtra(opt.id)}
                    className={`
                       p-4 border rounded-sm cursor-move transition-all flex flex-col justify-between h-48 relative group
                       ${isSelected ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white hover:border-gray-300'}
                       active:scale-95 active:shadow-xl
                    `}
                  >
                     <div className="absolute top-2 right-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical size={16} />
                     </div>

                     <div>
                        <h5 className="font-bold text-gray-900 mb-1 pr-4">{opt.name}</h5>
                        <p className="text-sm font-bold text-brand-600 mb-3">{opt.price}€<span className="text-xs font-normal text-gray-500">/jour</span></p>
                        <p className="text-xs text-gray-500 leading-relaxed">{opt.description}</p>
                     </div>
                     <div className="mt-4 flex justify-end">
                        <div className={`
                           w-6 h-6 rounded border flex items-center justify-center transition-colors
                           ${isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300'}
                        `}>
                           {isSelected && <Check size={14} />}
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>

      <div className="flex justify-end pt-8 border-t border-gray-100">
         <button 
           onClick={onNext}
           className="bg-brand-500 hover:bg-brand-600 text-black px-12 py-4 font-bold uppercase tracking-widest text-sm rounded-sm shadow-lg transform transition hover:-translate-y-1"
         >
           Continuer
         </button>
      </div>

    </div>
  );
};