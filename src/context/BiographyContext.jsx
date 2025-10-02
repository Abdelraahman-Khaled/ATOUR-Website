import React, { createContext, useState } from "react";
import ContentAPI from "api/contentApi";
import biographyContent from "./translates";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import { useLanguage } from "Components/Languages/LanguageContext";

export const BiographyContext = createContext(null);

export const BiographyProvider = ({ children }) => {
  const [biography, setBiography] = useState(undefined); // undefined = not yet loaded
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentCurrency } = useCurrency();
  const { currentLanguage } = useLanguage();

  const fetchBiography = React.useCallback(async (id, params = {}) => {
    setLoading(true);
    setError(null);

    const t = biographyContent[currentLanguage] || biographyContent.en;

    try {
      const response = await ContentAPI.getCitiesId(
        id,
        currentLanguage,
        currentCurrency,
        params
      );

      // Try common shapes
      const data = response?.data?.data || response?.data || null;

      if (data) {
        setBiography(data);
        setError(null);
      } else {
        setBiography(null);
        setError(t.biographyNotFound);
      }
    } catch (err) {
      console.error("Error fetching biography data:", err);
      setBiography(null);
      setError(t.failedToLoad);
    } finally {
      setLoading(false);
    }
  }, [currentLanguage, currentCurrency]);


  return (
    <BiographyContext.Provider value={{ biography, loading, error, fetchBiography }}>
      {children}
    </BiographyContext.Provider>
  );
};
