import axiosInstance from "./axiosInstance";

const ContentAPI = {
  // Trips
  getTrips: async (language) => {
    const response = await axiosInstance.get("/trips", {
      headers: {
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },
  getTripById: async (tripId, language) => {
    const response = await axiosInstance.get(`/trips/${tripId}`, {
      headers: {
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },
  getSimilarTrips: async (tripId, language) => {
    const response = await axiosInstance.get(`/similar_trips/${tripId}`, {
      headers: {
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },
  // Gifts
  getGifts: async (language) => {
    // Default language is 'en' (English)
    const response = await axiosInstance.get("/gifts", {
      headers: {
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },
  getGiftById: async (giftId, language) => {
    const response = await axiosInstance.get(`/gifts/${giftId}`, {
      headers: {
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  // Effectiveness
  getEffectiveness: async (language) => {
    const response = await axiosInstance.get("/effectivenes", {
      headers: {
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  getEffectivenessById: async (effectiveneId, language) => {
    const response = await axiosInstance.get(`/effectivenes/${effectiveneId}`, {
      headers: {
        language: language, // Pass the language in the header
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
        language: language, // Pass the language in the header
      },
    });
    return response.data;
  },

  getCitiesId: async (cityId, language) => {
    const response = await axiosInstance.get(`/search_by_city/${cityId}`, {
      headers: {
        lang: language, // Pass the language in the header
      },
    });
    return response.data;
  },
};

export default ContentAPI;
