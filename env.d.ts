/// <reference types="vite/client" />

// Extend Vite's env typing with optional RapidAPI variables used by the app
interface ImportMetaEnv {
  readonly VITE_TIKTOK_API_URL?: string;
  readonly VITE_TIKTOK_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
