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

const COIN_PACKAGES: CoinPackage[] = [
  { id: 1, coins: 30, price: 0.31 },
  { id: 2, coins: 350, price: 3.65 },
  { id: 3, coins: 700, price: 7.25 },
  { id: 4, coins: 1400, price: 14.49 },
  { id: 5, coins: 3500, price: 36.20 },
  { id: 6, coins: 7000, price: 72.40 },
  { id: 7, coins: 17500, price: 181.00 },
  { id: 8, coins: 'Custom', price: 0, isCustom: true },
];

const App: React.FC = () => {
  const [view, setView] = useState<'main' | 'payment'>('main');
  const [username, setUsername] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState<number>(COIN_PACKAGES[0].id);
  const [savedCards, setSavedCards] = useState<CardDetails[]>([
    {
      id: 'default-card',
      cardNumber: '4242424242424242',
      cardName: 'TEST USER',
      expiry: '12/27'
    }
  ]);
  const [customPackage, setCustomPackage] = useState<CoinPackage | null>(null);

  const selectedPackageFromList = COIN_PACKAGES.find(p => p.id === selectedPackageId) || COIN_PACKAGES[0];
  const packageForPayment = customPackage || selectedPackageFromList;

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

  const handlePaymentComplete = () => {
    setUsername('');
    handleGoBack();
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
            onComplete={handlePaymentComplete}
            onPaymentSuccess={handlePaymentSuccess}
            savedCards={savedCards}
            username={username}
          />
        );
      case 'main':
      default:
        return (
          <>
            <Header />
            <main className="p-2 md:p-4 pb-48">
              <UserInfo username={username} onUsernameChange={setUsername} />
              <RechargeSection 
                packages={COIN_PACKAGES}
                selectedPackageId={selectedPackageId}
                onSelectPackage={(id) => {
                  setSelectedPackageId(id);
                  const pkg = COIN_PACKAGES.find(p => p.id === id);
                  if (pkg?.isCustom) {
                    // Open the custom modal immediately when custom card is clicked
                    setShowCustomModal(true);
                  }
                }}
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
        {renderContent()}
        {showCustomModal && (
          <CustomAmountForm 
            onBack={handleGoBack}
            onContinue={handleCustomAmountContinue}
          />
        )}
      </div>
    </div>
  );
};

export default App;