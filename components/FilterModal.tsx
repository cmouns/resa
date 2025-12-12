import React from 'react';
import { X, Check } from 'lucide-react';
import { CarFilters } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: CarFilters;
  setFilters: (f: CarFilters) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, filters, setFilters }) => {
  if (!isOpen) return null;

  const toggleFilter = (key: keyof CarFilters, value: string) => {
    // @ts-ignore
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setFilters({ ...filters, [key]: updated });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-brand-50 w-full max-w-md rounded-xl shadow-2xl overflow-hidden relative border border-brand-200 animate-fade-in-up">
        <div className="bg-brand-900 p-6 flex justify-between items-center">
          <h3 className="text-xl font-serif text-brand-500">Filtrer les véhicules</h3>
          <button onClick={onClose} className="text-brand-200 hover:text-white"><X size={24} /></button>
        </div>

        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Transmission */}
          <div>
            <h4 className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-4 border-b border-brand-200 pb-2">Transmission</h4>
            <div className="flex gap-3">
              {['Automatique', 'Manuelle'].map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter('transmission', type)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                    filters.transmission.includes(type)
                      ? 'bg-brand-500 border-brand-500 text-white'
                      : 'border-brand-300 text-brand-800 hover:border-brand-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-4 border-b border-brand-200 pb-2">Catégorie</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Citadine', 'SUV', 'Berline Électrique', 'Premium', 'SUV Compact'].map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleFilter('category', cat)}
                  className={`flex items-center space-x-2 text-left ${
                     filters.category.includes(cat) ? 'text-brand-600 font-bold' : 'text-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                     filters.category.includes(cat) ? 'bg-brand-500 border-brand-500' : 'border-gray-400'
                  }`}>
                    {filters.category.includes(cat) && <Check size={12} className="text-white" />}
                  </div>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fuel */}
          <div>
            <h4 className="text-sm font-bold text-brand-900 uppercase tracking-wider mb-4 border-b border-brand-200 pb-2">Carburant</h4>
            <div className="flex flex-wrap gap-2">
              {['Essence', 'Diesel', 'Électrique', 'Hybride'].map(fuel => (
                <button
                  key={fuel}
                  onClick={() => toggleFilter('fuel', fuel)}
                  className={`px-3 py-1.5 rounded-md border text-xs font-bold uppercase transition-all ${
                    filters.fuel.includes(fuel)
                      ? 'bg-brand-900 border-brand-900 text-brand-500'
                      : 'border-gray-300 text-gray-500 hover:border-brand-500 hover:text-brand-500'
                  }`}
                >
                  {fuel}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-brand-200 bg-brand-100 flex justify-end">
           <button 
             onClick={onClose}
             className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest text-sm transition-colors"
           >
             Appliquer les filtres
           </button>
        </div>
      </div>
    </div>
  );
};