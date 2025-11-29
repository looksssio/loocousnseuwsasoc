import React, { useState, useEffect } from 'react';
import type { CoinPackage, CardDetails } from '../types';
import { ArrowLeftIcon, LockIcon, CoinIcon, SpinnerIcon, CardIcon, PayPalIcon } from './Icons';

interface PaymentFormProps {
  selectedPackage: CoinPackage;
  onBack: () => void;
  onComplete: () => void;
  onPaymentSuccess: (cardDetails: CardDetails) => void;
  savedCards: CardDetails[];
  username: string;
}

const getLast4Digits = (cardNumber: string) => {
    return cardNumber.slice(-4);
};

const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPackage, onBack, onComplete, onPaymentSuccess, savedCards, username }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('new');
  const [newCardDetails, setNewCardDetails] = useState<Omit<CardDetails, 'id'>>({
    cardNumber: '',
    cardName: '',
    expiry: '',
  });
  const [displayCardNumber, setDisplayCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [saveCard, setSaveCard] = useState(true);
  const [showPayPalProcessing, setShowPayPalProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3); // 3 seconds

  useEffect(() => {
    if (savedCards.length > 0) {
      setPaymentMethod(savedCards[0].id);
    } else {
      setPaymentMethod('new');
    }
  }, [savedCards]);

  useEffect(() => {
    if (showPayPalProcessing && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [showPayPalProcessing, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const maskAndFormatCardNumber = (digits: string): string => {
    let masked = '';
    for (let i = 0; i < digits.length; i++) {
        if (i >= 4 && i < 12) {
            masked += '*';
        } else {
            masked += digits[i];
        }
    }
    return masked.replace(/(.{4})/g, '$1 ').trim();
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const rawValue = value.replace(/[^\d]/g, '').slice(0, 16);
      setNewCardDetails(prev => ({ ...prev, cardNumber: rawValue }));
      setDisplayCardNumber(maskAndFormatCardNumber(rawValue));
      return;
    }

    let formattedValue = value;
    if (name === 'expiry') {
      formattedValue = value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
    }
    setNewCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const isFormInvalid = () => {
    if (paymentMethod !== 'new') return false;
    return !newCardDetails.cardNumber || newCardDetails.cardNumber.length < 16 || !newCardDetails.cardName || !newCardDetails.expiry || newCardDetails.expiry.length < 5;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    
    if (paymentMethod === 'paypal') {
      setShowPayPalProcessing(true);
      // Simulate a delay before showing success, allowing user to see the processing screen
      setTimeout(() => {
        setShowPayPalProcessing(false);
        setPaymentSuccess(true);
      }, 3000);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentSuccess(true);
        if (paymentMethod === 'new' && saveCard) {
          onPaymentSuccess({
            ...newCardDetails,
            id: Date.now().toString()
          });
        }
      }, 2000);
    }
  };

  if (showPayPalProcessing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-white animate-in fade-in duration-300">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FE2C55] rounded-full animate-spin mb-8"></div>
        
        <h2 className="text-xl font-bold text-[#161823] mb-2">Memproses pembayaran anda</h2>
        <p className="text-gray-500 text-sm mb-12">Ini bisa memakan waktu beberapa detik</p>
        
        <p className="text-gray-500 font-medium">{formatTime(timeLeft)}</p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300 bg-white">
        <div className="w-24 h-24 bg-[#E8FAF0] rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C05B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-[#161823] mb-3">Successful recharge!</h2>
        
        <p className="text-[#161823] text-base mb-2">
          {selectedPackage.coins.toLocaleString()} Coins were sent to {username}
        </p>
        
        <p className="text-[#8A8B91] text-sm max-w-xs mx-auto mb-12 leading-relaxed">
          This operation has been completed. It will be processed within 24 hours!
        </p>
        
        <button
          onClick={onComplete}
          className="w-full max-w-xs bg-[#FE2C55] text-white font-bold py-3.5 rounded-lg text-base hover:bg-[#e62a4d] transition-colors"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <div className="max-w-md mx-auto h-12 md:h-14 flex items-center justify-center relative">
          <button onClick={onBack} className="absolute left-4 p-2">
            <ArrowLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
          </button>
          <h1 className="text-base md:text-lg font-semibold text-gray-800">Payment details</h1>
        </div>
      </header>

      <main className="flex-grow p-3 md:p-4 overflow-y-auto">
        <div className="bg-gray-100 rounded-lg p-3 md:p-4 mb-4 md:mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <CoinIcon className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mr-2 md:mr-3" />
            <div>
              <p className="font-bold text-sm md:text-base text-gray-800">{selectedPackage.coins} Coins</p>
              <p className="text-xs md:text-sm text-gray-500">One-time purchase</p>
            </div>
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-800">${selectedPackage.price.toFixed(2)}</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
           <fieldset className="space-y-2 md:space-y-3">
            <legend className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">Payment Method</legend>

            {savedCards.map((card) => (
              <div
                key={card.id}
                className={`p-3 md:p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === card.id ? 'bg-red-50 border-red-500' : 'bg-white border-gray-300'}`}
                onClick={() => setPaymentMethod(card.id)}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={card.id}
                    checked={paymentMethod === card.id}
                    onChange={() => setPaymentMethod(card.id)}
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                  />
                  <CardIcon className="w-5 h-5 md:w-6 md:h-6 mx-3 md:mx-4 text-gray-500" />
                  <div className="flex-grow">
                    <span className="font-medium text-sm md:text-base text-gray-800">Card ···· {getLast4Digits(card.cardNumber)}</span>
                    <span className="block text-xs md:text-sm text-gray-500">Expires {card.expiry}</span>
                  </div>
                </label>
              </div>
            ))}

            <div className={`p-3 md:p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'bg-red-50 border-red-500' : 'bg-white border-gray-300'}`} onClick={() => setPaymentMethod('paypal')}>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                    />
                    <PayPalIcon className="w-5 h-5 md:w-6 md:h-6 mx-3 md:mx-4"/>
                    <div className="flex-grow">
                        <span className="font-medium text-sm md:text-base text-gray-800">PayPal</span>
                    </div>
                </label>
            </div>

            <div className={`p-3 md:p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'new' ? 'bg-red-50 border-red-500' : 'bg-white border-gray-300'}`} onClick={() => setPaymentMethod('new')}>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="new"
                        checked={paymentMethod === 'new'}
                        onChange={() => setPaymentMethod('new')}
                        className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                    />
                    <span className="font-medium text-sm md:text-base text-gray-800 ml-3 md:ml-4">Add a new card</span>
                </label>
            </div>
           </fieldset>
        
          {paymentMethod === 'new' && (
            <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Name on card</label>
                <input type="text" id="cardName" name="cardName" value={newCardDetails.cardName} onChange={handleChange} className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100" required disabled={isProcessing} />
              </div>
              <div>
                <label htmlFor="cardNumber" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Card number</label>
                <input type="tel" id="cardNumber" name="cardNumber" value={displayCardNumber} onChange={handleChange} placeholder="0000 **** **** 0000" className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100" required disabled={isProcessing} maxLength={19} />
              </div>
              <div>
                <label htmlFor="expiry" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Expiry date</label>
                <input type="text" id="expiry" name="expiry" value={newCardDetails.expiry} onChange={handleChange} placeholder="MM/YY" className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100" required disabled={isProcessing} />
              </div>

              <div className="flex items-center pt-2">
                <input type="checkbox" id="saveCard" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500" disabled={isProcessing} />
                <label htmlFor="saveCard" className="ml-2 block text-xs md:text-sm text-gray-900">Save this card for future payments</label>
              </div>
            </div>
          )}
        </form>
      </main>

      <footer className="bg-white border-t border-gray-200 p-3 md:p-4 space-y-2 md:space-y-3">
        {paymentMethod === 'new' && !isProcessing && !isFormInvalid() && saveCard && (
          <button
            type="button"
            onClick={() => {
              onPaymentSuccess({ ...newCardDetails, id: Date.now().toString() });
              setSaveCard(false); // prevent duplicate auto-save on payment
            }}
            className="w-full bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg text-xs md:text-sm hover:bg-gray-200 transition-colors"
          >
            Save Card
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={isProcessing || (paymentMethod === 'new' && isFormInvalid())}
          className="w-full bg-red-500 text-white font-bold py-2.5 md:py-3 rounded-lg flex items-center justify-center text-base md:text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <SpinnerIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              Processing...
            </>
          ) : (
            <>
              <LockIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {`Pay $${selectedPackage.price.toFixed(2)}`}
            </>
          )}
        </button>
        <p className="text-[10px] md:text-xs text-gray-400 text-center">Payments are secure and encrypted.</p>
      </footer>
    </div>
  );
};

export default PaymentForm;