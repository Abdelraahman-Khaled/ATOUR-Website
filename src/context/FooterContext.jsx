import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../Components/Languages/LanguageContext";
import GeneralAPI from "api/generalApi";

// Create the context
export const FooterContext = createContext(null);

// Create a custom hook for using the context
export const useFooter = () => useContext(FooterContext);

export const FooterProvider = ({ children }) => {
  const { currentLanguage } = useLanguage();
  // Fetch footer data using React Query
  const {
    data: footerData = "",
    isPending: loading,
    error
  } = useQuery({
    queryKey: ['footerData', currentLanguage],
    queryFn: async () => {
      const response = await GeneralAPI.getFooterSocial();
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour (footer data rarely changes)
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    retry: 2,
  });



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