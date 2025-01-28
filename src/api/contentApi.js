import axiosInstance from "./axiosInstance";

const ContentAPI = {
  // Trips
  getTrips: async () => {
    const response = await axiosInstance.get("/trips");
    return response.data;
  },
  getTripById: async (tripId) => {
    const response = await axiosInstance.get(`/trips/${tripId}`);
    return response.data;
  },
  getSimilarTrips: async (tripId) => {
    const response = await axiosInstance.get(`/similar_trips/${tripId}`);
    return response.data;
  },
  // Gifts
  getGifts: async (language) => { // Default language is 'en' (English)
    const response = await axiosInstance.get("/gifts", {
      headers: {
        'language': language // Pass the language in the header
      }
    });
    return response.data;
  },
  getGiftById: async (giftId) => {
    const response = await axiosInstance.get(`/gifts/${giftId}`);
    return response.data;
  },

  // Effectiveness
  getEffectiveness: async () => {
    const response = await axiosInstance.get("/effectivenes");
    return response.data;
  },
  getEffectivenessById: async (effectiveneId) => {
    const response = await axiosInstance.get(`/effectivenes/${effectiveneId}`);
    return response.data;
  },

  // Why Bookings
  getWhyBookings: async () => {
    const response = await axiosInstance.get("/why_bookings");
    return response.data;
  },

  // Cities
  getCities: async () => {
    const response = await axiosInstance.get("/cities");
    return response.data;
  },

  getCitiesId: async (cityId) => {
    const response = await axiosInstance.get(`/search_by_city/${cityId}`);
    return response.data;
  },
};

export default ContentAPI;
