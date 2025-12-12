import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { SearchParams } from '../types';
import { TimeSelect } from './TimeSelect';

interface HeroSearchProps {
  onSearch: (params: SearchParams) => void;
  initialParams: SearchParams;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, initialParams }) => {
  const [params, setParams] = useState<SearchParams>(initialParams);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-sm shadow-soft animate-fade-in-up">
      <div className="flex items-center mb-8">
        <MapPin className="text-brand-500 mr-3" size={24} />
        <h2 className="font-serif text-2xl text-gray-900">Dates & Lieux</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* DEPART */}
          <div className="space-y-4">
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Départ</label>
             
             {/* Lieu */}
             <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-sm outline-none focus:border-brand-500 transition-colors text-sm text-gray-700 placeholder-gray-400"
                  placeholder="Agence Bordeaux ou Adresse"
                  value={params.location}
                  onChange={(e) => setParams({...params, location: e.target.value})}
                />
             </div>

             {/* Date & Heure */}
             <div className="flex gap-4">
                <div className="relative flex-1">
                   <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                    type="date"
                    className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-sm outline-none focus:border-brand-500 transition-colors text-sm text-gray-700"
                    value={params.startDate}
                    onChange={(e) => setParams({...params, startDate: e.target.value})}
                   />
                </div>
                <div className="w-32">
                   <TimeSelect 
                      value={params.startTime} 
                      onChange={(t) => setParams({...params, startTime: t})} 
                   />
                </div>
             </div>
          </div>

          {/* RETOUR */}
          <div className="space-y-4">
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Retour</label>
             
             {/* Lieu */}
             <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-sm outline-none focus:border-brand-500 transition-colors text-sm text-gray-700 placeholder-gray-400"
                  placeholder="Agence Bordeaux ou Adresse"
                  value={params.location} // Assuming same return location for simple demo
                  readOnly
                />
             </div>

             {/* Date & Heure */}
             <div className="flex gap-4">
                <div className="relative flex-1">
                   <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                    type="date"
                    className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-sm outline-none focus:border-brand-500 transition-colors text-sm text-gray-700"
                    value={params.endDate}
                    onChange={(e) => setParams({...params, endDate: e.target.value})}
                   />
                </div>
                <div className="w-32">
                   <TimeSelect 
                      value={params.endTime} 
                      onChange={(t) => setParams({...params, endTime: t})} 
                   />
                </div>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 flex justify-between items-center border-t border-gray-100 pt-8">
           <button type="button" className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 flex items-center">
             <ArrowRight className="rotate-180 mr-2" size={14} /> Retour
           </button>

           <button 
             type="submit"
             className="bg-brand-500 hover:bg-brand-600 text-brand-900 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
           >
             Suivant <ArrowRight className="ml-2" size={14} />
           </button>
        </div>
      </form>
    </div>
  );
};