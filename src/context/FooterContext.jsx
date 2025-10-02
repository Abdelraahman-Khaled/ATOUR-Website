import React, { createContext, useState, useEffect, useContext } from "react";
import { useLanguage } from "../Components/Languages/LanguageContext";
import GeneralAPI from "api/generalApi";

// Create the context
export const FooterContext = createContext(null);

// Create a custom hook for using the context
export const useFooter = () => useContext(FooterContext);

export const FooterProvider = ({ children }) => {
  const { currentLanguage } = useLanguage();
  const [footerData, setFooterData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      setLoading(true);
      try {
        const response = await GeneralAPI.getFooterSocial();
        setFooterData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError("Failed to load footer data");
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, [currentLanguage]);



  const value = {
    footerData,
    loading,
    error,
  };

  return (
    <FooterContext.Provider value={value}>
      {children}
    </FooterContext.Provider>
  );
};

export default FooterProvider;