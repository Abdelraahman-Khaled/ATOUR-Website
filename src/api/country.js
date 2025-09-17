import axiosInstance from "./axiosInstance";

const CountryAPI = {
  // Countries
  getCountries: async (language) => {
    const response = await axiosInstance.get("/countries", {
      headers: {
        lang: language,
      },
    });
    return response.data;
  },
  // Countries
  getCountryCites: async (language, id) => {
    const response = await axiosInstance.get(`/countries/${id}`, {
      headers: {
        lang: language,
      },
    });
    return response.data;
  },
};

export default CountryAPI;
