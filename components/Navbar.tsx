import React from 'react';
import { Phone, UserCircle } from 'lucide-react';

interface NavbarProps {
  onOpenAuth?: () => void;
  currentUser?: { firstName: string; lastName: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, currentUser }) => {
  return (
    <nav className="bg-[#111111] text-white h-20 w-full sticky top-0 z-50 shadow-md">
      <div className="max-w-[1400px] mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
          <div className="flex flex-col items-center">
             <span className="font-serif italic text-2xl text-brand-500 tracking-wider">Automatic Cars</span>
             <span className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mt-[-4px]">Car Rental</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-widest uppercase">
          <a href="#" className="text-white hover:text-brand-500 transition-colors">Accueil</a>
          <a href="#" className="text-brand-500 border-b border-brand-500 pb-1">Réservation</a>
          <a href="#" className="text-white hover:text-brand-500 transition-colors">Flotte</a>
          <a href="#" className="text-white hover:text-brand-500 transition-colors">Prestige</a>
          <a href="#" className="text-white hover:text-brand-500 transition-colors">Contact</a>
        </div>

        {/* Right Action Area */}
        <div className="flex items-center space-x-6">
           <div className="hidden lg:flex items-center space-x-2 text-white border-r border-gray-800 pr-6">
             <Phone size={14} className="text-brand-500" />
             <span className="text-xs font-medium tracking-wide">+33 7 68 17 68 82</span>
           </div>
           
           <button 
             onClick={onOpenAuth}
             className="flex items-center space-x-2 text-xs font-bold tracking-widest uppercase hover:text-brand-500 transition-colors"
           >
             <UserCircle size={18} className={currentUser ? "text-brand-500" : "text-gray-400"} />
             <span>{currentUser ? `${currentUser.firstName}` : "Connexion"}</span>
           </button>

           <button className="bg-brand-500 hover:bg-brand-600 text-brand-900 px-6 py-3 text-[11px] font-bold tracking-widest uppercase transition-colors">
             Réserver
           </button>
        </div>
      </div>
    </nav>
  );
};