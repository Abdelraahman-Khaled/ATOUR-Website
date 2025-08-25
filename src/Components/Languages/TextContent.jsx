import React from 'react';
import { useLanguage } from './LanguageContext';
import translations from './translations';

/**
 * TextContent component for displaying translated text
 * @param {Object} props
 * @param {string} props.textKey - The key to access the translation (e.g., 'navMenu.blog')
 * @param {Object} props.options - Optional parameters for text formatting
 * @returns {React.ReactElement} - The translated text
 */
const TextContent = ({ textKey, options = {} }) => {
  const { currentLanguage } = useLanguage();
  
  // Split the key by dots to access nested properties
  const keys = textKey.split('.');
  
  // Get the translation from the translations object
  let translation = translations;
  for (const key of keys) {
    if (translation && translation[key]) {
      translation = translation[key];
    } else {
      // If the key doesn't exist, return the key itself
      return textKey;
    }
  }
  
  // Get the translation for the current language or fallback to English
  const text = translation[currentLanguage] || translation['en'] || textKey;
  
  return <>{text}</>;
};

export default TextContent;