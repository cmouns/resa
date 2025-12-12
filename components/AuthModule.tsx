import React, { useState } from 'react';
import { User } from '../types';
import { Check, Mail, Lock, User as UserIcon, Phone, ArrowRight } from 'lucide-react';

interface AuthModuleProps {
  onAuthenticated: (user: User) => void;
}

export const AuthModule: React.FC<AuthModuleProps> = ({ onAuthenticated }) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated({
        email,
        firstName: firstName || 'Client',
        lastName: lastName || 'Prestige',
        phone,
        isGuest: false
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-sm shadow-soft border-t-4 border-brand-500 overflow-hidden animate-fade-in-up">
      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setView('login')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${view === 'login' ? 'bg-white text-brand-900 border-b-2 border-brand-500' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
        >
          Connexion
        </button>
        <button 
          onClick={() => setView('register')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${view === 'register' ? 'bg-white text-brand-900 border-b-2 border-brand-500' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
        >
          Créer un compte
        </button>
      </div>

      <div className="p-8">
        <h3 className="font-serif text-2xl text-gray-900 mb-2">
          {view === 'login' ? 'Bienvenue' : 'Rejoignez le club'}
        </h3>
        <p className="text-sm text-gray-500 mb-8">
          {view === 'login' 
            ? 'Connectez-vous pour accéder à vos réservations et avantages.' 
            : 'Créez votre profil conducteur pour une réservation accélérée.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {view === 'register' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Prénom"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-brand-500 focus:bg-white transition-all text-sm"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Nom"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-brand-500 focus:bg-white transition-all text-sm"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="email" 
              placeholder="Adresse email"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-brand-500 focus:bg-white transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {view === 'register' && (
             <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="tel" 
                placeholder="Téléphone mobile"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-brand-500 focus:bg-white transition-all text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="password" 
              placeholder="Mot de passe"
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm outline-none focus:border-brand-500 focus:bg-white transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-900 text-white font-bold py-4 mt-2 text-xs uppercase tracking-widest hover:bg-black transition-all flex justify-center items-center"
          >
            {isLoading ? (
               <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
               <span className="flex items-center">
                 {view === 'login' ? 'Se connecter' : 'Confirmer l\'inscription'} <ArrowRight className="ml-2" size={14} />
               </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
           <p className="text-xs text-gray-400">Ou continuer avec</p>
           <div className="flex gap-4 justify-center mt-4">
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <img src="https://www.svgrepo.com/show/448234/apple.svg" alt="Apple" className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};