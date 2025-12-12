import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';

interface StripePaymentProps {
  onSuccess: () => void;
  isProcessing: boolean;
  totalAmount: number;
}

export const StripePayment: React.FC<StripePaymentProps> = ({ onSuccess, isProcessing, totalAmount }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Luhn Algorithm for basic validation
  const isValidLuhn = (val: string) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = val.length - 1; i >= 0; i--) {
      let digit = parseInt(val.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanNum = cardNumber.replace(/\s/g, '');
    
    // Basic validations
    if (cleanNum.length < 16 || !isValidLuhn(cleanNum)) {
      setError("Numéro de carte invalide.");
      return;
    }
    if (expiry.length < 5) {
      setError("Date d'expiration invalide.");
      return;
    }
    if (cvc.length < 3) {
      setError("Code CVC invalide.");
      return;
    }
    if (name.length < 3) {
      setError("Nom du titulaire requis.");
      return;
    }

    onSuccess();
  };

  const formatCardNumber = (v: string) => {
    return v.replace(/\s+/g, '').replace(/[^0-9]/gi, '').match(/.{1,4}/g)?.join(' ') || v;
  };

  const formatExpiry = (v: string) => {
    const clean = v.replace(/\D/g, '');
    if (clean.length >= 2) return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    return clean;
  };

  return (
    <div className="bg-white p-8 rounded-sm shadow-soft border-t-4 border-brand-500">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif text-2xl text-gray-900">Paiement Sécurisé</h3>
        <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="h-6 w-10 bg-gray-200 rounded"></div> {/* Visa Placeholder */}
          <div className="h-6 w-10 bg-gray-200 rounded"></div> {/* MC Placeholder */}
        </div>
      </div>

      <div className="bg-brand-50 border border-brand-100 p-4 mb-8 flex items-start gap-3 rounded-sm">
        <Shield className="text-brand-500 shrink-0 mt-0.5" size={18} />
        <div>
           <p className="text-sm text-brand-900 font-bold mb-1">Transaction 100% Sécurisée</p>
           <p className="text-xs text-gray-600 leading-relaxed">
             Vos données bancaires sont chiffrées (SSL 256 bits). Nous ne stockons jamais vos informations de paiement.
           </p>
        </div>
      </div>

      <form onSubmit={handlePay} className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Titulaire</label>
          <input 
            type="text" 
            placeholder="NOM PRÉNOM"
            className="w-full bg-white border border-gray-200 p-4 rounded-sm text-sm font-medium focus:border-brand-500 outline-none transition-all placeholder-gray-300"
            value={name}
            onChange={e => setName(e.target.value.toUpperCase())}
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Numéro de carte</label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-4 rounded-sm text-sm font-medium focus:border-brand-500 outline-none transition-all font-mono placeholder-gray-300"
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Expiration</label>
            <input 
              type="text" 
              placeholder="MM/AA"
              maxLength={5}
              className="w-full bg-white border border-gray-200 p-4 rounded-sm text-sm font-medium focus:border-brand-500 outline-none transition-all text-center placeholder-gray-300"
              value={expiry}
              onChange={e => setExpiry(formatExpiry(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">CVC</label>
            <div className="relative">
               <input 
                type="text" 
                placeholder="123"
                maxLength={4}
                className="w-full bg-white border border-gray-200 p-4 rounded-sm text-sm font-medium focus:border-brand-500 outline-none transition-all text-center placeholder-gray-300"
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/\D/g, ''))}
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-xs p-3 rounded-sm flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isProcessing}
          className="w-full bg-brand-500 hover:bg-brand-600 text-brand-900 font-bold py-5 mt-4 text-xs uppercase tracking-widest transition-all shadow-lg flex justify-center items-center gap-2"
        >
          {isProcessing ? (
             <>
               <span className="w-4 h-4 border-2 border-brand-900 border-t-transparent rounded-full animate-spin"></span>
               Traitement sécurisé...
             </>
          ) : (
            <>
               <Lock size={14} />
               Payer {totalAmount.toFixed(2)}€
            </>
          )}
        </button>
      </form>
    </div>
  );
};