import axiosInstance from "./axiosInstance";

const HomeAPI = {
  getHomeData: async (currentLanguage, headers = {}) => {
    const response = await axiosInstance.get("/home", {
      headers: {
        ...headers,
        language: currentLanguage, // Include the language in headers
        currency: "SAR",
      },
    });
    return response.data;
  },
};

export default HomeAPI;
