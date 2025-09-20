import axiosInstance from "./axiosInstance";

const HomeAPI = {
  getHomeData: async (currentLanguage, currentCurrency) => {
    const response = await axiosInstance.get("/home", {
      headers: {
        language: currentLanguage, // Include the language in headers
        currency: currentCurrency,
      },
    });
    return response.data;
  },
};

export default HomeAPI;
