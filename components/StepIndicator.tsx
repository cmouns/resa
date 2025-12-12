import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Choix du bien' },
    { num: 2, label: 'Choix des options' },
    { num: 3, label: 'Vos informations' },
    { num: 4, label: 'Confirmation' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-4 mb-8 sticky top-20 z-40">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between md:justify-center md:space-x-12">
          {steps.map((s, idx) => {
            // Adjust step index logic: BookingState starts at 0 (Search results is step 0/1 visually)
            // Let's map: 
            // State 0 (Results) -> Visual 1
            // State 1 (Options) -> Visual 2
            // State 2 (Auth) -> Visual 3
            // State 3 (Payment/Confirm) -> Visual 4
            const isCompleted = currentStep > idx;
            const isCurrent = currentStep === idx;

            return (
              <div key={s.num} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-2
                  ${isCompleted ? 'bg-black text-white' : isCurrent ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {isCompleted ? <Check size={12} /> : s.num}
                </div>
                <span className={`
                  text-xs uppercase tracking-wide font-bold hidden md:block
                  ${isCurrent ? 'text-black' : 'text-gray-400'}
                `}>
                  {s.label}
                </span>
                
                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block w-12 h-[1px] bg-gray-200 ml-4"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};