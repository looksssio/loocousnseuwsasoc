
import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon, CoinIcon } from './Icons';

interface CustomAmountFormProps {
  onBack: () => void;
  onContinue: (amount: number) => void;
}

const COIN_PRICE_RATE = 0.0104;
const QUICK_AMOUNTS = [100, 500, 1000, 5000];
const KEYPAD_DIGITS = ['1','2','3','4','5','6','7','8','9'];
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 100000;


const CustomAmountForm: React.FC<CustomAmountFormProps> = ({ onBack, onContinue }) => {
  const [amount, setAmount] = useState<string>('');
  
  const numericAmount = parseInt(amount, 10);
  
  const calculatedPrice = useMemo(() => {
    if (!isNaN(numericAmount) && numericAmount > 0) {
      return (numericAmount * COIN_PRICE_RATE).toFixed(2);
    }
    return '0.00';
  }, [numericAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value, 10);
    if (value === '' || (numValue >= MIN_AMOUNT && numValue <= MAX_AMOUNT)) {
      setAmount(value);
    } else if (numValue > MAX_AMOUNT) {
      setAmount(String(MAX_AMOUNT));
    }
  };

  const handleQuickAmountClick = (quickAmount: number) => {
    setAmount(String(quickAmount));
  };

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
    if (val === '000') {
      const next = amount + '000';
      applyKeypadValue(next);
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
    if (numValue <= MAX_AMOUNT) {
      setAmount(String(numValue));
    } else {
      setAmount(String(MAX_AMOUNT));
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onBack} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-4 max-[500px]:w-[90%] max-[500px]:p-4">
        <button onClick={onBack} className="absolute left-4 top-4 p-2" aria-label="Close custom amount modal">
          <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-center mt-2 mb-4">Custom Amount</h1>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Number of Coins</p>
          <div className="relative">
            <CoinIcon className="w-7 h-7 text-yellow-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <div className="w-full text-center text-3xl font-bold py-3 px-3 border border-gray-200 rounded-md select-none bg-gray-50">
              {amount || '0'}
            </div>
          </div>
          <p className="text-gray-800 font-semibold text-base mt-4">Total: ${calculatedPrice}</p>
          <p className="text-[11px] text-gray-500 mt-1">Min {MIN_AMOUNT} • Max {MAX_AMOUNT} coins</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {KEYPAD_DIGITS.map(d => (
            <button
              key={d}
              onClick={() => handleKeypadInput(d)}
              className="h-12 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-gray-800"
            >
              {d}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button onClick={() => handleKeypadInput('000')} className="h-12 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-gray-800">000</button>
          <button onClick={() => handleKeypadInput('0')} className="h-12 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-gray-800">0</button>
          <button onClick={() => handleKeypadInput('DEL')} className="h-12 bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-gray-800">⌫</button>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {QUICK_AMOUNTS.map(q => (
            <button
              key={q}
              onClick={() => setAmount(String(q))}
              className="h-10 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-sm font-medium text-gray-700"
            >
              {q}
            </button>
          ))}
        </div>
        <button
          onClick={handleContinue}
          disabled={isContinueDisabled}
          className="w-full bg-red-500 text-white font-bold py-3 rounded-lg text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Recharge
        </button>
      </div>
    </div>
  );
};

export default CustomAmountForm;