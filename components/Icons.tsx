import React from 'react';

// From UserInfo.tsx
export const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.28-1.1-.68-1.62-1.03-.39 1.2-.27 2.47-.02 3.72s.6 2.51 1.42 3.58c.85 1.08 2.05 1.84 3.48 2.32v4.03c-1.61-.28-3.2-.7-4.66-1.46-.35-.18-.72-.34-1.06-.55-.26 1.57-.49 3.15-.71 4.72h-4.03c.19-1.31.42-2.61.62-3.92.23-1.5.23-3.01.23-4.53 0-2.52-.42-5.01-1.18-7.37-.55-1.73-.86-3.52-.86-5.32 0-.42.02-.83.04-1.25H12.525z"/>
  </svg>
);

// From CoinPackageCard.tsx
export const CoinIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img 
    src="https://tiktok-project-get-coins.vercel.app/assets/coin-tiktok-BBusIcSw.png" 
    alt="Coin"
    {...props}
    // We put the style AFTER props to ensure width/height overrides any incoming styles
    style={{ 
       width: '25px', 
       height: '25px',
       objectFit: 'contain', // Keeps the coin aspect ratio correct
       ...props.style 
    }} 
  />
);

// From RechargeSection.tsx
export const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

// From InviteBanner.tsx
export const InviteIcon = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center ${props.className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 12a4 4 0 110-8 4 4 0 010 8z" />
    </svg>
  </div>
);

// From AddToHomeScreenBanner.tsx
export const AddToHomeScreenIcon = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ${props.className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  </div>
);

// From PaymentFooter.tsx
export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
  </svg>
);

// From PaymentFooter.tsx
export const PaymentIcons = () => (
    <div className="flex items-center space-x-2">
      <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6"/>
      <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="h-6"/>
      <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="h-6"/>
      <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="h-6"/>
    </div>
);

// For PaymentForm.tsx
export const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
);

// For PaymentForm.tsx Loading State
export const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    {...props}
    className={`animate-spin ${props.className || ''}`}
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// For PaymentForm.tsx saved cards
export const CardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.5 0l-1.5-1.5m1.5 1.5l1.5-1.5m3.5-3l1.5-1.5m-1.5 1.5l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5l-1.5-1.5m7.5-3.75h3m-3 2.25h3m-3 2.25h.008m.008 0h.008m.008 0h.008m.008 0h.008m.008 0h.008m.008 0h.008m-12.75 0h.008m.008 0h.008M2.25 12h19.5" />
    </svg>
);

// For PaymentForm.tsx PayPal option
export const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="#003087" d="M8.32 7.329c.2-.284.473-.51.78-.667C9.434 6.494 9.81 6.4 10.23 6.4c1.69 0 2.978.854 3.12 2.4h-2.02c-.11-.32-.308-.59-.59-.79-.28-.2-.63-.3-1.02-.3-.55 0-.98.2-1.29.58-.31.38-.43.89-.35 1.52.09.63.46 1.12 1.09 1.46.64.34 1.43.51 2.35.51.52 0 .99-.04 1.38-.12.4-.08.74-.21 1.02-.37.01 0 .01-.01.02-.01.12-.08.23-.17.33-.27l.16-.16.09-.09c.09-.09.15-.19.21-.29.06-.1.1-.2.13-.3.02-.05.04-.1.05-.15.02-.05.03-.1.03-.15.01-.05.02-.1.02-.15v-.12l-.01-.17c-.01-.05-.01-.1-.02-.15-.17-1.13-.7-1.95-1.54-2.45-.85-.5-1.92-.75-3.18-.75-1.03 0-1.93.22-2.69.65-.75.43-1.33.99-1.71 1.66-.33.58-.46 1.2-.38 1.81.08.61.35 1.15.79 1.62l.2.21z"/>
        <path fill="#009cde" d="M14.86 10.458c-.21.31-.51.55-.88.72-.37.17-.8.26-1.28.26-.38 0-.73-.04-1.04-.12-.31-.08-.58-.2-.81-.35l-.01.01c-1.11-.7-1.7-1.85-1.7-3.41 0-.52.09-1.02.27-1.48.18-.46.45-.86.8-1.2.22-.21.46-.39.72-.54.26-.15.54-.27.83-.36.29-.09.6-.16.91-.21.31-.05.63-.07.95-.07.73 0 1.4.11 2 .33.6.22 1.1.55 1.48 1 .38.45.63.98.73 1.58.1.6-.01 1.21-.32 1.81-.31.6-.79 1.08-1.42 1.42z"/>
        <path fill="#003087" d="M12.23 6.4c-.42 0-.8.09-1.14.26-.34.17-.63.4-.86.69-.23.29-.4.63-.52.99-.12.36-.18.74-.18 1.13 0 .63.15 1.2.46 1.7.31.5.76.88 1.34 1.13.58.25 1.24.38 1.97.38.38 0 .73-.04 1.04-.12.31-.08.58-.2.81-.35.23-.15.42-.34.58-.57.16-.23.28-.49.36-.78.08-.29.12-.59.12-.9 0-1.03-.39-1.84-1.18-2.42-.79-.58-1.86-.87-3.18-.87z"/>
    </svg>
);