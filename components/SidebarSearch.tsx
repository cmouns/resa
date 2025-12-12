import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { SearchParams } from '../types';
import { POPULAR_LOCATIONS } from '../constants';

interface SidebarSearchProps {
  params: SearchParams;
  onChange: (newParams: SearchParams) => void;
  onSearch: () => void;
}

export const SidebarSearch: React.FC<SidebarSearchProps> = ({ params, onChange, onSearch }) => {
  return (
    <div className="bg-white p-6 shadow-soft rounded-sm border border-gray-100">
      <h3 className="font-serif text-xl text-gray-900 mb-6">Votre recherche</h3>
      
      <div className="space-y-6">
        {/* DEPART */}
        <div>
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Départ</span>
           </div>
           
           <div className="space-y-2">
             <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select 
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:border-brand-500 outline-none appearance-none"
                  value={params.location}
                  onChange={(e) => onChange({...params, location: e.target.value})}
                >
                   {POPULAR_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
             </div>
             
             <div className="flex gap-2">
               <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="date"
                    className="w-full pl-10 pr-2 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:border-brand-500 outline-none"
                    value={params.startDate}
                    onChange={(e) => onChange({...params, startDate: e.target.value})}
                  />
               </div>
               <div className="relative w-24">
                  <Clock className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    className="w-full pl-8 pr-2 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:border-brand-500 outline-none appearance-none"
                    value={params.startTime}
                    onChange={(e) => onChange({...params, startTime: e.target.value})}
                  >
                    <option>08:00</option>
                    <option>10:00</option>
                    <option>14:00</option>
                    <option>18:00</option>
                  </select>
               </div>
             </div>
           </div>
        </div>

        <div className="border-t border-gray-100"></div>

        {/* RETOUR */}
        <div>
           <div className="flex items-center justify-between mb-2">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Retour</span>
           </div>
           
           <div className="space-y-2">
             <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select 
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:border-brand-500 outline-none appearance-none"
                  value={params.location} // Simplified: return loc same as pickup for demo
                  disabled
                >
                   {POPULAR_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
             </div>
             
             <div className="flex gap-2">
               <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="date"
                    className="w-full pl-10 pr-2 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:border-brand-500 outline-none"
                    value={params.endDate}
                    onChange={(e) => onChange({...params, endDate: e.target.value})}
                  />
               </div>
               <div className="relative w-24">
                  <Clock className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    className="w-full pl-8 pr-2 py-3 bg-white border border-gray-200 rounded-sm text-sm focus:border-brand-500 outline-none appearance-none"
                    value={params.endTime}
                    onChange={(e) => onChange({...params, endTime: e.target.value})}
                  >
                    <option>08:00</option>
                    <option>10:00</option>
                    <option>14:00</option>
                    <option>18:00</option>
                  </select>
               </div>
             </div>
           </div>
        </div>

        <button 
          onClick={onSearch}
          className="w-full bg-black hover:bg-brand-500 hover:text-black text-white font-bold py-4 text-xs uppercase tracking-widest transition-colors rounded-sm"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
};