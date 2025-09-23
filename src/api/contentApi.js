import axiosInstance from "./axiosInstance";

const ContentAPI = {
  // Trips
  getTrips: async (language, currency) => {
    const response = await axiosInstance.get("/trips", {
      headers: {
        lang: language, // Pass the language in the header
        currency: currency,
      },
    });
    return response.data;
  },
  getTripById: async (tripId, language, currency) => {
    const response = await axiosInstance.get(`/trips/${tripId}`, {
      headers: {
        lang: language, // Pass the language in the header
        currency: currency,
      },
    });
    return response.data;
  },
  getSimilarTrips: async (tripId, language) => {
    const response = await axiosInstance.get(`/similar_trips/${tripId}`, {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
    return response.data;
  },
  // Gifts
  getGifts: async (language, currency) => {
    // Default language is 'en' (English)
    const response = await axiosInstance.get("/gifts", {
      headers: {
        lang: language, // Pass the language in the header
        currency: currency,
      },
    });
    return response.data;
  },
  getGiftById: async (giftId, language, currency) => {
    const response = await axiosInstance.get(`/gifts/${giftId}`, {
      headers: {
        lang: language, // Pass the language in the header
        currency: currency,
      },
    });
    return response.data;
  },

  // Effectiveness
  getEffectiveness: async (language, currency) => {
    const response = await axiosInstance.get("/effectivenes", {
      headers: {
        lang: language, // Pass the language in the header
        currency: currency,
      },
    });
    return response.data;
  },

  // Effectiveness
  getEffectivenessById: async (effectiveneId, language, currency) => {
    const response = await axiosInstance.get(`/effectivenes/${effectiveneId}`, {
      headers: {
        lang: language, // Pass the language in the header
        currency: currency,
      },
    });
    return response.data;
  },

  // Why Bookings
  getWhyBookings: async () => {
    const response = await axiosInstance.get("/why_bookings");
    return response.data;
  },

  // Cities
  getCities: async (language) => {
    const response = await axiosInstance.get("/cities", {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  getCitiesId: async (cityId, language, currency) => {
    const response = await axiosInstance.get(`/search_by_city/${cityId}`, {
      headers: {
        lang: language, // Pass the language in the header
        currency: currency,
      },
    });
    return response.data;
  },
};

export default ContentAPI;
