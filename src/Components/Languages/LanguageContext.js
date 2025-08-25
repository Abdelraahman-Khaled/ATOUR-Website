import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

// Define supported languages
const SUPPORTED_LANGUAGES = [
  'en', 'ar', 'fr', 'de', 'es', 'tr', 'ru', 'zh', 'ko', 'pt', 'ur', 'ja'
];

export const LanguageProvider = ({ children }) => {
  // Get language from localStorage or use default (ar)
  const savedLanguage = localStorage.getItem("language");
  const defaultLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage) ? savedLanguage : "ar";
  
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

  useEffect(() => {
    //  SAVE LANGUAGE TO LOCAL STORAGE
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  // Set direction based on language (RTL for Arabic and Urdu, LTR for others)
  const direction = ["ar", "ur"].includes(currentLanguage) ? "rtl" : "ltr";

  useEffect(() => {
    //      //  SAVE DIRECTION LANGUAGE TO LOCAL STORAGE
    localStorage.setItem("direction", direction);

    // UPDATE THE DIRECTION OF THE HTML DOCUMENT
    document.documentElement.dir = direction;
    // SET THE DEfauLTe LANGUGE ATTRIBUTE
    document.documentElement.lang = currentLanguage;
  }, [direction, currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage");
  }
  return context;
};
