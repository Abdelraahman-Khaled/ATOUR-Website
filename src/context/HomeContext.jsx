// HomeContext.jsx
import { createContext, useContext } from "react";
import HomeAPI from "api/homeApi";
import GeneralAPI from "api/generalApi";
import ContentAPI from "api/contentApi";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useCurrency } from "Components/Currencies/CurrencyContext";
import { useQuery } from "@tanstack/react-query";

const HomeContext = createContext(null);

export const HomeProvider = ({ children }) => {
    const { currentLanguage, isChangingLanguage } = useLanguage();
    const { currentCurrency } = useCurrency();

    // Fetch Home Data
    const {
        data: homeData,
        isPending: homeLoading,
        isRefetching: isRefetchingHome,
        error: homeError,
        refetch: refetchHome
    } = useQuery({
        queryKey: ['homeData', currentLanguage, currentCurrency],
        queryFn: async () => {
            const response = await HomeAPI.getHomeData(currentLanguage, currentCurrency);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
    });

    // Fetch Sliders & Cities
    const {
        data: sliderAndCities,
        isPending: sliderLoading,
        isRefetching: isRefetchingSlider,
        refetch: refetchSlider
    } = useQuery({
        queryKey: ['sliderData', currentLanguage],
        queryFn: async () => {
            const [sliderRes, citiesRes] = await Promise.all([
                GeneralAPI.getSliders(currentLanguage),
                ContentAPI.getCities(currentLanguage)
            ]);
            return {
                sliders: sliderRes.data || [],
                cities: citiesRes.data || []
            };
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
    });

    const loading = homeLoading || sliderLoading || isRefetchingHome || isRefetchingSlider || isChangingLanguage;
    const error = homeError ? "Failed to load home data." : null;
    const notification_count = homeData?.notification_count || 0;

    return (
        <HomeContext.Provider value={{
            homeData: homeData, // useQuery returns the data structure directly
            sliders: sliderAndCities?.sliders || [],
            cities: sliderAndCities?.cities || [],
            loading,
            error,
            notification_count,
            fetchHomeData: refetchHome,
            fetchSliderData: refetchSlider,
            // setHomeData and setNotificationCount are removed as react-query manages cache
        }}>
            {children}
        </HomeContext.Provider>
    );
};

export const useHome = () => useContext(HomeContext);