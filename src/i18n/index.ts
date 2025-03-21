import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: localStorage.getItem('language') || 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n; 