import axiosInstance from "./axiosInstance";

const FavouritesAPI = {
  getFavourites: async (language) => {
    const response = await axiosInstance.get("/favourite", {
      headers: {
        language: language, // Pass the language in the header
      }
    });
    return response.data;
  },
  toggleFavourite: async (modelType, modelId) => {
    const response = await axiosInstance.get(`/save-favourite/${modelType}/${modelId}`);
    return response.data;
  },
  removeFromFavourite: async (modelType, modelId) => {
    const response = await axiosInstance.get(`/remove-favourite/${modelType}/${modelId}`);
    return response.data;
  },
};

export default FavouritesAPI;
