import React, { createContext, useContext, useState, useCallback } from "react";
import RatesAPI from "api/ratesApi";

const RatesContext = createContext(null);

export const RatesProvider = ({ children }) => {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch rates for a model
    const fetchRates = useCallback(async (id, type) => {
        setLoading(true);
        try {
            const data = await RatesAPI.getRates(id, type);
            if (data.success) {
                setRates(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching rates:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Save a new rate
    const saveRate = async (rateData) => {
        try {
            const data = await RatesAPI.saveRate(rateData);
            if (data.success) {
                // Re-fetch after saving
                fetchRates(rateData.model_id, rateData.model_type);
            }
            return data;
        } catch (error) {
            console.error("Error saving rate:", error);
            throw error;
        }
    };

    return (
        <RatesContext.Provider value={{ rates, loading, fetchRates, saveRate }}>
            {children}
        </RatesContext.Provider>
    );
};

export const useRates = () => useContext(RatesContext);
