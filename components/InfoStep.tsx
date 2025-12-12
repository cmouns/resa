import React, { useState } from 'react';
import { User } from '../types';
import { AlertCircle } from 'lucide-react';

interface InfoStepProps {
  onNext: (user: User) => void;
}

// Composant extrait pour éviter le re-rendu et la perte de focus
const InputField = ({ 
  label, 
  value,
  onChange,
  error, 
  type = "text", 
  placeholder = "",
  fullWidth = false 
}: { 
  label: string, 
  value: string,
  onChange: (val: string) => void,
  error?: string,
  type?: string, 
  placeholder?: string,
  fullWidth?: boolean
}) => (
  <div className={fullWidth ? "md:col-span-2" : ""}>
     <label className="block text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">
       {label}*
     </label>
     <input 
        type={type} 
        className={`w-full border p-3 rounded-sm text-sm outline-none transition-all bg-white text-gray-900 placeholder-gray-400 ${
          error 
            ? 'border-red-500 bg-red-50 focus:border-red-500' 
            : 'border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
        }`}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
     />
     {error && (
       <div className="flex items-center text-red-500 text-xs mt-1">
         <AlertCircle size={10} className="mr-1" />
         {error}
       </div>
     )}
  </div>
);

export const InfoStep: React.FC<InfoStepProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<User>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: 'France',
    birthDate: '',
    licenseNumber: '',
    licenseDate: '',
    licenseCountry: 'France',
    isProfessional: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof User, string>> = {};
    let isValid = true;

    // Email
    if (!formData.email) {
      newErrors.email = "L'email est requis.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide.";
      isValid = false;
    }

    // Names
    if (!formData.firstName.trim()) { newErrors.firstName = "Le prénom est requis."; isValid = false; }
    if (!formData.lastName.trim()) { newErrors.lastName = "Le nom est requis."; isValid = false; }

    // Address
    if (!formData.address.trim()) { newErrors.address = "L'adresse est requise."; isValid = false; }
    if (!formData.zipCode.trim()) { newErrors.zipCode = "Le code postal est requis."; isValid = false; }
    if (!formData.city.trim()) { newErrors.city = "La ville est requise."; isValid = false; }

    // Phone
    if (!formData.phone.trim()) { 
      newErrors.phone = "Le téléphone est requis."; 
      isValid = false; 
    } else if (!/^\d{9,10}$/.test(formData.phone)) {
      newErrors.phone = "Format invalide (9-10 chiffres).";
      isValid = false;
    }

    // Dates
    if (!formData.birthDate) {
      newErrors.birthDate = "Date de naissance requise.";
      isValid = false;
    } else {
        const birth = new Date(formData.birthDate);
        const age = new Date().getFullYear() - birth.getFullYear();
        if (age < 18) {
            newErrors.birthDate = "Vous devez avoir au moins 18 ans.";
            isValid = false;
        }
    }

    // License
    if (!formData.licenseNumber.trim()) { newErrors.licenseNumber = "Numéro de permis requis."; isValid = false; }
    if (!formData.licenseDate) { newErrors.licenseDate = "Date d'obtention requise."; isValid = false; }

    // Agreement
    if (!agreed) {
      setAgreedError(true);
      isValid = false;
    } else {
      setAgreedError(false);
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: keyof User, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for field on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white border border-gray-200 p-8 rounded-sm">
        <h3 className="font-serif text-2xl text-gray-900 mb-8">Inscrivez vous pour confirmer votre réservation</h3>
        
        <div className="mb-8 p-4 bg-gray-50 rounded-sm flex justify-between items-center border border-gray-100">
           <span className="text-sm text-gray-600">Vous avez déjà un compte ?</span>
           <button className="text-sm font-bold underline text-brand-600 hover:text-brand-800">Connectez-vous</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Saisissez vos informations personnelles</h4>
            
            <div className="flex items-center gap-4 mb-6">
               <span className={`text-sm cursor-pointer ${!formData.isProfessional ? 'font-bold text-black' : 'text-gray-500'}`} onClick={() => handleChange('isProfessional', false)}>Particulier</span>
               <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={formData.isProfessional} onChange={() => handleChange('isProfessional', !formData.isProfessional)}/>
                  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
               </div>
               <span className={`text-sm cursor-pointer ${formData.isProfessional ? 'font-bold text-black' : 'text-gray-500'}`} onClick={() => handleChange('isProfessional', true)}>Professionnel</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Adresse email" 
                value={formData.email}
                onChange={(v) => handleChange('email', v)}
                error={errors.email}
                type="email" 
                fullWidth 
              />
              <InputField 
                label="Prénom" 
                value={formData.firstName}
                onChange={(v) => handleChange('firstName', v)}
                error={errors.firstName}
              />
              <InputField 
                label="Nom" 
                value={formData.lastName}
                onChange={(v) => handleChange('lastName', v)}
                error={errors.lastName}
              />
              <InputField 
                label="Adresse" 
                value={formData.address}
                onChange={(v) => handleChange('address', v)}
                error={errors.address}
                fullWidth 
              />
              <InputField 
                label="Code postal" 
                value={formData.zipCode}
                onChange={(v) => handleChange('zipCode', v)}
                error={errors.zipCode}
              />
              <InputField 
                label="Ville" 
                value={formData.city}
                onChange={(v) => handleChange('city', v)}
                error={errors.city}
              />

              <div>
                 <label className="block text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">Pays*</label>
                 <select 
                    className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-brand-500 outline-none bg-white text-gray-900" 
                    value={formData.country} 
                    onChange={e => handleChange('country', e.target.value)}
                 >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                 </select>
              </div>

              <div>
                 <label className="block text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">Téléphone*</label>
                 <div className="flex">
                    <span className="bg-gray-100 border border-r-0 border-gray-300 p-3 text-sm text-gray-600 rounded-l-sm">+33</span>
                    <input 
                      type="tel" 
                      className={`w-full border p-3 rounded-r-sm text-sm outline-none transition-all bg-white text-gray-900 ${
                        errors.phone 
                          ? 'border-red-500 bg-red-50 focus:border-red-500' 
                          : 'border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500'
                      }`}
                      value={formData.phone} 
                      onChange={e => handleChange('phone', e.target.value)} 
                    />
                 </div>
                 {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <InputField 
                label="Date de naissance" 
                value={formData.birthDate}
                onChange={(v) => handleChange('birthDate', v)}
                error={errors.birthDate}
                type="date" 
              />
              
              <div>
                 <label className="block text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">Lieu de naissance*</label>
                 <input type="text" className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-brand-500 outline-none bg-white text-gray-900" placeholder="Ville, Pays" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Permis de conduire</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  label="N° de permis" 
                  value={formData.licenseNumber}
                  onChange={(v) => handleChange('licenseNumber', v)}
                  error={errors.licenseNumber}
                />
                <InputField 
                  label="Date d'obtention" 
                  value={formData.licenseDate}
                  onChange={(v) => handleChange('licenseDate', v)}
                  error={errors.licenseDate}
                  type="date" 
                />
                
                <div>
                   <label className="block text-xs text-gray-500 mb-1 font-bold uppercase tracking-wide">Pays d'obtention*</label>
                   <select 
                      className="w-full border border-gray-300 p-3 rounded-sm text-sm focus:border-brand-500 outline-none bg-white text-gray-900" 
                      value={formData.licenseCountry} 
                      onChange={e => handleChange('licenseCountry', e.target.value)}
                   >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                   </select>
                </div>
             </div>
          </div>
          
          <div className="flex items-center mb-8">
             <input 
                type="checkbox" 
                className={`mr-3 w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 cursor-pointer ${agreedError ? 'ring-2 ring-red-500' : ''}`}
                checked={agreed}
                onChange={(e) => {
                   setAgreed(e.target.checked);
                   if (e.target.checked) setAgreedError(false);
                }}
             />
             <span className={`text-sm ${agreedError ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                J'accepte les conditions générales de vente.*
             </span>
          </div>

          <div className="flex justify-end">
             <button type="submit" className="bg-black hover:bg-brand-500 hover:text-black text-white px-12 py-4 font-bold uppercase tracking-widest text-sm rounded-sm shadow-lg transition-colors">
               Confirmer la demande
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};