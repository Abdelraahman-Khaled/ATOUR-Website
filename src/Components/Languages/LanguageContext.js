import { createContext, useContext, useState, useEffect } from "react";
import GeneralAPI from "../../api/generalApi";
import { isAuthenticated } from "../../api/axiosInstance";

const LanguageContext = createContext(null);

// Define supported languages
const SUPPORTED_LANGUAGES = [
  "en",
  "ar",
  "fr",
  "de",
  "es",
  "tr",
  "ru",
  "zh",
  "ko",
  "pt",
  "ur",
  "ja",
];

export const LanguageProvider = ({ children }) => {
  // Get language from localStorage or use default (ar)
  const savedLanguage = localStorage.getItem("language");
  const defaultLanguage = SUPPORTED_LANGUAGES.includes(savedLanguage)
    ? savedLanguage
    : "ar";

  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  useEffect(() => {
    //  SAVE LANGUAGE TO LOCAL STORAGE
    localStorage.setItem("language", currentLanguage);

    // Call API to change language on the backend only if authenticated
    const updateLanguageOnBackend = async () => {
      if (isAuthenticated()) {
        try {
          setIsChangingLanguage(true);
          await GeneralAPI.changeLanguage(currentLanguage);
        } catch (error) {
          console.error("Failed to update language on backend:", error);
        } finally {
          setIsChangingLanguage(false);
        }
      }
    };
    updateLanguageOnBackend();
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
    <LanguageContext.Provider
      value={{ currentLanguage, setCurrentLanguage, isChangingLanguage }}
    >
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
