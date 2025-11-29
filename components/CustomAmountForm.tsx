
import React, { useState, useMemo } from 'react';
import { CoinIcon } from './Icons';

interface CustomAmountFormProps {
  onBack: () => void;
  onContinue: (amount: number) => void;
}

const COIN_PRICE_RATE = 0.0104;
const MIN_AMOUNT = 1;

const KEYPAD_LAYOUT = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: 'DEL', value: 'DEL', isIcon: true },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '000', value: '000' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '0', value: '0' },
];

const CustomAmountForm: React.FC<CustomAmountFormProps> = ({ onBack, onContinue }) => {
  const [amount, setAmount] = useState<string>('');
  
  const numericAmount = parseInt(amount, 10);
  
  const calculatedPrice = useMemo(() => {
    if (!isNaN(numericAmount) && numericAmount > 0) {
      return (numericAmount * COIN_PRICE_RATE).toFixed(2);
    }
    return '0.00';
  }, [numericAmount]);

  const handleContinue = () => {
    if (!isNaN(numericAmount) && numericAmount >= MIN_AMOUNT) {
      onContinue(numericAmount);
    }
  };

  const isContinueDisabled = isNaN(numericAmount) || numericAmount < MIN_AMOUNT;

  const handleKeypadInput = (val: string) => {
    if (val === 'DEL') {
      setAmount(prev => prev.slice(0, -1));
      return;
    }
    const next = amount + val;
    applyKeypadValue(next);
  };

  const applyKeypadValue = (next: string) => {
    const sanitized = next.replace(/[^0-9]/g, '');
    if (sanitized === '') {
      setAmount('');
      return;
    }
    const numValue = parseInt(sanitized, 10);
    setAmount(String(numValue));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onBack} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[320px] md:max-w-[360px] mx-auto p-3 md:p-4 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="relative mb-3 md:mb-4 flex items-center justify-center">
          <h1 className="text-base md:text-lg font-bold text-gray-900">Custom</h1>
          <button 
            onClick={onBack} 
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Input Section */}
        <div className="mb-3 md:mb-4">
          <div className="flex items-center text-xs md:text-sm font-semibold text-gray-800 mb-2">
            Number of Coins
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="relative bg-gray-100 rounded flex items-center h-10 md:h-12 px-3">
            <CoinIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 mr-2" />
            <div className="flex-1 text-base md:text-lg font-semibold text-gray-900">
              {amount || '0'}
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2 mb-4 md:mb-6">
          {KEYPAD_LAYOUT.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleKeypadInput(btn.value)}
              className="h-10 md:h-12 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-900 font-medium text-sm md:text-base transition-colors"
            >
              {btn.isIcon ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-9.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
              ) : (
                btn.label
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <span className="text-sm md:text-base font-bold text-gray-900">Total:</span>
          <span className="text-sm md:text-base font-bold text-gray-900">${calculatedPrice}</span>
        </div>

        <button
          onClick={handleContinue}
          disabled={isContinueDisabled}
          className="w-full bg-[#FE2C55] text-white font-bold py-2.5 md:py-3 rounded text-sm md:text-base hover:bg-[#e62a4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Recharge
        </button>
      </div>
    </div>
  );
};

export default CustomAmountForm;