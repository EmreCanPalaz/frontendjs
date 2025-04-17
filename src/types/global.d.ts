// src/types/global.d.ts dosyası oluşturun
interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: any;
      }
    }
  }