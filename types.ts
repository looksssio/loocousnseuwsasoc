export interface CoinPackage {
  id: number;
  coins: number | 'Custom';
  price: number;
  isCustom?: boolean;
}

// Vite import meta typing for env variables used in the app
interface ImportMetaEnv {
  readonly VITE_TIKTOK_API_URL?: string;
  readonly VITE_TIKTOK_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface CardDetails {
  id: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
}