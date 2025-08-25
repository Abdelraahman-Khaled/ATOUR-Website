import { useLanguage } from './LanguageContext';
import translations from './translations';

/**
 * Custom hook for accessing translations
 * @returns {Object} - Object containing translation functions and current language
 */
const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  /**
   * Get translation for a specific key
   * @param {string} key - The key to access the translation (e.g., 'navMenu.blog')
   * @returns {string} - The translated text
   */
  const t = (key) => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Get the translation from the translations object
    let translation = translations;
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // If the key doesn't exist, return the key itself
        return key;
      }
    }
    
    // Get the translation for the current language or fallback to English
    return translation[currentLanguage] || translation['en'] || key;
  };

  return {
    t,
    currentLanguage
  };
};

export default useTranslation;