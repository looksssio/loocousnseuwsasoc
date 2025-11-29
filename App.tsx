import React, { useState } from 'react';
import type { CoinPackage, CardDetails } from './types';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import RechargeSection from './components/RechargeSection';
import InviteBanner from './components/InviteBanner';
import AddToHomeScreenBanner from './components/AddToHomeScreenBanner';
import PaymentFooter from './components/PaymentFooter';
import PaymentForm from './components/PaymentForm';
import CustomAmountForm from './components/CustomAmountForm';
import Login from './components/Login';

const COIN_PACKAGES: CoinPackage[] = [
  { id: 1, coins: 30, price: 0.31 },
  { id: 2, coins: 350, price: 3.65 },
  { id: 3, coins: 700, price: 7.25 },
  { id: 4, coins: 1400, price: 14.49 },
  { id: 5, coins: 3500, price: 36.20 },
  { id: 6, coins: 'Custom', price: 0, isCustom: true },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'main' | 'payment'>('main');
  const [selectedPackageId, setSelectedPackageId] = useState<number>(COIN_PACKAGES[0].id);
  const [savedCards, setSavedCards] = useState<CardDetails[]>([]);
  const [customPackage, setCustomPackage] = useState<CoinPackage | null>(null);

  const selectedPackageFromList = COIN_PACKAGES.find(p => p.id === selectedPackageId) || COIN_PACKAGES[0];
  const packageForPayment = customPackage || selectedPackageFromList;

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const [showCustomModal, setShowCustomModal] = useState(false);

  const handleGoToPayment = () => {
    if (selectedPackageFromList.isCustom) {
      // Open custom amount modal overlay instead of changing main view
      setShowCustomModal(true);
    } else {
      setCustomPackage(null);
      setView('payment');
    }
  };

  const handleGoBack = () => {
    // Back from payment or closing custom modal
    setView('main');
    setShowCustomModal(false);
    setCustomPackage(null);
  };

  const handlePaymentSuccess = (cardDetails: CardDetails) => {
    setSavedCards(prev => {
        const cardExists = prev.some(card => card.cardNumber === cardDetails.cardNumber);
        if (!cardExists) {
            return [...prev, cardDetails];
        }
        return prev;
    });
  };

  const handleCustomAmountContinue = (amount: number) => {
    const price = parseFloat((amount * 0.0104).toFixed(2));
    setCustomPackage({
      id: Date.now(),
      coins: amount,
      price: price,
      isCustom: true,
    });
    setShowCustomModal(false);
    setView('payment');
  };
  
  const renderContent = () => {
    switch (view) {
      case 'payment':
        return (
          <PaymentForm 
            selectedPackage={packageForPayment}
            onBack={handleGoBack}
            onPaymentSuccess={handlePaymentSuccess}
            savedCards={savedCards}
          />
        );
      case 'main':
      default:
        return (
          <>
            <Header />
            <main className="p-4 pb-48">
              <UserInfo />
              <RechargeSection 
                packages={COIN_PACKAGES}
                selectedPackageId={selectedPackageId}
                onSelectPackage={setSelectedPackageId}
              />
              <div className="space-y-4 mt-6">
                <InviteBanner />
                <AddToHomeScreenBanner />
              </div>
            </main>
            <PaymentFooter 
              selectedPackage={selectedPackageFromList} 
              onBuyClick={handleGoToPayment}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {isAuthenticated ? (
          <>
            {renderContent()}
            {showCustomModal && (
              <CustomAmountForm 
                onBack={handleGoBack}
                onContinue={handleCustomAmountContinue}
              />
            )}
          </>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
};

export default App;