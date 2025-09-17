// HomeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import HomeAPI from "api/homeApi";
import GeneralAPI from "api/generalApi";
import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { toast } from "react-toastify";

const HomeContext = createContext(null);

export const HomeProvider = ({ children }) => {
    const [homeData, setHomeData] = useState(null);
    const [sliders, setSliders] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentLanguage } = useLanguage();

    const fetchHomeData = async (forceRefresh = false) => {
        // Check if we already have data and no force refresh is requested
        if (homeData && !forceRefresh) {
            return homeData;
        }

        setLoading(true);
        try {
            const response = await HomeAPI.getHomeData(currentLanguage);
            setHomeData(response.data);
            return response.data.data;
        } catch (err) {
            console.error("Error fetching home data:", err);
            toast.error("Failed to load home data.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchSliderData = async (forceRefresh = false) => {
        // Check if we already have data and no force refresh is requested
        if (sliders.length > 0 && cities.length > 0 && !forceRefresh) {
            return { sliders, cities };
        }

        try {
            const sliderRes = await GeneralAPI.getSliders(currentLanguage);
            const citiesRes = await ContentAPI.getCities(currentLanguage);

            setSliders(sliderRes.data || []);
            setCities(citiesRes.data || []);

            return {
                sliders: sliderRes.data || [],
                cities: citiesRes.data || []
            };
        } catch (err) {
            console.error("Error fetching sliders or cities:", err);
            toast.error("Failed to fetch slider data. Please try again later.");
            return { sliders: [], cities: [] };
        }
    };

    // Fetch data when language changes
    useEffect(() => {
        fetchHomeData(true);
        fetchSliderData(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLanguage]);

    return (
        <HomeContext.Provider value={{
            homeData,
            sliders,
            cities,
            loading,
            error,
            fetchHomeData,
            fetchSliderData,
            setHomeData
        }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHome = () => useContext(HomeContext);