import React from 'react';
import { ExtraOption } from '../types';
import { Check, Plus } from 'lucide-react';
import { EXTRA_OPTIONS } from '../constants';

interface ExtraSelectionProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
  onContinue: () => void;
}

export const ExtraSelection: React.FC<ExtraSelectionProps> = ({ selectedIds, onToggle, onContinue }) => {
  return (
    <div className="animate-fade-in-up">
      <h2 className="font-serif text-2xl text-gray-900 mb-6">Personnalisez votre voyage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {EXTRA_OPTIONS.map(option => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <div 
              key={option.id}
              onClick={() => onToggle(option.id)}
              className={`
                relative p-6 rounded-sm border-2 cursor-pointer transition-all duration-300 group
                ${isSelected 
                  ? 'border-brand-500 bg-brand-50 shadow-md' 
                  : 'border-transparent bg-white hover:border-brand-200 hover:shadow-sm'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold text-lg ${isSelected ? 'text-brand-900' : 'text-gray-700'}`}>{option.name}</h3>
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-300 group-hover:bg-gray-200'}
                `}>
                  {isSelected ? <Check size={14} /> : <Plus size={14} />}
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4 h-10">{option.description}</p>
              
              <div className="pt-4 border-t border-gray-100/50 flex justify-between items-center">
                 <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Prix</span>
                 <span className="font-serif text-lg text-brand-600 font-bold">{option.price}€<span className="text-xs font-sans text-gray-400 font-normal">/jour</span></span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onContinue}
          className="bg-brand-500 hover:bg-brand-600 text-brand-900 px-10 py-4 text-xs font-bold tracking-widest uppercase transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Valider les options
        </button>
      </div>
    </div>
  );
};