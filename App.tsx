import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StepIndicator } from './components/StepIndicator';
import { SidebarSearch } from './components/SidebarSearch';
import { BookingSummary } from './components/BookingSummary';
import { CarCard } from './components/CarCard';
import { OptionsStep } from './components/OptionsStep';
import { InfoStep } from './components/InfoStep';
import { StripePayment } from './components/StripePayment';
import { AiAssistant } from './components/AiAssistant';
import { BookingState, Car, SearchParams, User } from './types';
import { MOCK_CARS, INSURANCE_OPTIONS, MILEAGE_OPTIONS, EXTRA_OPTIONS } from './constants';
import { Check } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [booking, setBooking] = useState<BookingState>({
    step: 0,
    searchParams: {
      location: 'Aéroport',
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
    selectedInsurance: 'insurance_basic',
    selectedMileage: 'km_200',
    driverDetails: null
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // --- Calculations ---
  const getDays = () => {
    const s = new Date(booking.searchParams.startDate);
    const e = new Date(booking.searchParams.endDate);
    return Math.ceil(Math.abs(e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) || 1;
  };

  const calculateTotal = (carPrice: number) => {
    const days = getDays();
    let total = carPrice * days;
    
    // Add insurance
    const insurance = INSURANCE_OPTIONS.find(i => i.id === booking.selectedInsurance);
    if (insurance) total += insurance.price * days;

    // Add mileage
    const mileage = MILEAGE_OPTIONS.find(m => m.id === booking.selectedMileage);
    if (mileage) total += mileage.price * days; // assuming price per day for demo

    // Add extras
    booking.selectedExtras.forEach(id => {
      const extra = EXTRA_OPTIONS.find(e => e.id === id);
      if (extra) total += extra.price * days;
    });

    return total;
  };

  // --- Handlers ---
  const handleSearch = () => {
    // Just refresh results or scroll top, simplified for demo
    window.scrollTo(0,0);
  };

  const handleSelectCar = (car: Car) => {
    setBooking(prev => ({ ...prev, selectedCar: car, step: 1 }));
    window.scrollTo(0, 0);
  };

  const handleNextStep = (data?: any) => {
    if (booking.step === 2 && data) {
       setBooking(prev => ({ ...prev, driverDetails: data, step: 3 }));
    } else {
       setBooking(prev => ({ ...prev, step: prev.step + 1 }));
    }
    window.scrollTo(0, 0);
  };

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBooking(prev => ({ ...prev, step: 4 })); // Success
      window.scrollTo(0, 0);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans flex flex-col">
      <Navbar />
      <StepIndicator currentStep={booking.step} />

      <main className="max-w-[1400px] mx-auto w-full px-6 pb-20">
        
        {booking.step === 4 ? (
          // --- SUCCESS STEP ---
          <div className="max-w-2xl mx-auto text-center animate-scale-in py-10">
             <div className="w-24 h-24 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
               <Check size={40} className="text-black" />
             </div>
             <h2 className="font-serif text-4xl text-gray-900 mb-6">Réservation Confirmée</h2>
             <p className="text-gray-600 mb-10 leading-relaxed">
               Merci {booking.driverDetails?.firstName}. Votre demande a bien été prise en compte.<br/>
               Un email de confirmation vient de vous être envoyé.
             </p>
             <button onClick={() => window.location.reload()} className="text-xs font-bold uppercase tracking-widest text-brand-900 border-b-2 border-brand-500 pb-1 hover:text-brand-600 transition-colors">
               Retour à l'accueil
             </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
             
             {/* --- LEFT SIDEBAR --- */}
             <aside className="w-full lg:w-1/4 min-w-[320px] sticky top-40">
                {booking.step === 0 ? (
                  <SidebarSearch 
                    params={booking.searchParams}
                    onChange={(p) => setBooking(prev => ({...prev, searchParams: p}))}
                    onSearch={handleSearch}
                  />
                ) : (
                  <BookingSummary booking={booking} />
                )}

                {/* Recap Total for steps 1, 2, 3 */}
                {booking.step > 0 && booking.selectedCar && (
                   <div className="mt-6 bg-white p-6 shadow-soft rounded-sm border border-gray-100">
                      <h4 className="font-serif text-lg font-bold text-gray-900 mb-4">Récapitulatif du montant</h4>
                      <div className="flex justify-between items-end">
                         <span className="text-sm text-gray-500">Montant (hors option)</span>
                         <span className="font-bold text-gray-900">{(booking.selectedCar.pricePerDay * getDays()).toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between items-end mt-2 pt-2 border-t border-gray-100">
                         <span className="font-bold text-lg text-gray-900">Montant TOTAL</span>
                         <span className="font-bold text-xl text-brand-600">{calculateTotal(booking.selectedCar.pricePerDay).toFixed(2)}€ TTC</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">dont TVA incluse</p>
                   </div>
                )}
             </aside>

             {/* --- MAIN CONTENT --- */}
             <div className="flex-1 w-full">
                
                {/* STEP 1: RESULTS */}
                {booking.step === 0 && (
                   <div>
                      <div className="mb-6 pb-4 border-b border-gray-200">
                         <h2 className="font-serif text-2xl font-bold text-gray-900">{MOCK_CARS.length} Résultats</h2>
                         <p className="text-sm text-gray-500">Vous avez déjà un compte ? <span className="font-bold underline cursor-pointer">Connectez-vous</span></p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {MOCK_CARS.map(car => (
                            <CarCard 
                              key={car.id} 
                              car={car} 
                              totalPrice={car.pricePerDay * getDays()}
                              onSelect={handleSelectCar} 
                            />
                         ))}
                      </div>
                   </div>
                )}

                {/* STEP 2: OPTIONS */}
                {booking.step === 1 && booking.selectedCar && (
                   <OptionsStep 
                      selectedCar={booking.selectedCar}
                      totalCarPrice={booking.selectedCar.pricePerDay * getDays()}
                      selectedInsurance={booking.selectedInsurance}
                      selectedMileage={booking.selectedMileage}
                      selectedExtras={booking.selectedExtras}
                      onSetInsurance={(id) => setBooking(prev => ({...prev, selectedInsurance: id}))}
                      onSetMileage={(id) => setBooking(prev => ({...prev, selectedMileage: id}))}
                      onToggleExtra={(id) => setBooking(prev => {
                         const exists = prev.selectedExtras.includes(id);
                         return {
                            ...prev,
                            selectedExtras: exists 
                              ? prev.selectedExtras.filter(e => e !== id) 
                              : [...prev.selectedExtras, id]
                         };
                      })}
                      onNext={() => handleNextStep()}
                   />
                )}

                {/* STEP 3: INFO */}
                {booking.step === 2 && (
                   <InfoStep onNext={handleNextStep} />
                )}

                {/* STEP 4: PAYMENT (Simplified integration for Step 3 in screenshot context) */}
                {booking.step === 3 && booking.selectedCar && (
                   <div className="animate-fade-in-up">
                      <div className="mb-8">
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Paiement</h2>
                        <p className="text-gray-500 text-sm">Sécurisez votre réservation maintenant.</p>
                      </div>
                      <StripePayment 
                        onSuccess={handlePaymentSuccess}
                        isProcessing={isProcessing}
                        totalAmount={calculateTotal(booking.selectedCar.pricePerDay)}
                      />
                   </div>
                )}

             </div>
          </div>
        )}
      </main>

      <AiAssistant />
    </div>
  );
};

export default App;