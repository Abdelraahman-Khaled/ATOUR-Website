import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext({
  currentCurrency: "SAR",
  setCurrentCurrency: (currency) => {}
});

// Define supported currencies
const SUPPORTED_CURRENCIES = ["SAR", "EUR", "USD"];

export const CurrencyProvider = ({ children }) => {
  // Get currency from localStorage or use default (SAR)
  const savedCurrency = localStorage.getItem("currency");
  const defaultCurrency = SUPPORTED_CURRENCIES.includes(savedCurrency)
    ? savedCurrency
    : "SAR";

  const [currentCurrency, setCurrentCurrency] = useState(defaultCurrency);

  useEffect(() => {
    // SAVE CURRENCY TO LOCAL STORAGE
    localStorage.setItem("currency", currentCurrency);
  }, [currentCurrency]);

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrentCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
