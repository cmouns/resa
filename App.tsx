import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { CarCard } from './components/CarCard';
import { ExtraSelection } from './components/ExtraSelection';
import { AuthModule } from './components/AuthModule';
import { StripePayment } from './components/StripePayment';
import { BookingSummary } from './components/BookingSummary';
import { AiAssistant } from './components/AiAssistant';
import { BookingState, Car, SearchParams, User } from './types';
import { MOCK_CARS } from './constants';
import { Check, ChevronRight, Home, Shield, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [booking, setBooking] = useState<BookingState>({
    step: 0,
    searchParams: {
      location: '',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '10:00',
      endDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      endTime: '10:00'
    },
    filters: {
      category: [],
      transmission: [],
      fuel: [],
      priceRange: [0, 1000]
    },
    selectedCar: null,
    selectedExtras: [],
    driverDetails: null
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Handlers ---
  const handleSearch = (params: SearchParams) => {
    setBooking(prev => ({ ...prev, searchParams: params, step: 1 }));
    window.scrollTo(0, 0);
  };

  const handleSelectCar = (car: Car) => {
    setBooking(prev => ({ ...prev, selectedCar: car, step: 2 }));
    window.scrollTo(0, 0);
  };

  const handleToggleExtra = (id: string) => {
    setBooking(prev => {
      const selected = prev.selectedExtras.includes(id) 
        ? prev.selectedExtras.filter(e => e !== id) 
        : [...prev.selectedExtras, id];
      return { ...prev, selectedExtras: selected };
    });
  };

  const handleOptionsConfirmed = () => {
    setBooking(prev => ({ ...prev, step: 3 })); // Go to Auth/Driver step
    window.scrollTo(0, 0);
  };

  const handleAuthenticated = (user: User) => {
    setBooking(prev => ({ ...prev, driverDetails: user, step: 4 })); // Go to Payment
    setShowAuthModal(false); // Close modal if it was open via navbar
    window.scrollTo(0, 0);
  };

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBooking(prev => ({ ...prev, step: 5 }));
      window.scrollTo(0, 0);
    }, 2000);
  };

  // --- Render Steps Indicator ---
  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: 'Recherche' },
      { num: 2, label: 'Véhicule' },
      { num: 3, label: 'Options' },
      { num: 4, label: 'Conducteur' },
      { num: 5, label: 'Paiement' }
    ];

    return (
      <div className="py-12 flex justify-center overflow-x-auto px-4">
        <div className="flex items-center space-x-4 md:space-x-8 lg:space-x-12 min-w-max">
          {steps.map((s, idx) => {
            const isActive = booking.step >= idx;
            const isCurrent = booking.step === idx;
            return (
              <div key={s.num} className="flex flex-col items-center relative group">
                <div className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300 z-10 bg-[#FAFAF9]
                  ${isActive ? 'border-brand-500 text-brand-500' : 'border-gray-300 text-gray-300'}
                  ${isCurrent ? 'bg-brand-500 text-brand-900 border-brand-500 font-bold shadow-lg scale-110' : ''}
                `}>
                  {isActive && !isCurrent ? <Check size={16} /> : s.num}
                </div>
                <span className={`
                  text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-3 transition-colors duration-300 absolute -bottom-6 w-32 text-center
                  ${isActive ? 'text-gray-900' : 'text-gray-300'}
                `}>
                  {s.label}
                </span>
                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div className={`
                    absolute top-4 md:top-5 left-8 md:left-10 w-4 md:w-8 lg:w-12 h-[1px] -z-0
                    ${booking.step > idx ? 'bg-brand-500' : 'bg-gray-200'}
                  `}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans flex flex-col">
      <Navbar 
        onOpenAuth={() => setShowAuthModal(true)} 
        currentUser={booking.driverDetails}
      />

      <div className="flex-1 flex flex-col">
        {/* Page Title */}
        <div className="text-center mt-12 mb-4 animate-fade-in">
          <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">Réservation en ligne</p>
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900">Planifiez votre trajet</h1>
        </div>

        {/* Wizard Steps */}
        {renderStepIndicator()}

        <main className="max-w-[1400px] mx-auto w-full px-6 pb-20 mt-10">
          
          {/* STEP 1: SEARCH (Recherche) */}
          {booking.step === 0 && (
             <HeroSearch onSearch={handleSearch} initialParams={booking.searchParams} />
          )}

          {/* STEP 2: VEHICLE (Véhicule) */}
          {booking.step === 1 && (
             <div className="animate-fade-in-up">
                <div className="flex items-center gap-2 mb-8 text-gray-500 text-sm">
                   <Home size={14} />
                   <ChevronRight size={14} />
                   <span>Résultats de recherche</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {MOCK_CARS.map(car => (
                      <div key={car.id} onClick={() => handleSelectCar(car)} className="cursor-pointer transform hover:-translate-y-1 transition-transform">
                        <CarCard car={car} onSelect={() => {}} />
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* STEP 3: OPTIONS (Options) */}
          {booking.step === 2 && (
             <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                   <ExtraSelection 
                     selectedIds={booking.selectedExtras} 
                     onToggle={handleToggleExtra}
                     onContinue={handleOptionsConfirmed}
                   />
                </div>
                <div className="lg:col-span-4">
                   <BookingSummary booking={booking} />
                </div>
             </div>
          )}

          {/* STEP 4: DRIVER / AUTH (Conducteur) */}
          {booking.step === 3 && (
             <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                   <div className="mb-6 flex items-center bg-brand-50 border border-brand-100 p-4 rounded-sm">
                      <Shield className="text-brand-500 mr-3" size={20} />
                      <p className="text-sm text-gray-700">Connectez-vous pour finaliser votre réservation et bénéficier de vos avantages fidélité.</p>
                   </div>
                   <AuthModule onAuthenticated={handleAuthenticated} />
                </div>
                <div className="lg:col-span-4">
                   <BookingSummary booking={booking} />
                </div>
             </div>
          )}

          {/* STEP 5: PAYMENT (Paiement) */}
          {booking.step === 4 && booking.selectedCar && (
            <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-8">
                  <div className="mb-8">
                    <h2 className="font-serif text-2xl text-gray-900 mb-2">Finalisation</h2>
                    <p className="text-gray-500 text-sm">Veuillez régler le montant pour confirmer la réservation.</p>
                  </div>
                  <StripePayment 
                    onSuccess={handlePaymentSuccess}
                    isProcessing={isProcessing}
                    totalAmount={
                      // Recalculating total quickly (better in helper)
                      (booking.selectedCar.pricePerDay * 3) + (booking.selectedExtras.length * 15 * 3) // Mock calc
                    }
                  />
               </div>
               <div className="lg:col-span-4">
                  <BookingSummary booking={booking} />
               </div>
            </div>
          )}

          {/* STEP 6: SUCCESS */}
          {booking.step === 5 && (
            <div className="max-w-2xl mx-auto text-center animate-scale-in py-10">
               <div className="w-24 h-24 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                 <Check size={40} className="text-brand-900" />
               </div>
               <h2 className="font-serif text-4xl text-gray-900 mb-6">Réservation Confirmée</h2>
               <p className="text-gray-600 mb-10 leading-relaxed">
                 Merci {booking.driverDetails?.firstName}. Votre véhicule de prestige a été réservé avec succès.<br/>
                 Un email de confirmation contenant votre contrat vient de vous être envoyé à {booking.driverDetails?.email}.
               </p>
               <button onClick={() => window.location.reload()} className="text-xs font-bold uppercase tracking-widest text-brand-900 border-b-2 border-brand-500 pb-1 hover:text-brand-600 transition-colors">
                 Retour à l'accueil
               </button>
            </div>
          )}

        </main>
      </div>

      {/* Global Auth Modal (Navbar Trigger) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="w-full max-w-md relative">
              <button onClick={() => setShowAuthModal(false)} className="absolute -top-12 right-0 text-white hover:text-brand-500">
                Fermer
              </button>
              <AuthModule onAuthenticated={handleAuthenticated} />
           </div>
        </div>
      )}

      <AiAssistant />
    </div>
  );
};

export default App;